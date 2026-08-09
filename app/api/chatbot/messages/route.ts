import { NextRequest, NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase/service";

/**
 * Public, anonymous-facing endpoint used by the chatbot widget
 * (`app/components/Chatbot.tsx`) to persist conversation history.
 *
 * Visitors are never authenticated here — that's expected. The service-role
 * client is what lets this one narrow write path bypass Row Level Security,
 * which otherwise blocks all anon/authenticated writes to the
 * `chatbot_conversations` / `chatbot_messages` tables (see
 * `supabase/schema.sql`).
 */

const VALID_ROLES = ["me", "bot"] as const;
type Role = (typeof VALID_ROLES)[number];

type Body = {
  sessionId?: unknown;
  role?: unknown;
  text?: unknown;
};

function isValidBody(
  body: Body
): body is { sessionId: string; role: Role; text: string } {
  return (
    typeof body.sessionId === "string" &&
    body.sessionId.trim().length > 0 &&
    typeof body.text === "string" &&
    body.text.trim().length > 0 &&
    typeof body.role === "string" &&
    (VALID_ROLES as readonly string[]).includes(body.role)
  );
}

export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  if (!isValidBody(body)) {
    return NextResponse.json(
      {
        error:
          "Missing or invalid fields — expected { sessionId: string, role: 'me' | 'bot', text: string }.",
      },
      { status: 400 }
    );
  }

  const { sessionId, role, text } = body;
  const userAgent = request.headers.get("user-agent") ?? undefined;

  const supabase = createServiceClient();

  const { data: conversation, error: selectError } = await supabase
    .from("chatbot_conversations")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (selectError) {
    return NextResponse.json({ error: selectError.message }, { status: 500 });
  }

  let conversationId = conversation?.id as string | undefined;

  if (conversationId) {
    const { error: updateError } = await supabase
      .from("chatbot_conversations")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", conversationId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }
  } else {
    const { data: inserted, error: insertError } = await supabase
      .from("chatbot_conversations")
      .insert({ session_id: sessionId, user_agent: userAgent })
      .select("id")
      .single();

    if (insertError || !inserted) {
      return NextResponse.json(
        { error: insertError?.message ?? "Failed to create conversation." },
        { status: 500 }
      );
    }

    conversationId = inserted.id as string;
  }

  const { error: messageError } = await supabase
    .from("chatbot_messages")
    .insert({ conversation_id: conversationId, role, text });

  if (messageError) {
    return NextResponse.json({ error: messageError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
