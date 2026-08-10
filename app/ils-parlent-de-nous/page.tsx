import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";

// PROVISIONAL CONTENT — unlike the homepage "Nos partenaires" section (which
// names real institutions as an explicitly-flagged provisional placeholder,
// see app/page.tsx), no real press mention has ever been collected for this
// clinic. Every field below is a generic bracketed placeholder — do NOT
// replace with invented outlet names, dates or quotes; only real, confirmed
// press mentions supplied by the clinic should ever appear here.
const PRESS_MENTIONS_PLACEHOLDER = [{ id: "press-1" }, { id: "press-2" }, { id: "press-3" }];

export default function IlsParlentDeNousPage() {
  return (
    <>
      <Header active="ils-parlent-de-nous" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">À propos de nous</span>
            <h1>
              Ils parlent <em>de nous</em>
            </h1>
            <p>
              La presse et les médias qui évoquent la Clinique Médicale Saint
              Viateur.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal index={0}>
            <span className="chip chip-neutral provisional-flag" style={{ marginBottom: 28, display: "inline-flex" }}>
              Contenu provisoire — aucune mention presse réelle n&apos;a
              encore été collectée
            </span>
          </Reveal>
          <div className="press-grid">
            {PRESS_MENTIONS_PLACEHOLDER.map((item, i) => (
              <Reveal index={i + 1} key={item.id}>
                <div className="card press-card">
                  <div className="photo-placeholder press-logo">Logo média</div>
                  <strong>[Nom du média]</strong>
                  <span className="date">[Date]</span>
                  <p className="press-title">[Titre de l&apos;article]</p>
                  <p className="press-quote">
                    « [Citation d&apos;exemple à titre indicatif] »
                  </p>
                  <a href="#" className="press-link">
                    Lire l&apos;article →
                  </a>
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
