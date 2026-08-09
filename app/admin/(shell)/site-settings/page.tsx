import { createClient } from "@/lib/supabase/server";
import { updateSiteSettings } from "./actions";

export default async function SiteSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return (
    <>
      <h1 className="adm-page-title">Paramètres du site</h1>

      <section className="aem-section">
        {saved ? (
          <div className="aem-form-success">Paramètres enregistrés.</div>
        ) : null}
        {error ? (
          <div className="aem-form-error">
            Une erreur est survenue lors de l&apos;enregistrement.
          </div>
        ) : null}

        <form className="aem-form aem-form-page" action={updateSiteSettings}>
          <div className="aem-field">
            <label htmlFor="address">Adresse</label>
            <input id="address" name="address" type="text" defaultValue={settings?.address ?? ""} />
          </div>

          <div className="aem-field">
            <label htmlFor="phone">Téléphone</label>
            <input id="phone" name="phone" type="text" defaultValue={settings?.phone ?? ""} />
          </div>

          <div className="aem-field">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" defaultValue={settings?.email ?? ""} />
          </div>

          <div className="aem-field">
            <label htmlFor="hours">Horaires</label>
            <textarea id="hours" name="hours" rows={4} defaultValue={settings?.hours ?? ""} />
          </div>

          <div className="aem-field">
            <label htmlFor="social_facebook">Facebook</label>
            <input
              id="social_facebook"
              name="social_facebook"
              type="text"
              placeholder="https://facebook.com/..."
              defaultValue={settings?.social_facebook ?? ""}
            />
          </div>

          <div className="aem-field">
            <label htmlFor="social_linkedin">LinkedIn</label>
            <input
              id="social_linkedin"
              name="social_linkedin"
              type="text"
              placeholder="https://linkedin.com/..."
              defaultValue={settings?.social_linkedin ?? ""}
            />
          </div>

          <div className="aem-field">
            <label htmlFor="social_instagram">Instagram</label>
            <input
              id="social_instagram"
              name="social_instagram"
              type="text"
              placeholder="https://instagram.com/..."
              defaultValue={settings?.social_instagram ?? ""}
            />
          </div>

          <div className="aem-field">
            <label htmlFor="social_whatsapp">WhatsApp</label>
            <input
              id="social_whatsapp"
              name="social_whatsapp"
              type="text"
              placeholder="https://wa.me/..."
              defaultValue={settings?.social_whatsapp ?? ""}
            />
          </div>

          <div className="aem-drawer-actions aem-drawer-actions-page">
            <button type="submit" className="aem-btn-primary">
              Enregistrer
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
