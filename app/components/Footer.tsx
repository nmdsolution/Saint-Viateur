import Link from "next/link";
import { pathFor } from "@/app/lib/nav";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="cols">
        <div className="col">
          <h4>Clinique Médicale Saint Viateur</h4>
          <p>Riviera SIDECI, Abidjan, Côte d&apos;Ivoire</p>
          <p>Ouvert tous les jours — Urgences 24h/24</p>
          <div className="social-row">
            <a href="#">f</a>
            <a href="#">in</a>
            <a href="#">ig</a>
            <a href="#">wa</a>
          </div>
        </div>
        <div className="col">
          <h4>Navigation</h4>
          <Link href={pathFor("services")}>Spécialités</Link>
          <Link href={pathFor("equipment")}>Équipements</Link>
          <Link href={pathFor("gallery")}>Galerie</Link>
          <Link href={pathFor("news")}>Actualités</Link>
        </div>
        <div className="col">
          <h4>Patients</h4>
          <Link href={pathFor("patient-services")}>Prendre RDV</Link>
          <Link href={pathFor("patient-services")}>
            Résultats d&apos;analyses
          </Link>
          <Link href={pathFor("patient-services")}>Assurances</Link>
          <Link href={pathFor("patient-services")}>FAQ</Link>
        </div>
        <div className="col">
          <h4>Contact</h4>
          <Link href={pathFor("contact")}>Formulaire de contact</Link>
          <a href="tel:+225XXXXXXXXX">+225 XX XX XX XX XX</a>
          <a href="#">contact@cliniquesaintviateur.ci</a>
        </div>
      </div>
      <div className="bottom">
        <span>© 2026 Clinique Médicale Saint Viateur — Tous droits réservés</span>
        <span>Riviera SIDECI, Abidjan</span>
      </div>
    </footer>
  );
}
