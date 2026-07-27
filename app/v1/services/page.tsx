import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProvisionalBanner } from "@/app/components/ProvisionalBanner";

const MEDICAL_SPECIALTIES = [
  { icon: "🩺", name: "Médecine Générale" },
  { icon: "🤰", name: "Gynécologie – Obstétrique" },
  { icon: "👶", name: "Pédiatrie" },
  { icon: "❤", name: "Cardiologie" },
  { icon: "🫁", name: "Pneumologie" },
  { icon: "🧠", name: "Neurologie" },
  { icon: "🧠", name: "Neurochirurgie" },
  { icon: "🦴", name: "Rhumatologie" },
  { icon: "🩻", name: "Urologie" },
  { icon: "🩻", name: "Néphrologie" },
  { icon: "🍽", name: "Hépato-gastro-entérologie" },
  { icon: "🩸", name: "Hématologie" },
  { icon: "⚖", name: "Endocrinologie – Diabétologie" },
  { icon: "🧴", name: "Dermatologie – Vénérologie" },
  { icon: "🦠", name: "Infectiologie" },
  { icon: "🎗", name: "Cancérologie (Oncologie)" },
  { icon: "🧩", name: "Psychiatrie" },
  { icon: "🥗", name: "Nutrition" },
  { icon: "🏃", name: "Médecine Physique et de Réadaptation" },
  { icon: "🩹", name: "Traumatologie" },
];

const SURGICAL_SPECIALTIES = [
  { icon: "🔪", name: "Chirurgie Générale" },
  { icon: "🔪", name: "Chirurgie Pédiatrique" },
  { icon: "🔪", name: "Chirurgie Thoracique" },
  { icon: "👂", name: "ORL (Oto-Rhino-Laryngologie)" },
  { icon: "🦷", name: "Stomatologie" },
  { icon: "🦷", name: "Chirurgie Dentaire" },
];

const TECHNICAL_PLATFORM = [
  { icon: "💤", name: "Anesthésie – Réanimation" },
  { icon: "🩻", name: "Radiologie et Imagerie Médicale" },
  { icon: "🧪", name: "Biologie Médicale" },
  { icon: "🧘", name: "Kinésithérapie" },
];

export default function V1ServicesPage() {
  return (
    <>
      <ProvisionalBanner version="v1" />
      <Header version="v1" active="services" />

      <section className="page-hero">
        <span className="eyebrow">Répertoire des spécialités</span>
        <h1>30 spécialités médicales, une seule adresse</h1>
        <p>
          De la médecine générale à la chirurgie spécialisée, retrouvez
          l&apos;ensemble des disciplines proposées à la clinique.
        </p>
        <div className="filters">
          <span className="chip is-active">Toutes</span>
          <span className="chip">Médecine</span>
          <span className="chip">Chirurgie</span>
          <span className="chip">Plateau technique</span>
        </div>
      </section>

      <div className="lang-strip">
        <strong style={{ color: "var(--color-ink)" }}>Langues parlées :</strong>
        <span className="chip chip-neutral">Français</span>
        <span className="chip chip-neutral">Anglais</span>
        <span className="chip chip-neutral">Langues locales</span>
      </div>

      <section className="section">
        <div className="container">
          <div className="specialty-group">
            <h3>Médecine &amp; spécialités médicales</h3>
            <div className="specialty-list">
              {MEDICAL_SPECIALTIES.map((item) => (
                <div className="card specialty-item" key={item.name}>
                  <div className="icon-badge">{item.icon}</div>
                  <strong>{item.name}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="specialty-group">
            <h3>Chirurgie</h3>
            <div className="specialty-list">
              {SURGICAL_SPECIALTIES.map((item) => (
                <div className="card specialty-item" key={item.name}>
                  <div className="icon-badge">{item.icon}</div>
                  <strong>{item.name}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="specialty-group">
            <h3>Plateau technique</h3>
            <div className="specialty-list">
              {TECHNICAL_PLATFORM.map((item) => (
                <div className="card specialty-item" key={item.name}>
                  <div className="icon-badge">{item.icon}</div>
                  <strong>{item.name}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="card planning-card">
            <div>
              <strong style={{ display: "block", marginBottom: 6 }}>
                Planning de consultation
              </strong>
              <p style={{ margin: 0, fontSize: "13.5px", color: "var(--color-ink-soft)" }}>
                Consultez les jours et horaires disponibles pour chaque
                spécialité.
              </p>
            </div>
            <button className="btn btn-outline">Voir le planning</button>
          </div>
        </div>
      </section>

      <Footer version="v1" />
    </>
  );
}
