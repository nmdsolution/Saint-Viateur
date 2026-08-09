"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type StaffMember = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string;
};

/**
 * `public.profiles` doesn't store the email (it lives on `auth.users`,
 * which isn't exposed through the normal PostgREST-backed client), so we
 * fetch profiles with the acting user's session and cross-reference emails
 * via the Auth Admin API using the service-role client.
 */
export async function listStaffMembers(): Promise<StaffMember[]> {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .order("full_name", { ascending: true });

  if (!profiles) return [];

  const admin = createAdminClient();
  const emailById = new Map<string, string>();

  // The staff roster is small — a single (generously sized) page covers it.
  const { data: usersPage } = await admin.auth.admin.listUsers({ perPage: 1000 });
  usersPage?.users.forEach((user) => {
    if (user.email) emailById.set(user.id, user.email);
  });

  return profiles.map((profile) => ({
    id: profile.id,
    full_name: profile.full_name,
    role: profile.role,
    email: emailById.get(profile.id) ?? null,
  }));
}

export async function updateStaffRole(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const role = String(formData.get("role") ?? "editor");
  if (!id) return;

  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) {
    redirect("/admin/staff?error=1");
  }

  revalidatePath("/admin/staff");
}

export async function inviteStaffMember(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const role = String(formData.get("role") ?? "editor");

  if (!email) {
    redirect("/admin/staff?inviteError=1");
  }

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName || null },
  });

  if (error) {
    redirect("/admin/staff?inviteError=1");
  }

  // `handle_new_user` (see supabase/schema.sql) auto-creates the `profiles`
  // row with the default 'editor' role — only need a follow-up update if
  // the invite form picked something else.
  if (data.user && role !== "editor") {
    const supabase = await createClient();
    await supabase.from("profiles").update({ role }).eq("id", data.user.id);
  }

  revalidatePath("/admin/staff");
  redirect("/admin/staff?invited=1");
}
