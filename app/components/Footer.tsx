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
            {settings?.social_facebook && (
              <a href={settings.social_facebook} aria-label="Facebook">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.5 8.5h-2a2 2 0 0 0-2 2V13H9v3h2.5v6h3v-6h2.3l.5-3h-2.8v-2a.5.5 0 0 1 .5-.5h2z" />
                </svg>
              </a>
            )}
            {settings?.social_linkedin && (
              <a href={settings.social_linkedin} aria-label="LinkedIn">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <line x1="7.5" y1="10.5" x2="7.5" y2="17" />
                  <circle cx="7.5" cy="7" r="0.6" fill="currentColor" stroke="none" />
                  <path d="M11 17v-6.5M11 13c0-1.7 1.3-2.7 2.8-2.7S16.5 11.3 16.5 13v4" />
                </svg>
              </a>
            )}
            {settings?.social_instagram && (
              <a href={settings.social_instagram} aria-label="Instagram">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
                </svg>
              </a>
            )}
            {settings?.social_whatsapp && (
              <a href={settings.social_whatsapp} aria-label="WhatsApp">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" />
                </svg>
              </a>
            )}
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
