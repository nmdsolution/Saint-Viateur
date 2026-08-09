import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";
import { Icon } from "@/app/components/IconRegistry";
import { createClient } from "@/lib/supabase/server";

type Specialty = {
  id: string;
  category: "medecine" | "chirurgie" | "technique";
  name: string;
  icon_slug: string | null;
  sort_order: number;
};

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("specialties")
    .select("id, category, name, icon_slug, sort_order")
    .order("sort_order", { ascending: true });

  const specialties = (data ?? []) as Specialty[];
  const medicalSpecialties = specialties.filter((s) => s.category === "medecine");
  const surgicalSpecialties = specialties.filter((s) => s.category === "chirurgie");
  const technicalPlatform = specialties.filter((s) => s.category === "technique");

  return (
    <>
      <Header active="services" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Répertoire des spécialités</span>
            <h1>
              <em>{specialties.length} spécialités</em> médicales, une seule adresse
            </h1>
            <p>
              De la médecine générale à la chirurgie spécialisée, retrouvez
              l&apos;ensemble des disciplines proposées à la clinique. Cliquez
              un filtre pour explorer.
            </p>
            <div className="filters">
              <span className="chip is-active" data-filter="all">Toutes</span>
              <span className="chip" data-filter="medecine">Médecine</span>
              <span className="chip" data-filter="chirurgie">Chirurgie</span>
              <span className="chip" data-filter="technique">Plateau technique</span>
            </div>
            <div className="hero-pills">
              <span className="hero-pill">
                <Icon slug="stethoscope" className="ico" />
                +{specialties.length} disciplines
              </span>
              <span className="hero-pill">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M4 12h16" />
                  <path d="M12 4c2.5 2.4 2.5 13.6 0 16-2.5-2.4-2.5-13.6 0-16z" />
                </svg>
                Équipe multilingue
              </span>
              <span className="hero-pill">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4l3 2" />
                </svg>
                Consultations 7j/7
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="lang-strip">
        <strong style={{ color: "var(--color-ink)" }}>Langues parlées :</strong>
        <span className="chip chip-neutral">Français</span>
        <span className="chip chip-neutral">Anglais</span>
        <span className="chip chip-neutral">Langues locales</span>
      </div>

      <section className="section">
        <div className="container">
          <div className="specialty-group" data-cat="medecine">
            <Reveal index={0}>
              <h3>Médecine &amp; spécialités médicales</h3>
            </Reveal>
            <div className="specialty-list">
              {medicalSpecialties.map((item, i) => (
                <Reveal index={i + 1} key={item.id}>
                  <div className="card specialty-item">
                    <div className="icon-badge">
                      <Icon slug={item.icon_slug} className="ico" />
                    </div>
                    <strong>{item.name}</strong>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="specialty-group" data-cat="chirurgie">
            <Reveal index={0}>
              <h3>Chirurgie</h3>
            </Reveal>
            <div className="specialty-list">
              {surgicalSpecialties.map((item, i) => (
                <Reveal index={i + 1} key={item.id}>
                  <div className="card specialty-item">
                    <div className="icon-badge">
                      <Icon slug={item.icon_slug} className="ico" />
                    </div>
                    <strong>{item.name}</strong>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="specialty-group" data-cat="technique">
            <Reveal index={0}>
              <h3>Plateau technique</h3>
            </Reveal>
            <div className="specialty-list">
              {technicalPlatform.map((item, i) => (
                <Reveal index={i + 1} key={item.id}>
                  <div className="card specialty-item">
                    <div className="icon-badge">
                      <Icon slug={item.icon_slug} className="ico" />
                    </div>
                    <strong>{item.name}</strong>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal index={0}>
            <div className="card planning-card">
              <div>
                <strong style={{ display: "block", marginBottom: 6 }}>
                  Planning de consultation
                </strong>
                <p style={{ margin: 0, fontSize: "13.5px", color: "var(--color-ink-soft)" }}>
                  Consultez les jours et horaires disponibles pour chaque
                  spécialité.
                </p>
              </div>
              <button className="btn btn-outline">Voir le planning</button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
