import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";

// PROVISIONAL CONTENT — the clinic has never supplied a real "Mot du
// Directeur Général" (see todo.txt, checklist item A: "Mot du Directeur
// Général"). Every string below is a placeholder and must be replaced with
// the real message, name and title once the clinic provides them.
const DIRECTOR_MESSAGE = {
  paragraphs: [
    "[Texte provisoire] Depuis sa création, la Clinique Médicale Saint Viateur s'engage à offrir à chaque patient une prise en charge humaine, rigoureuse et à la pointe de la médecine moderne.",
    "[Texte provisoire] Notre équipe reste mobilisée chaque jour pour faire de votre santé notre priorité, avec exigence, écoute et bienveillance.",
  ],
  name: "[Nom du Directeur Général]",
  title: "Directeur Général — Clinique Médicale Saint Viateur",
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
              Un message de notre Directeur Général sur l&apos;engagement et
              les valeurs de la Clinique Médicale Saint Viateur.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal index={1}>
            <div className="card director-card">
              <div className="photo-placeholder director-photo">
                Photo du Directeur Général
              </div>
              <div className="director-quote">
                <span className="chip chip-neutral provisional-flag">
                  Contenu provisoire — en attente de validation par la
                  clinique
                </span>
                {DIRECTOR_MESSAGE.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="director-signature">
                  <strong>{DIRECTOR_MESSAGE.name}</strong>
                  <span>{DIRECTOR_MESSAGE.title}</span>
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