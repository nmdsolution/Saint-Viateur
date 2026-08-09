"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const SITE_SETTINGS_FIELDS = [
  "address",
  "phone",
  "email",
  "hours",
  "social_facebook",
  "social_linkedin",
  "social_instagram",
  "social_whatsapp",
] as const;

export async function updateSiteSettings(formData: FormData): Promise<void> {
  const values: Record<string, string | null> = {};
  for (const field of SITE_SETTINGS_FIELDS) {
    const raw = formData.get(field);
    values[field] = raw === null ? null : String(raw).trim() || null;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) {
    redirect("/admin/site-settings?error=1");
  }

  revalidatePath("/admin/site-settings");
  redirect("/admin/site-settings?saved=1");
}
