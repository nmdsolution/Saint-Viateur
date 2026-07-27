import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProvisionalBanner } from "@/app/components/ProvisionalBanner";

const NEWS_ITEMS = [
  {
    photo: "Photo — campagne",
    date: "12 juin 2026",
    title: "Campagne de dépistage gratuit du diabète",
    description: "Une semaine de dépistage ouverte à tous, sur rendez-vous.",
    category: "Campagne de santé",
  },
  {
    photo: "Photo — nouvel équipement",
    date: "28 mai 2026",
    title: "Un nouvel appareil d'imagerie médicale",
    description: "La clinique renforce son plateau technique en radiologie.",
    category: "Nouvel équipement",
  },
  {
    photo: "Photo — prévention",
    date: "03 mai 2026",
    title: "5 gestes pour prévenir l'hypertension",
    description: "Les conseils de nos cardiologues pour un cœur en bonne santé.",
    category: "Prévention",
  },
  {
    photo: "Photo — évènement",
    date: "20 avril 2026",
    title: "Journée portes ouvertes de la clinique",
    description: "Venez visiter nos installations et rencontrer nos équipes.",
    category: "Évènement",
  },
  {
    photo: "Photo — campagne",
    date: "02 avril 2026",
    title: "Consultations gratuites pour la journée mondiale de la santé",
    description: "Une initiative de sensibilisation ouverte à la communauté.",
    category: "Campagne de santé",
  },
  {
    photo: "Photo — prévention",
    date: "15 mars 2026",
    title: "Bien s'alimenter pendant la grossesse",
    description: "Les recommandations de notre service de nutrition.",
    category: "Prévention",
  },
];

export default function V1NewsPage() {
  return (
    <>
      <ProvisionalBanner version="v1" />
      <Header version="v1" active="news" />

      <section className="page-hero">
        <span className="eyebrow">Actualités</span>
        <h1>Campagnes, événements &amp; prévention</h1>
        <p>
          Suivez les dernières nouvelles de la clinique : campagnes de santé,
          nouveaux équipements et conseils de prévention.
        </p>
        <div className="news-filters">
          <span className="chip is-active">Toutes</span>
          <span className="chip">Campagnes de santé</span>
          <span className="chip">Évènements</span>
          <span className="chip">Nouveaux équipements</span>
          <span className="chip">Prévention</span>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container news-full-grid">
          {NEWS_ITEMS.map((item) => (
            <div className="card news-full-card" key={item.title}>
              <div className="photo-placeholder">{item.photo}</div>
              <span className="date">{item.date}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <span className="chip cat">{item.category}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer version="v1" />
    </>
  );
}
