import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";
import { Icon } from "@/app/components/IconRegistry";
import { createClient } from "@/lib/supabase/server";

type Equipment = {
  id: string;
  name: string;
  description: string | null;
  photo_url: string | null;
  sort_order: number;
};

type EquipmentHighlight = {
  id: string;
  icon_slug: string | null;
  label: string;
  sort_order: number;
};

export default async function EquipmentPage() {
  const supabase = await createClient();
  const [{ data: equipmentData }, { data: highlightsData }] = await Promise.all([
    supabase
      .from("equipment")
      .select("id, name, description, photo_url, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("equipment_highlights")
      .select("id, icon_slug, label, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  const equipment = (equipmentData ?? []) as Equipment[];
  const highlights = (highlightsData ?? []) as EquipmentHighlight[];
  const marqueeItems = [...highlights, ...highlights];

  return (
    <>
      <Header active="equipment" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Plateau technique</span>
            <h1>
              Des équipements médicaux <em>modernes</em>
            </h1>
            <p>
              Un investissement continu dans la technologie pour un diagnostic
              plus rapide et plus précis.
            </p>
            <div className="hero-pills">
              <span className="hero-pill">
                <Icon slug="radiology" className="ico" />
                Imagerie numérique
              </span>
              <span className="hero-pill">
                <Icon slug="lab" className="ico" />
                Laboratoire sur site
              </span>
              <span className="hero-pill">
                <Icon slug="clock" className="ico" />
                Résultats rapides
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={`${item.id}-${i}`}>
              <Icon slug={item.icon_slug} className="ico" />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container equip-grid">
          {equipment.map((item, i) => (
            <Reveal index={i + 1} key={item.id}>
              <div className="card equip-card">
                <div className="photo-placeholder">
                  {item.photo_url ?? `Photo — ${item.name}`}
                </div>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
