import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProvisionalBanner } from "@/app/components/ProvisionalBanner";

const PHOTOS = [
  { label: "Accueil", tall: true },
  { label: "Salle d'attente" },
  { label: "Chambre" },
  { label: "Bloc opératoire" },
  { label: "Équipement" },
  { label: "Salle d'attente" },
  { label: "Chambre" },
  { label: "Couloir" },
  { label: "Équipement" },
];

export default function V1GalleryPage() {
  return (
    <>
      <ProvisionalBanner version="v1" />
      <Header version="v1" active="gallery" />

      <section className="page-hero">
        <span className="eyebrow">Galerie</span>
        <h1>Découvrez la clinique en images</h1>
        <p>
          Accueil, salles d&apos;attente, chambres, bloc opératoire et
          équipements — un aperçu visuel de nos installations.
        </p>
        <div className="gallery-tabs">
          <span className="chip is-active">Tout</span>
          <span className="chip">Accueil</span>
          <span className="chip">Salles d&apos;attente</span>
          <span className="chip">Chambres</span>
          <span className="chip">Bloc opératoire</span>
          <span className="chip">Équipements</span>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="gallery-grid">
            {PHOTOS.map((photo, index) => (
              <div
                className={`photo-placeholder${photo.tall ? " tall" : ""}`}
                key={`${photo.label}-${index}`}
              >
                {photo.label}
              </div>
            ))}
          </div>

          <div className="section-header" style={{ marginBottom: 20 }}>
            <span className="eyebrow">Vidéo</span>
            <h2>Vidéo de présentation</h2>
          </div>
          <div className="video-block">
            <div className="play">▶</div>
          </div>
        </div>
      </section>

      <Footer version="v1" />
    </>
  );
}
