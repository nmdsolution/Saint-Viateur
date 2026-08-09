import Image from "next/image";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";
import { CountUp } from "@/app/components/CountUp";
import { Icon } from "@/app/components/IconRegistry";
import { createClient } from "@/lib/supabase/server";

type FeaturedSpecialty = {
  id: string;
  name: string;
  icon_slug: string | null;
  description: string | null;
  sort_order: number;
};

type Partner = {
  id: string;
  icon_slug: string | null;
  name: string;
  description: string | null;
  photo_url: string | null;
  sort_order: number;
};

type NewsPreviewItem = {
  id: string;
  title: string;
  published_date: string;
  photo_url: string | null;
};

const DATE_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function formatPublishedDate(isoDate: string): string {
  return DATE_FORMATTER.format(new Date(`${isoDate}T00:00:00`));
}

export default async function HomePage() {
  const supabase = await createClient();
  const [{ data: featuredData }, { data: partnersData }, { data: newsData }] = await Promise.all([
    supabase
      .from("specialties")
      .select("id, name, icon_slug, description, sort_order")
      .eq("featured_on_homepage", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("partners")
      .select("id, icon_slug, name, description, photo_url, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("news_items")
      .select("id, title, published_date, photo_url")
      .order("published_date", { ascending: false })
      .limit(3),
  ]);

  const featuredSpecialties = (featuredData ?? []) as FeaturedSpecialty[];
  const partners = (partnersData ?? []) as Partner[];
  const newsPreview = (newsData ?? []) as NewsPreviewItem[];

  return (
    <>
      <Header active="" />

      <section className="hero">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Clinique médicale pluridisciplinaire</span>
            <h1>
              Votre santé, entre des <span className="accent">mains de confiance</span>
            </h1>
            <p className="lead">
              La Clinique Médicale Saint Viateur accompagne les familles
              d&apos;Abidjan avec plus de 30 spécialités médicales, des
              équipements modernes et une équipe disponible 24h/24 pour les
              urgences.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">Prendre rendez-vous</button>
              <button className="btn btn-outline">Découvrir nos services</button>
            </div>
            <div className="hero-facts">
              <div>
                <CountUp target={30} suffix="+" />
                <br />
                <span>Spécialités médicales</span>
              </div>
              <div>
                <CountUp target={24} suffix="/7" />
                <br />
                <span>Service d&apos;urgences</span>
              </div>
              <div>
                <CountUp target={15} suffix="+" />
                <br />
                <span>Équipements de pointe</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal index={1}>
          <div className="hero-visual">
            <Image
              src="/logo.png"
              alt="Bâtiment de la clinique"
              width={897}
              height={726}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Reveal>
      </section>

      <svg
        className="wave-divider"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32 C360,80 1080,-16 1440,32 L1440,60 L0,60 Z"
          fill="#F2FAFC"
        />
      </svg>

      <section className="section section-soft" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal index={0}>
            <div className="section-header">
              <span className="eyebrow">Nos services</span>
              <h2>Un accompagnement médical complet</h2>
              <p>
                Un aperçu de nos spécialités les plus consultées — la liste
                complète est disponible sur la page Spécialités.
              </p>
            </div>
          </Reveal>
          <div className="services-grid">
            {featuredSpecialties.map((item, i) => (
              <Reveal index={i + 1} key={item.id}>
                <div className="card service-card">
                  <div className="icon-badge">
                    <Icon slug={item.icon_slug} className="ico" />
                  </div>
                  <strong>{item.name}</strong>
                  {item.description && <p>{item.description}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal index={0}>
            <div className="section-header">
              <span className="eyebrow">Pourquoi nous choisir</span>
              <h2>Une clinique pensée pour votre tranquillité</h2>
            </div>
          </Reveal>
          <div className="why-grid">
            <Reveal index={1}>
              <div className="why-card card">
                <div className="icon-badge">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 21V7l8-4 8 4v14" />
                    <path d="M12 10v6M9 13h6" />
                  </svg>
                </div>
                <strong>Équipements modernes</strong>
                <p style={{ fontSize: "13.5px" }}>
                  Imagerie, laboratoire et bloc opératoire aux normes actuelles.
                </p>
              </div>
            </Reveal>
            <Reveal index={2}>
              <div className="why-card card">
                <div className="icon-badge">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M4 12h16" />
                    <path d="M12 4c2.5 2.4 2.5 13.6 0 16-2.5-2.4-2.5-13.6 0-16z" />
                  </svg>
                </div>
                <strong>Équipe multilingue</strong>
                <p style={{ fontSize: "13.5px" }}>
                  Consultations en français, anglais et langues locales.
                </p>
              </div>
            </Reveal>
            <Reveal index={3}>
              <div className="why-card card">
                <div className="icon-badge">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="6" width="18" height="12" rx="2" />
                    <path d="M3 10h18M7 15h4" />
                  </svg>
                </div>
                <strong>Assurances acceptées</strong>
                <p style={{ fontSize: "13.5px" }}>
                  Large réseau de partenaires et assurances conventionnées.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal index={0}>
            <div className="section-header">
              <span className="eyebrow">Nos partenaires</span>
              <h2>Ils nous accompagnent au quotidien</h2>
              <p>
                Un réseau d&apos;institutions médicales et sanitaires en Côte
                d&apos;Ivoire pour garantir à nos patients une prise en charge
                complète et coordonnée.
              </p>
            </div>
          </Reveal>
          <div className="partners-grid">
            {partners.map((partner, i) => (
              <Reveal index={i + 1} key={partner.id}>
                <div className="card partner-card">
                  {partner.photo_url ? (
                    <div className="partner-logo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={partner.photo_url} alt={partner.name} />
                    </div>
                  ) : (
                    <div className="icon-badge">
                      <Icon slug={partner.icon_slug} className="ico" />
                    </div>
                  )}
                  <strong>{partner.name}</strong>
                  <p>{partner.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal index={0}>
        <div className="cta-band">
          <div>
            <h3>Besoin d&apos;un rendez-vous rapidement ?</h3>
            <p>Réservez en ligne ou contactez-nous directement sur WhatsApp.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              className="btn"
              style={{ background: "#fff", color: "var(--color-primary-darker)", animation: "none" }}
            >
              Prendre rendez-vous
            </button>
            <button
              className="btn"
              style={{ border: "1.5px solid rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.14)", color: "#fff" }}
            >
              <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" />
              </svg>{" "}
              WhatsApp
            </button>
          </div>
        </div>
      </Reveal>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal index={0}>
            <div className="section-header">
              <span className="eyebrow">Actualités</span>
              <h2>Ce qui se passe à la clinique</h2>
            </div>
          </Reveal>
          <div className="news-grid">
            {newsPreview.map((item, i) => (
              <Reveal index={i + 1} key={item.id}>
                <div className="card news-card">
                  <div className="photo-placeholder">
                    {item.photo_url ?? `Photo — ${item.title}`}
                  </div>
                  <span className="date">{formatPublishedDate(item.published_date)}</span>
                  <strong style={{ display: "block", marginTop: 6 }}>{item.title}</strong>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
