import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";

const SECTIONS = [
  {
    title: "Respect du secret médical et protection des données",
    text: "La Clinique Médicale Saint-Viateur considère la confidentialité de vos informations comme un principe inviolable, en adéquation avec nos valeurs de respect de l'individu et d'intégrité morale.",
  },
  {
    title: "Collecte et usage de vos informations",
    text: "Dans le cadre de votre prise en charge, nous recueillons des informations administratives (nom, contact, adresse). Ces données sont collectées dans l'unique but de faciliter votre suivi médical, de personnaliser votre accueil et de vous prodiguer les meilleurs soins possibles.",
  },
  {
    title: "Confidentialité garantie",
    text: "Vos données personnelles demeurent strictement confidentielles. Elles ne feront jamais l'objet d'une vente, d'un échange ou d'une cession à des tiers à des fins commerciales. En nous confiant votre santé, vous nous confiez également la protection de vos informations privées, une responsabilité que nous honorons avec la plus grande rigueur éthique.",
  },
  {
    title: "Sécurité et accès",
    text: "Nous déployons des mesures de sécurité avancées pour préserver vos données médicales. L'accès à ces informations est limité au seul personnel soignant et administratif directement impliqué dans votre prise en charge. Nos serveurs et archives physiques sont sécurisés afin de prévenir toute intrusion.",
  },
];

export default function ConfidentialitePage() {
  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Informations légales</span>
            <h1>
              Politique de <em>confidentialité</em>
            </h1>
            <p>
              Comment la Clinique Médicale Saint Viateur collecte, utilise et
              protège vos informations personnelles.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            {SECTIONS.map((section, i) => (
              <Reveal index={i + 1} key={section.title}>
                <div className="card" style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 20, marginTop: 0 }}>{section.title}</h2>
                  <p style={{ margin: 0 }}>{section.text}</p>
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
