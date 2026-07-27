import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProvisionalBanner } from "@/app/components/ProvisionalBanner";

const EQUIPMENT = [
  {
    photo: "Photo — Scanner / Imagerie",
    name: "Scanner (Imagerie médicale)",
    description: "Examens d'imagerie haute résolution pour un diagnostic précis.",
  },
  {
    photo: "Photo — Échographe",
    name: "Échographe",
    description: "Suivi de grossesse et explorations abdominales / cardiaques.",
  },
  {
    photo: "Photo — Radiologie numérique",
    name: "Radiologie numérique",
    description: "Radiographies numériques à faible dose, résultats rapides.",
  },
  {
    photo: "Photo — Laboratoire",
    name: "Laboratoire d'analyses",
    description: "Analyses biologiques sur place avec rendu rapide des résultats.",
  },
  {
    photo: "Photo — Bloc opératoire",
    name: "Bloc opératoire équipé",
    description: "Salles d'opération aux normes pour la chirurgie générale et spécialisée.",
  },
  {
    photo: "Photo — Monitoring",
    name: "Monitoring & réanimation",
    description: "Surveillance continue des patients en soins intensifs.",
  },
];

export default function V1EquipmentPage() {
  return (
    <>
      <ProvisionalBanner version="v1" />
      <Header version="v1" active="equipment" />

      <section className="page-hero">
        <span className="eyebrow">Plateau technique</span>
        <h1>Des équipements médicaux modernes</h1>
        <p>
          Un investissement continu dans la technologie pour un diagnostic plus
          rapide et plus précis.
        </p>
      </section>

      <section className="section">
        <div className="container equip-grid">
          {EQUIPMENT.map((item) => (
            <div className="card equip-card" key={item.name}>
              <div className="photo-placeholder">{item.photo}</div>
              <strong>{item.name}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer version="v1" />
    </>
  );
}
