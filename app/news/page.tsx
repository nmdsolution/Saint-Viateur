import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";
import { createClient } from "@/lib/supabase/server";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  published_date: string;
  photo_url: string | null;
  sort_order: number;
};

// The "cat" filter chips (data-filter) predate the DB's `category` column,
// which stores the full French label shown on the card ("Campagne de
// santé", ...). This maps the known labels back to those filter keys so the
// existing chip wiring in SiteMotion keeps working; anything unrecognized
// simply won't match a specific chip (still shows under "Toutes").
const CATEGORY_FILTER_KEYS: Record<string, string> = {
  "Campagne de santé": "campagne",
  "Nouvel équipement": "equipement",
  Prévention: "prevention",
  Évènement: "evenement",
};

const DATE_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function formatPublishedDate(isoDate: string): string {
  return DATE_FORMATTER.format(new Date(`${isoDate}T00:00:00`));
}

export default async function NewsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news_items")
    .select("id, title, excerpt, category, published_date, photo_url, sort_order")
    .order("published_date", { ascending: false });

  const newsItems = (data ?? []) as NewsItem[];

  return (
    <>
      <Header active="news" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Actualités</span>
            <h1>
              Campagnes, <em>événements</em> &amp; prévention
            </h1>
            <p>
              Suivez les dernières nouvelles de la clinique : campagnes de
              santé, nouveaux équipements et conseils de prévention.
            </p>
            <div className="news-filters">
              <span className="chip is-active" data-filter="all">Toutes</span>
              <span className="chip" data-filter="campagne">Campagnes de santé</span>
              <span className="chip" data-filter="evenement">Évènements</span>
              <span className="chip" data-filter="equipement">Nouveaux équipements</span>
              <span className="chip" data-filter="prevention">Prévention</span>
            </div>
            <div className="hero-pills">
              <span className="hero-pill">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 5h13v14H4z" />
                  <path d="M17 9h3v8a2 2 0 0 1-3 1.7" />
                  <path d="M7 9h7M7 13h7M7 16h4" />
                </svg>
                Publications mensuelles
              </span>
              <span className="hero-pill">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
                Agenda des campagnes
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container news-full-grid">
          {newsItems.map((item, i) => (
            <Reveal index={i + 1} key={item.id}>
              <div
                className="card news-full-card"
                data-cat={(item.category && CATEGORY_FILTER_KEYS[item.category]) || ""}
              >
                <div className="photo-placeholder">
                  {item.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.photo_url} alt={item.title} />
                  ) : (
                    `Photo — ${item.title}`
                  )}
                </div>
                <span className="date">{formatPublishedDate(item.published_date)}</span>
                <strong>{item.title}</strong>
                <p>{item.excerpt}</p>
                <span className="chip cat">{item.category}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
