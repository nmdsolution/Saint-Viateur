import type { ReactNode } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProvisionalBanner } from "@/app/components/ProvisionalBanner";
import { Reveal } from "@/app/components/Reveal";

function Ico({ children }: { children: ReactNode }) {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

const MEDICAL_SPECIALTIES: { icon: ReactNode; name: string }[] = [
  {
    name: "Médecine Générale",
    icon: (
      <Ico>
        <path d="M6 3v5a4 4 0 0 0 8 0V3" />
        <path d="M10 12v3a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-2" />
        <circle cx="19" cy="9" r="2" />
      </Ico>
    ),
  },
  {
    name: "Gynécologie – Obstétrique",
    icon: (
      <Ico>
        <circle cx="11" cy="4.5" r="2" />
        <path d="M11 8c-2 0-3 2-3 4v8" />
        <path d="M11 9c3 0 5 2 5 5s-2 4-5 4" />
      </Ico>
    ),
  },
  {
    name: "Pédiatrie",
    icon: (
      <Ico>
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21a6 6 0 0 1 12 0" />
        <path d="M10.5 8h.01M13.5 8h.01" />
      </Ico>
    ),
  },
  {
    name: "Cardiologie",
    icon: (
      <Ico>
        <path d="M12 20s-7-4.5-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5c0 5-7 9.5-7 9.5z" />
      </Ico>
    ),
  },
  {
    name: "Pneumologie",
    icon: (
      <Ico>
        <path d="M12 4v9" />
        <path d="M12 8c-1.5 0-3 1-3.5 3l-1.5 5c-.4 1.4.6 2.5 2 2.5h2c.8 0 1.5-.7 1.5-1.5V8z" />
        <path d="M12 8c1.5 0 3 1 3.5 3l1.5 5c.4 1.4-.6 2.5-2 2.5h-2c-.8 0-1.5-.7-1.5-1.5V8z" />
      </Ico>
    ),
  },
  {
    name: "Neurologie",
    icon: (
      <Ico>
        <path d="M12 5a3 3 0 0 0-6 0v1a3 3 0 0 0-1 5.5A3 3 0 0 0 7 19h5z" />
        <path d="M12 5a3 3 0 0 1 6 0v1a3 3 0 0 1 1 5.5A3 3 0 0 1 17 19h-5z" />
      </Ico>
    ),
  },
  {
    name: "Neurochirurgie",
    icon: (
      <Ico>
        <path d="M12 5a3 3 0 0 0-6 0v1a3 3 0 0 0-1 5.5A3 3 0 0 0 7 19h5z" />
        <path d="M12 5a3 3 0 0 1 6 0v1a3 3 0 0 1 1 5.5A3 3 0 0 1 17 19h-5z" />
      </Ico>
    ),
  },
  {
    name: "Rhumatologie",
    icon: (
      <Ico>
        <path d="M8.5 15.5l7-7" />
        <circle cx="6.4" cy="17.6" r="2.4" />
        <circle cx="17.6" cy="6.4" r="2.4" />
      </Ico>
    ),
  },
  {
    name: "Urologie",
    icon: (
      <Ico>
        <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
        <path d="M3 12h18" />
      </Ico>
    ),
  },
  {
    name: "Néphrologie",
    icon: (
      <Ico>
        <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
        <path d="M3 12h18" />
      </Ico>
    ),
  },
  {
    name: "Hépato-gastro-entérologie",
    icon: (
      <Ico>
        <circle cx="12" cy="12" r="7.5" />
        <path d="M12 7.5c-2.4 1.8 2.4 3.2 0 5s2.4 3.2 0 4" />
      </Ico>
    ),
  },
  {
    name: "Hématologie",
    icon: (
      <Ico>
        <path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3z" />
      </Ico>
    ),
  },
  {
    name: "Endocrinologie – Diabétologie",
    icon: (
      <Ico>
        <path d="M12 4v16M6 8h12" />
        <path d="M6 8l-3 5h6zM18 8l-3 5h6z" />
      </Ico>
    ),
  },
  {
    name: "Dermatologie – Vénérologie",
    icon: (
      <Ico>
        <path d="M10 3h4v3l1.5 2c.3.6.5 1.3.5 2v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-9c0-.7.2-1.4.5-2L10 6z" />
        <path d="M8 13h8" />
      </Ico>
    ),
  },
  {
    name: "Infectiologie",
    icon: (
      <Ico>
        <circle cx="12" cy="12" r="5" />
        <path d="M12 7V4M12 20v-3M7 12H4M20 12h-3M8.5 8.5 6 6M18 18l-2.5-2.5" />
      </Ico>
    ),
  },
  {
    name: "Cancérologie (Oncologie)",
    icon: (
      <Ico>
        <path d="M9 20.5l3-7 3 7" />
        <path d="M12 13.5 8 6a4 4 0 0 1 8 0z" />
      </Ico>
    ),
  },
  {
    name: "Psychiatrie",
    icon: (
      <Ico>
        <path d="M5 5h5a2 2 0 1 1 4 0h5v5a2 2 0 1 0 0 4v5H5z" />
      </Ico>
    ),
  },
  {
    name: "Nutrition",
    icon: (
      <Ico>
        <path d="M4 12h16a8 8 0 0 1-16 0z" />
        <path d="M8 12a4 4 0 0 1 8 0" />
      </Ico>
    ),
  },
  {
    name: "Médecine Physique et de Réadaptation",
    icon: (
      <Ico>
        <path d="M3 13h4l3-5 3 8 2-4h5" />
      </Ico>
    ),
  },
  {
    name: "Traumatologie",
    icon: (
      <Ico>
        <rect x="3.5" y="8" width="17" height="8" rx="4" transform="rotate(-20 12 12)" />
        <path d="M11 11h.01M13 13h.01" />
      </Ico>
    ),
  },
];

const SURGICAL_SPECIALTIES: { icon: ReactNode; name: string }[] = [
  {
    name: "Chirurgie Générale",
    icon: (
      <Ico>
        <path d="M4 20l7-7" />
        <path d="M11 13l6-9 3 3-6 6z" />
      </Ico>
    ),
  },
  {
    name: "Chirurgie Pédiatrique",
    icon: (
      <Ico>
        <path d="M4 20l7-7" />
        <path d="M11 13l6-9 3 3-6 6z" />
      </Ico>
    ),
  },
  {
    name: "Chirurgie Thoracique",
    icon: (
      <Ico>
        <path d="M4 20l7-7" />
        <path d="M11 13l6-9 3 3-6 6z" />
      </Ico>
    ),
  },
  {
    name: "ORL (Oto-Rhino-Laryngologie)",
    icon: (
      <Ico>
        <path d="M8.5 20.5c0-3-1.5-4-1.5-8a5 5 0 0 1 10 0c0 3-3 3-3 6a2.5 2.5 0 0 1-4 1.5" />
      </Ico>
    ),
  },
  {
    name: "Stomatologie",
    icon: (
      <Ico>
        <path d="M8 3C6 3 4.5 4.6 4.5 7c0 5 1.5 6 2 13 .1 1.4 2 1.6 2.4 0L10 15c.3-1.2 1.7-1.2 2 0l1.1 5c.4 1.6 2.3 1.4 2.4 0 .5-7 2-8 2-13 0-2.4-1.5-4-3.5-4-1.6 0-2 .8-3 .8S9.6 3 8 3z" />
      </Ico>
    ),
  },
  {
    name: "Chirurgie Dentaire",
    icon: (
      <Ico>
        <path d="M8 3C6 3 4.5 4.6 4.5 7c0 5 1.5 6 2 13 .1 1.4 2 1.6 2.4 0L10 15c.3-1.2 1.7-1.2 2 0l1.1 5c.4 1.6 2.3 1.4 2.4 0 .5-7 2-8 2-13 0-2.4-1.5-4-3.5-4-1.6 0-2 .8-3 .8S9.6 3 8 3z" />
      </Ico>
    ),
  },
];

const TECHNICAL_PLATFORM: { icon: ReactNode; name: string }[] = [
  {
    name: "Anesthésie – Réanimation",
    icon: (
      <Ico>
        <path d="M20 14a8 8 0 1 1-9.5-10 6.5 6.5 0 0 0 9.5 10z" />
      </Ico>
    ),
  },
  {
    name: "Radiologie et Imagerie Médicale",
    icon: (
      <Ico>
        <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
        <path d="M3 12h18" />
      </Ico>
    ),
  },
  {
    name: "Biologie Médicale",
    icon: (
      <Ico>
        <path d="M9 3h6" />
        <path d="M10 3v14a2 2 0 0 0 4 0V3" />
        <path d="M10 12h4" />
      </Ico>
    ),
  },
  {
    name: "Kinésithérapie",
    icon: (
      <Ico>
        <circle cx="12" cy="5" r="2" />
        <path d="M12 8v5M12 13l-5 6M12 13l5 6M6 11l6 2 6-2" />
      </Ico>
    ),
  },
];

export default function V2ServicesPage() {
  return (
    <>
      <ProvisionalBanner version="v2" />
      <Header version="v2" active="services" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Répertoire des spécialités</span>
            <h1>
              <em>30 spécialités</em> médicales, une seule adresse
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
                <Ico>
                  <path d="M6 3v5a4 4 0 0 0 8 0V3" />
                  <path d="M10 12v3a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-2" />
                  <circle cx="19" cy="9" r="2" />
                </Ico>
                +30 disciplines
              </span>
              <span className="hero-pill">
                <Ico>
                  <circle cx="12" cy="12" r="8" />
                  <path d="M4 12h16" />
                  <path d="M12 4c2.5 2.4 2.5 13.6 0 16-2.5-2.4-2.5-13.6 0-16z" />
                </Ico>
                Équipe multilingue
              </span>
              <span className="hero-pill">
                <Ico>
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4l3 2" />
                </Ico>
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
              {MEDICAL_SPECIALTIES.map((item, i) => (
                <Reveal index={i + 1} key={item.name}>
                  <div className="card specialty-item">
                    <div className="icon-badge">{item.icon}</div>
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
              {SURGICAL_SPECIALTIES.map((item, i) => (
                <Reveal index={i + 1} key={item.name}>
                  <div className="card specialty-item">
                    <div className="icon-badge">{item.icon}</div>
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
              {TECHNICAL_PLATFORM.map((item, i) => (
                <Reveal index={i + 1} key={item.name}>
                  <div className="card specialty-item">
                    <div className="icon-badge">{item.icon}</div>
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

      <Footer version="v2" />
    </>
  );
}
