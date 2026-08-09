import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";
import { Icon } from "@/app/components/IconRegistry";
import { createClient } from "@/lib/supabase/server";

type ServiceTile = {
  id: string;
  icon_slug: string | null;
  name: string;
  description: string | null;
  cta_label: string | null;
  sort_order: number;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

type Insurance = {
  id: string;
  name: string;
  sort_order: number;
};

export default async function PatientServicesPage() {
  const supabase = await createClient();
  const [{ data: tilesData }, { data: faqData }, { data: insuranceData }] = await Promise.all([
    supabase
      .from("patient_service_tiles")
      .select("id, icon_slug, name, description, cta_label, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("faq_items")
      .select("id, question, answer, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("insurances")
      .select("id, name, sort_order")
      .order("sort_order", { ascending: true }),
  ]);

  const serviceTiles = (tilesData ?? []) as ServiceTile[];
  const faqItems = (faqData ?? []) as FaqItem[];
  const insurances = (insuranceData ?? []) as Insurance[];
  const firstFaqId = faqItems[0]?.id;

  return (
    <>
      <Header active="patient-services" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Services aux patients</span>
            <h1>
              Tout ce qu&apos;il faut savoir <em>avant votre visite</em>
            </h1>
            <p>
              Rendez-vous, hospitalisation, pharmacie, laboratoire, imagerie et
              assurances — retrouvez toutes les informations pratiques.
            </p>
            <div className="hero-pills">
              <span className="hero-pill">
                <Icon slug="calendar" className="ico" />
                RDV en ligne
              </span>
              <span className="hero-pill">
                <Icon slug="hospital-bed" className="ico" />
                Chambres individuelles
              </span>
              <span className="hero-pill">
                <Icon slug="insurance" className="ico" />
                Assurances conventionnées
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-grid">
            {serviceTiles.map((tile, i) => (
              <Reveal index={i + 1} key={tile.id}>
                <div className="card service-tile">
                  <div className="icon-badge">
                    <Icon slug={tile.icon_slug} className="ico" />
                  </div>
                  <strong>{tile.name}</strong>
                  <p>{tile.description}</p>
                  {tile.cta_label && (
                    <button className="btn btn-outline btn-sm" style={{ marginTop: 10 }}>
                      {tile.cta_label}
                    </button>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal index={0}>
            <div className="section-header" style={{ marginBottom: 24 }}>
              <span className="eyebrow">Assurances &amp; partenaires</span>
              <h2>Assurances conventionnées</h2>
            </div>
          </Reveal>
          <Reveal index={0}>
            <div className="card" style={{ marginBottom: 52 }}>
              <div className="insurance-row">
                {insurances.map((insurance) => (
                  <span className="chip chip-neutral" key={insurance.id}>
                    {insurance.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal index={0}>
            <div className="section-header" style={{ marginBottom: 8 }}>
              <span className="eyebrow">FAQ</span>
              <h2>Questions fréquentes des patients</h2>
            </div>
          </Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {faqItems.map((item) => (
              <details className="faq-item" open={item.id === firstFaqId} key={item.id}>
                <summary>
                  {item.question} <span>＋</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
