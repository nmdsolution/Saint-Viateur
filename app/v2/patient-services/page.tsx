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

const SERVICE_TILES: { icon: ReactNode; name: string; description: string; withButton?: boolean }[] = [
  {
    name: "Prise de rendez-vous",
    description: "En ligne, par téléphone ou WhatsApp.",
    withButton: true,
    icon: (
      <Ico>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </Ico>
    ),
  },
  {
    name: "Hospitalisation",
    description: "Chambres individuelles et collectives, documents à fournir à l'admission.",
    icon: (
      <Ico>
        <path d="M3 19v-9M3 14h18v5" />
        <path d="M21 19v-5a3 3 0 0 0-3-3h-7v3" />
        <circle cx="7" cy="11" r="2" />
      </Ico>
    ),
  },
  {
    name: "Urgences",
    description: "Accueil des urgences 24h/24, 7j/7.",
    icon: (
      <Ico>
        <path d="M3 16.5V8h11v8.5" />
        <path d="M14 11h3l3 3v2.5h-6" />
        <circle cx="7" cy="17.5" r="1.8" />
        <circle cx="17" cy="17.5" r="1.8" />
        <path d="M8 10v3M6.5 11.5h3" />
      </Ico>
    ),
  },
  {
    name: "Pharmacie",
    description: "Pharmacie sur site pour vos traitements.",
    icon: (
      <Ico>
        <rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)" />
        <path d="M9.5 14.5l5-5" />
      </Ico>
    ),
  },
  {
    name: "Laboratoire",
    description: "Analyses biologiques, retrait des résultats en ligne.",
    icon: (
      <Ico>
        <path d="M9 3h6" />
        <path d="M10 3v14a2 2 0 0 0 4 0V3" />
        <path d="M10 12h4" />
      </Ico>
    ),
  },
  {
    name: "Imagerie médicale",
    description: "Scanner, échographie, radiologie numérique.",
    icon: (
      <Ico>
        <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
        <path d="M3 12h18" />
      </Ico>
    ),
  },
  {
    name: "Assurances acceptées",
    description: "Liste des assurances et partenaires conventionnés.",
    icon: (
      <Ico>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      </Ico>
    ),
  },
  {
    name: "Chat WhatsApp",
    description: "Une question ? Écrivez-nous directement.",
    icon: (
      <Ico>
        <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" />
      </Ico>
    ),
  },
];

const FAQ_ITEMS = [
  {
    question: "Comment prendre rendez-vous en ligne ?",
    answer:
      "Utilisez le bouton \"Prendre rendez-vous\" en haut de page, ou contactez-nous par WhatsApp / téléphone.",
    open: true,
  },
  {
    question: "Comment récupérer mes résultats d'analyses ?",
    answer: "Les résultats sont disponibles au laboratoire ou via votre espace patient en ligne.",
  },
  {
    question: "Quels documents apporter pour une hospitalisation ?",
    answer: "Pièce d'identité, carte d'assurance et lettre d'admission du médecin.",
  },
  {
    question: "La clinique recrute-t-elle ?",
    answer: "Consultez notre espace recrutement pour les offres en cours.",
  },
];

export default function V2PatientServicesPage() {
  return (
    <>
      <ProvisionalBanner version="v2" />
      <Header version="v2" active="patient-services" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Services aux patients</span>
            <h1>
              Tout ce qu&apos;il faut savoir <em>avant votre visite</em>
            </h1>
            <p>
              Rendez-vous, hospitalisation, pharmacie, laboratoire, imagerie et
              assurances — retrouvez toutes les informations pratiques.
            </p>
            <div className="hero-pills">
              <span className="hero-pill">
                <Ico>
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </Ico>
                RDV en ligne
              </span>
              <span className="hero-pill">
                <Ico>
                  <path d="M3 19v-9M3 14h18v5" />
                  <path d="M21 19v-5a3 3 0 0 0-3-3h-7v3" />
                  <circle cx="7" cy="11" r="2" />
                </Ico>
                Chambres individuelles
              </span>
              <span className="hero-pill">
                <Ico>
                  <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                </Ico>
                Assurances conventionnées
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-grid">
            {SERVICE_TILES.map((tile, i) => (
              <Reveal index={i + 1} key={tile.name}>
                <div className="card service-tile">
                  <div className="icon-badge">{tile.icon}</div>
                  <strong>{tile.name}</strong>
                  <p>{tile.description}</p>
                  {tile.withButton && (
                    <button className="btn btn-outline btn-sm" style={{ marginTop: 10 }}>
                      Réserver
                    </button>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal index={0}>
            <div className="section-header" style={{ marginBottom: 24 }}>
              <span className="eyebrow">Assurances &amp; partenaires</span>
              <h2>Assurances conventionnées</h2>
            </div>
          </Reveal>
          <Reveal index={0}>
            <div className="card" style={{ marginBottom: 52 }}>
              <div className="insurance-row">
                <span className="chip chip-neutral">NSIA Assurances</span>
                <span className="chip chip-neutral">Saham Assurance</span>
                <span className="chip chip-neutral">Allianz CI</span>
                <span className="chip chip-neutral">CNAM</span>
                <span className="chip chip-neutral">+ Liste complète des partenaires</span>
              </div>
            </div>
          </Reveal>

          <Reveal index={0}>
            <div className="section-header" style={{ marginBottom: 8 }}>
              <span className="eyebrow">FAQ</span>
              <h2>Questions fréquentes des patients</h2>
            </div>
          </Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {FAQ_ITEMS.map((item) => (
              <details className="faq-item" open={item.open} key={item.question}>
                <summary>
                  {item.question} <span>＋</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer version="v2" />
    </>
  );
}
