import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type MessageRow = {
  id: string;
  role: "me" | "bot";
  text: string;
  created_at: string;
};

export default async function ChatbotConversationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: conversation } = await supabase
    .from("chatbot_conversations")
    .select("id, session_id, started_at, last_message_at, user_agent")
    .eq("id", id)
    .maybeSingle();

  if (!conversation) notFound();

  const { data: messages } = await supabase
    .from("chatbot_messages")
    .select("id, role, text, created_at")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true })
    .returns<MessageRow[]>();

  return (
    <>
      <Link href="/admin/chatbot" className="aem-back-link">
        ← Toutes les conversations
      </Link>

      <h1 className="adm-page-title">Conversation — {conversation.session_id}</h1>

      <section className="aem-section ach-thread">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={message.role === "bot" ? "ach-msg bot" : "ach-msg me"}
            >
              <p className="ach-msg-text">{message.text}</p>
              <span className="ach-msg-time">
                {new Date(message.created_at).toLocaleString("fr-FR")}
              </span>
            </div>
          ))
        ) : (
          <p className="adm-empty-state">Aucun message dans cette conversation.</p>
        )}
      </section>
    </>
  );
}
