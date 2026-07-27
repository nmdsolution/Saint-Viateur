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

const NEWS_ITEMS = [
  {
    photo: "Photo — campagne",
    date: "12 juin 2026",
    title: "Campagne de dépistage gratuit du diabète",
    description: "Une semaine de dépistage ouverte à tous, sur rendez-vous.",
    category: "Campagne de santé",
    cat: "campagne",
  },
  {
    photo: "Photo — nouvel équipement",
    date: "28 mai 2026",
    title: "Un nouvel appareil d'imagerie médicale",
    description: "La clinique renforce son plateau technique en radiologie.",
    category: "Nouvel équipement",
    cat: "equipement",
  },
  {
    photo: "Photo — prévention",
    date: "03 mai 2026",
    title: "5 gestes pour prévenir l'hypertension",
    description: "Les conseils de nos cardiologues pour un cœur en bonne santé.",
    category: "Prévention",
    cat: "prevention",
  },
  {
    photo: "Photo — évènement",
    date: "20 avril 2026",
    title: "Journée portes ouvertes de la clinique",
    description: "Venez visiter nos installations et rencontrer nos équipes.",
    category: "Évènement",
    cat: "evenement",
  },
  {
    photo: "Photo — campagne",
    date: "02 avril 2026",
    title: "Consultations gratuites pour la journée mondiale de la santé",
    description: "Une initiative de sensibilisation ouverte à la communauté.",
    category: "Campagne de santé",
    cat: "campagne",
  },
  {
    photo: "Photo — prévention",
    date: "15 mars 2026",
    title: "Bien s'alimenter pendant la grossesse",
    description: "Les recommandations de notre service de nutrition.",
    category: "Prévention",
    cat: "prevention",
  },
];

export default function V2NewsPage() {
  return (
    <>
      <ProvisionalBanner version="v2" />
      <Header version="v2" active="news" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Actualités</span>
            <h1>
              Campagnes, <em>événements</em> &amp; prévention
            </h1>
            <p>
              Suivez les dernières nouvelles de la clinique : campagnes de
              santé, nouveaux équipements et conseils de prévention.
            </p>
            <div className="news-filters">
              <span className="chip is-active" data-filter="all">Toutes</span>
              <span className="chip" data-filter="campagne">Campagnes de santé</span>
              <span className="chip" data-filter="evenement">Évènements</span>
              <span className="chip" data-filter="equipement">Nouveaux équipements</span>
              <span className="chip" data-filter="prevention">Prévention</span>
            </div>
            <div className="hero-pills">
              <span className="hero-pill">
                <Ico>
                  <path d="M4 5h13v14H4z" />
                  <path d="M17 9h3v8a2 2 0 0 1-3 1.7" />
                  <path d="M7 9h7M7 13h7M7 16h4" />
                </Ico>
                Publications mensuelles
              </span>
              <span className="hero-pill">
                <Ico>
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </Ico>
                Agenda des campagnes
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container news-full-grid">
          {NEWS_ITEMS.map((item, i) => (
            <Reveal index={i + 1} key={item.title}>
              <div className="card news-full-card" data-cat={item.cat}>
                <div className="photo-placeholder">{item.photo}</div>
                <span className="date">{item.date}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                <span className="chip cat">{item.category}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer version="v2" />
    </>
  );
}
