import type { ReactNode } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";
import { PageHero } from "@/app/components/PageHero";

function Ico({ children }: { children: ReactNode }) {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

const MISSION_INTRO =
  "La Clinique Médicale Saint-Viateur s'est donné pour mission de prodiguer des soins de haute qualité tout en plaçant la dignité humaine au centre absolu de ses actions. Nous nous engageons à :";

const MISSION_BULLETS = [
  {
    lead: "Accueillir et soulager :",
    text: "Recevoir chaque personne avec la chaleur, le respect et la bienveillance qu'elle mérite, en voyant en chaque patient un frère humain.",
  },
  {
    lead: "Guérir avec compétence :",
    text: "Mettre en œuvre les pratiques médicales les plus innovantes pour traiter la maladie avec une grande précision.",
  },
  {
    lead: "Accompagner et réconforter :",
    text: "Offrir une oreille attentive et un soutien moral indéfectible aux malades et à leurs proches dans les moments d'épreuve.",
  },
  {
    lead: "Protéger et prévenir :",
    text: "S'investir activement dans l'éducation à la santé pour préserver la vie, capital inestimable.",
  },
];

const VISION_TEXT =
  "Devenir un pilier de la santé et du bien-être partout en Côte d'Ivoire et dans la sous région Ouest Africaine, reconnu grâces à la robustesse de son plateau technique, mais tout autant pour son supplément d'âme, incarnant une médecine à la fois performante et humaine.";

const VALUES = [
  {
    letter: "C",
    word: "Compassion",
    text: "Plus qu'un simple patient, chaque personne soignée chez nous est traitée avec la même attention, la même douceur et la même bienveillance que s'il s'agissait d'un membre de notre propre famille.",
  },
  {
    letter: "M",
    word: "Maîtrise",
    text: "Notre quête de perfectionnement médical n'est pas seulement un standard professionnel, c'est un engagement personnel et profond envers ceux qui placent leur santé entre nos mains.",
  },
  {
    letter: "S",
    word: "Sincérité",
    text: "L'honnêteté et la transparence guident chacune de nos actions. Nous exerçons notre métier avec une droiture absolue, fidèles à notre conscience et aux principes moraux les plus élevés.",
  },
  {
    letter: "V",
    word: "Vocation",
    text: "Notre équipe s'investit corps et âme pour la guérison. Nous concevons le soin comme un véritable sacerdoce, un engagement total au service de la communauté.",
  },
];

export default function NotreIdentitePage() {
  return (
    <>
      <Header active="notre-identite" />

      <PageHero
        eyebrow="À propos de nous"
        title={
          <>
            Notre <em>identité</em>
          </>
        }
        description="Notre mission, notre vision et les valeurs qui animent chaque jour les équipes de la Clinique Médicale Saint Viateur."
        videoSrc="/hero-medoc-home.mp4"
      />

      <section className="section">
        <div className="container">
          <Reveal index={0}>
            <div className="section-header" style={{ marginBottom: 24 }}>
              <span className="eyebrow">Notre mission</span>
              <h2>Une prise en charge centrée sur la dignité humaine</h2>
            </div>
          </Reveal>
          <Reveal index={1}>
            <div className="card" style={{ marginBottom: 52 }}>
              <p style={{ marginBottom: 20 }}>{MISSION_INTRO}</p>
              {MISSION_BULLETS.map((bullet) => (
                <div className="info-row" key={bullet.lead}>
                  <div className="icon-badge">
                    <Ico>
                      <path d="M5 13l4 4L19 7" />
                    </Ico>
                  </div>
                  <div>
                    <strong>{bullet.lead}</strong>
                    <span>{bullet.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal index={0}>
            <div className="section-header" style={{ marginBottom: 24 }}>
              <span className="eyebrow">Notre vision</span>
              <h2>Un pilier de la santé en Afrique de l&apos;Ouest</h2>
            </div>
          </Reveal>
          <Reveal index={1}>
            <div className="card" style={{ marginBottom: 52 }}>
              <p style={{ margin: 0 }}>{VISION_TEXT}</p>
            </div>
          </Reveal>

          <Reveal index={0}>
            <div className="section-header" style={{ marginBottom: 24 }}>
              <span className="eyebrow">Nos valeurs</span>
              <h2>C — M — S — V</h2>
            </div>
          </Reveal>
          <div className="services-grid">
            {VALUES.map((value, i) => (
              <Reveal index={i + 1} key={value.letter}>
                <div className="card service-card">
                  <div className="icon-badge">{value.letter}</div>
                  <strong>{value.word}</strong>
                  <p>{value.text}</p>
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
