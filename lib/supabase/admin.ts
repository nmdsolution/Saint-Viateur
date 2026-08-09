import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — bypasses Row Level Security entirely.
 *
 * SECURITY: NEVER import this from a Client Component. It holds
 * `SUPABASE_SERVICE_ROLE_KEY`, which grants unrestricted read/write access
 * to every table and the Auth Admin API regardless of RLS policies or the
 * caller's session. Only import it from Server Actions (files marked
 * `"use server"`) — currently just `app/admin/(shell)/staff/actions.ts`,
 * for inviting new staff accounts and looking up their emails via the Auth
 * Admin API (`auth.users` isn't exposed through the normal Supabase client).
 */
export function createAdminClient() {
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
