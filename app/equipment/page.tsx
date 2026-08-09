import type { ReactNode } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";

function Ico({ children }: { children: ReactNode }) {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

const EQUIPMENT = [
  {
    photo: "Photo — Scanner / Imagerie",
    name: "Scanner (Imagerie médicale)",
    description: "Examens d'imagerie haute résolution pour un diagnostic précis.",
  },
  {
    photo: "Photo — Échographe",
    name: "Échographe",
    description: "Suivi de grossesse et explorations abdominales / cardiaques.",
  },
  {
    photo: "Photo — Radiologie numérique",
    name: "Radiologie numérique",
    description: "Radiographies numériques à faible dose, résultats rapides.",
  },
  {
    photo: "Photo — Laboratoire",
    name: "Laboratoire d'analyses",
    description: "Analyses biologiques sur place avec rendu rapide des résultats.",
  },
  {
    photo: "Photo — Bloc opératoire",
    name: "Bloc opératoire équipé",
    description: "Salles d'opération aux normes pour la chirurgie générale et spécialisée.",
  },
  {
    photo: "Photo — Monitoring",
    name: "Monitoring & réanimation",
    description: "Surveillance continue des patients en soins intensifs.",
  },
];

const MARQUEE_ITEMS: { icon: ReactNode; label: string }[] = [
  {
    label: "Scanner haute résolution",
    icon: (
      <Ico>
        <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
        <path d="M3 12h18" />
      </Ico>
    ),
  },
  {
    label: "Analyses biologiques sur place",
    icon: (
      <Ico>
        <path d="M9 3h6" />
        <path d="M10 3v14a2 2 0 0 0 4 0V3" />
        <path d="M10 12h4" />
      </Ico>
    ),
  },
  {
    label: "Bloc opératoire aux normes",
    icon: (
      <Ico>
        <path d="M3 19v-9M3 14h18v5" />
        <path d="M21 19v-5a3 3 0 0 0-3-3h-7v3" />
        <circle cx="7" cy="11" r="2" />
      </Ico>
    ),
  },
  {
    label: "Résultats en 24 h",
    icon: (
      <Ico>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </Ico>
    ),
  },
  {
    label: "Maintenance certifiée",
    icon: (
      <Ico>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      </Ico>
    ),
  },
  {
    label: "Équipe technique formée",
    icon: (
      <Ico>
        <path d="M6 3v5a4 4 0 0 0 8 0V3" />
        <path d="M10 12v3a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-2" />
        <circle cx="19" cy="9" r="2" />
      </Ico>
    ),
  },
];

export default function EquipmentPage() {
  return (
    <>
      <Header active="equipment" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Plateau technique</span>
            <h1>
              Des équipements médicaux <em>modernes</em>
            </h1>
            <p>
              Un investissement continu dans la technologie pour un diagnostic
              plus rapide et plus précis.
            </p>
            <div className="hero-pills">
              <span className="hero-pill">
                <Ico>
                  <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
                  <path d="M3 12h18" />
                </Ico>
                Imagerie numérique
              </span>
              <span className="hero-pill">
                <Ico>
                  <path d="M9 3h6" />
                  <path d="M10 3v14a2 2 0 0 0 4 0V3" />
                  <path d="M10 12h4" />
                </Ico>
                Laboratoire sur site
              </span>
              <span className="hero-pill">
                <Ico>
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4l3 2" />
                </Ico>
                Résultats rapides
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={`${item.label}-${i}`}>
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container equip-grid">
          {EQUIPMENT.map((item, i) => (
            <Reveal index={i + 1} key={item.name}>
              <div className="card equip-card">
                <div className="photo-placeholder">{item.photo}</div>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
