import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — bypasses Row Level Security entirely.
 *
 * SECURITY: NEVER import this from a Client Component. It holds
 * `SUPABASE_SERVICE_ROLE_KEY`, which grants unrestricted read/write access
 * to every table regardless of RLS policies or the caller's session.
 *
 * This is a separate client from `lib/supabase/admin.ts` (which is scoped
 * to Server Actions such as staff invitations). It exists specifically for
 * server-only Route Handlers — currently just
 * `app/api/chatbot/messages/route.ts` — that need to write to the
 * `chatbot_conversations` / `chatbot_messages` tables on behalf of
 * anonymous, unauthenticated site visitors. Per `supabase/schema.sql`,
 * those tables intentionally have no anon/authenticated insert policy, so
 * only a service-role client can write to them.
 */
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
