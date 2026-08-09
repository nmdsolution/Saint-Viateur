import Link from "next/link";
import { pathFor } from "@/app/lib/nav";
import { createClient } from "@/lib/supabase/server";

type SiteSettings = {
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  social_facebook: string | null;
  social_linkedin: string | null;
  social_instagram: string | null;
  social_whatsapp: string | null;
};

export async function Footer() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("address, phone, email, hours, social_facebook, social_linkedin, social_instagram, social_whatsapp")
    .eq("id", 1)
    .maybeSingle();

  const settings = data as SiteSettings | null;
  const phoneHref = settings?.phone ? `tel:${settings.phone.replace(/\s+/g, "")}` : undefined;

  return (
    <footer className="site-footer">
      <div className="cols">
        <div className="col">
          <h4>Clinique Médicale Saint Viateur</h4>
          <p>{settings?.address}</p>
          <p>Ouvert tous les jours — Urgences 24h/24</p>
          <div className="social-row">
            {settings?.social_facebook && <a href={settings.social_facebook}>f</a>}
            {settings?.social_linkedin && <a href={settings.social_linkedin}>in</a>}
            {settings?.social_instagram && <a href={settings.social_instagram}>ig</a>}
            {settings?.social_whatsapp && <a href={settings.social_whatsapp}>wa</a>}
          </div>
        </div>
        <div className="col">
          <h4>Navigation</h4>
          <Link href={pathFor("services")}>Spécialités</Link>
          <Link href={pathFor("equipment")}>Équipements</Link>
          <Link href={pathFor("gallery")}>Galerie</Link>
          <Link href={pathFor("news")}>Actualités</Link>
        </div>
        <div className="col">
          <h4>Patients</h4>
          <Link href={pathFor("patient-services")}>Prendre RDV</Link>
          <Link href={pathFor("patient-services")}>
            Résultats d&apos;analyses
          </Link>
          <Link href={pathFor("patient-services")}>Assurances</Link>
          <Link href={pathFor("patient-services")}>FAQ</Link>
        </div>
        <div className="col">
          <h4>Contact</h4>
          <Link href={pathFor("contact")}>Formulaire de contact</Link>
          {phoneHref && <a href={phoneHref}>{settings?.phone}</a>}
          {settings?.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
        </div>
      </div>
      <div className="bottom">
        <span>© 2026 Clinique Médicale Saint Viateur — Tous droits réservés</span>
        <span>Riviera SIDECI, Abidjan</span>
      </div>
    </footer>
  );
}
