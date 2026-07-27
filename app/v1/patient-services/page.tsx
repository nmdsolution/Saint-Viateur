import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProvisionalBanner } from "@/app/components/ProvisionalBanner";

const SERVICE_TILES = [
  { icon: "📅", name: "Prise de rendez-vous", description: "En ligne, par téléphone ou WhatsApp.", withButton: true },
  { icon: "🛏", name: "Hospitalisation", description: "Chambres individuelles et collectives, documents à fournir à l'admission." },
  { icon: "🚑", name: "Urgences", description: "Accueil des urgences 24h/24, 7j/7." },
  { icon: "💊", name: "Pharmacie", description: "Pharmacie sur site pour vos traitements." },
  { icon: "🧪", name: "Laboratoire", description: "Analyses biologiques, retrait des résultats en ligne." },
  { icon: "🩻", name: "Imagerie médicale", description: "Scanner, échographie, radiologie numérique." },
  { icon: "🛡", name: "Assurances acceptées", description: "Liste des assurances et partenaires conventionnés." },
  { icon: "💬", name: "Chat WhatsApp", description: "Une question ? Écrivez-nous directement." },
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

export default function V1PatientServicesPage() {
  return (
    <>
      <ProvisionalBanner version="v1" />
      <Header version="v1" active="patient-services" />

      <section className="page-hero">
        <span className="eyebrow">Services aux patients</span>
        <h1>Tout ce qu&apos;il faut savoir avant votre visite</h1>
        <p>
          Rendez-vous, hospitalisation, pharmacie, laboratoire, imagerie et
          assurances — retrouvez toutes les informations pratiques.
        </p>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-grid">
            {SERVICE_TILES.map((tile) => (
              <div className="card service-tile" key={tile.name}>
                <div className="icon-badge">{tile.icon}</div>
                <strong>{tile.name}</strong>
                <p>{tile.description}</p>
                {tile.withButton && (
                  <button className="btn btn-outline btn-sm" style={{ marginTop: 10 }}>
                    Réserver
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="section-header" style={{ marginBottom: 24 }}>
            <span className="eyebrow">Assurances &amp; partenaires</span>
            <h2>Assurances conventionnées</h2>
          </div>
          <div className="card" style={{ marginBottom: 48 }}>
            <div className="insurance-row">
              <span className="chip chip-neutral">NSIA Assurances</span>
              <span className="chip chip-neutral">Saham Assurance</span>
              <span className="chip chip-neutral">Allianz CI</span>
              <span className="chip chip-neutral">CNAM</span>
              <span className="chip chip-neutral">+ Liste complète des partenaires</span>
            </div>
          </div>

          <div className="section-header" style={{ marginBottom: 8 }}>
            <span className="eyebrow">FAQ</span>
            <h2>Questions fréquentes des patients</h2>
          </div>
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

      <Footer version="v1" />
    </>
  );
}
