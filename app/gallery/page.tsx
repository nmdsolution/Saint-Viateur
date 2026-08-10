import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";
import { createClient } from "@/lib/supabase/server";

type GalleryPhoto = {
  id: string;
  label: string;
  category: string;
  photo_url: string | null;
  tall: boolean;
  sort_order: number;
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_photos")
    .select("id, label, category, photo_url, tall, sort_order")
    .order("sort_order", { ascending: true });

  const photos = (data ?? []) as GalleryPhoto[];

  return (
    <>
      <Header active="gallery" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Galerie</span>
            <h1>
              Découvrez la clinique <em>en images</em>
            </h1>
            <p>
              Accueil, salles d&apos;attente, chambres, bloc opératoire et
              équipements — un aperçu visuel de nos installations.
            </p>
            <div className="gallery-tabs">
              <span className="chip is-active" data-filter="all">Tout</span>
              <span className="chip" data-filter="accueil">Accueil</span>
              <span className="chip" data-filter="attente">Salles d&apos;attente</span>
              <span className="chip" data-filter="chambre">Chambres</span>
              <span className="chip" data-filter="bloc">Bloc opératoire</span>
              <span className="chip" data-filter="equip">Équipements</span>
            </div>
            <div className="hero-pills">
              <span className="hero-pill">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="7" width="18" height="13" rx="3" />
                  <circle cx="12" cy="13.5" r="3.2" />
                  <path d="M9 7l1.5-3h3L15 7" />
                </svg>
                Visite photo
              </span>
              <span className="hero-pill">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Riviera SIDECI, Abidjan
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="gallery-grid">
            {photos.map((photo, index) => (
              <Reveal index={index + 1} key={photo.id}>
                <div
                  className={`photo-placeholder${photo.tall ? " tall" : ""}`}
                  data-cat={photo.category}
                  data-zoom={photo.photo_url ?? `Photo — ${photo.label}`}
                >
                  {photo.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo.photo_url} alt={photo.label} />
                  ) : (
                    photo.label
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal index={0}>
            <div className="section-header" style={{ marginBottom: 20 }}>
              <span className="eyebrow">Vidéo</span>
              <h2>Vidéo de présentation</h2>
            </div>
          </Reveal>
          <Reveal index={0}>
            <div className="video-block">
              <div className="play">▶</div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
