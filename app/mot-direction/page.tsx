import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";

const DIRECTOR_MESSAGE = {
  paragraphs: [
    "La santé est un don précieux qu'il est de notre devoir de préserver, de protéger et de restaurer avec le plus grand dévouement. Au sein de la Clinique médicale Saint-Viateur, nous considérons que soigner est bien plus qu'une profession : c'est une véritable vocation, portée par l'amour du prochain et une rigueur scientifique sans compromis.",
    "Pour répondre efficacement aux attentes des populations et nous hisser au rang de structure sanitaire d'excellence, la Clinique Médicale Saint Viateur continue d'améliorer son plateau technique afin de maintenir sa place au rang des structures d'excellence.",
    "Nous avons récemment franchi un cap décisif avec l'acquisition d'équipements biomédicaux de pointe, venant consolider la performance de notre service d'imagerie médicale et laboratoire d'analyse médicale. Parallèlement, guidés par la volonté d'offrir une prise en charge médicale complète, nous sommes fiers d'avoir procédé à l'ouverture de nouvelles spécialités, à l'image de notre nouveau pôle d'ophtalmologie et de notre unité de réanimation dotée des dernières technologies.",
    "Associer une infrastructure moderne à une approche profondément humaine constitue le cœur de notre engagement.",
    "Nos équipes médicales et paramédicales, animées par un esprit de solidarité et de charité, déploient chaque jour leurs compétences pour faire de notre clinique un lieu de guérison, de réconfort et de paix pour chaque patient et sa famille.",
  ],
  signature: "La Direction Générale",
};

export default function MotDirectionPage() {
  return (
    <>
      <Header active="mot-direction" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">À propos de nous</span>
            <h1>
              Mot de la <em>direction</em>
            </h1>
            <p>
              Un message de notre direction sur l&apos;engagement et les
              valeurs de la Clinique Médicale Saint Viateur.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal index={1}>
            <div className="card director-card">
              <div className="director-quote">
                {DIRECTOR_MESSAGE.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="director-signature">
                  <strong>{DIRECTOR_MESSAGE.signature}</strong>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
