import Image from "next/image";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProvisionalBanner } from "@/app/components/ProvisionalBanner";
import {
  HOME_SERVICE_CARD_PHOTOS,
  HOME_WHY_CARD_PHOTOS,
  photoCardBackground,
} from "@/app/lib/homeCardPhotos";

export default function V1HomePage() {
  return (
    <>
      <ProvisionalBanner version="v1" />
      <Header version="v1" active="" />

      <section className="hero">
        <div>
          <span className="eyebrow">Clinique médicale pluridisciplinaire</span>
          <h1>Votre santé, entre des mains de confiance</h1>
          <p className="lead">
            La Clinique Médicale Saint Viateur accompagne les familles
            d&apos;Abidjan avec plus de 30 spécialités médicales, des
            équipements modernes et une équipe disponible 24h/24 pour les
            urgences.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Prendre rendez-vous</button>
            <button className="btn btn-outline">Découvrir nos services</button>
          </div>
          <div className="hero-facts">
            <div>
              <strong>30+</strong>
              <span>Spécialités médicales</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Service d&apos;urgences</span>
            </div>
            <div>
              <strong>15+</strong>
              <span>Équipements de pointe</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/logo.png"
            alt="Bâtiment de la clinique"
            width={897}
            height={726}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Nos services</span>
            <h2>Un accompagnement médical complet</h2>
            <p>
              Un aperçu de nos spécialités les plus consultées — la liste
              complète est disponible sur la page Spécialités.
            </p>
          </div>
          <div className="services-grid">
            <div
              className="card service-card photo-card"
              style={{ backgroundImage: photoCardBackground(HOME_SERVICE_CARD_PHOTOS.medecineGenerale) }}
            >
              <div className="icon-badge">🩺</div>
              <strong>Médecine Générale</strong>
              <p>Consultations pour toute la famille, du dépistage au suivi.</p>
            </div>
            <div
              className="card service-card photo-card"
              style={{ backgroundImage: photoCardBackground(HOME_SERVICE_CARD_PHOTOS.pediatrie) }}
            >
              <div className="icon-badge">👶</div>
              <strong>Pédiatrie</strong>
              <p>Suivi de la croissance et de la santé de l&apos;enfant.</p>
            </div>
            <div
              className="card service-card photo-card"
              style={{ backgroundImage: photoCardBackground(HOME_SERVICE_CARD_PHOTOS.cardiologie) }}
            >
              <div className="icon-badge">❤</div>
              <strong>Cardiologie</strong>
              <p>Diagnostic et suivi des maladies cardiovasculaires.</p>
            </div>
            <div
              className="card service-card photo-card"
              style={{ backgroundImage: photoCardBackground(HOME_SERVICE_CARD_PHOTOS.gynecologieObstetrique) }}
            >
              <div className="icon-badge">🤰</div>
              <strong>Gynécologie – Obstétrique</strong>
              <p>Suivi de grossesse et santé de la femme.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Pourquoi nous choisir</span>
            <h2>Une clinique pensée pour votre tranquillité</h2>
          </div>
          <div className="why-grid">
            <div
              className="why-card photo-card"
              style={{ backgroundImage: photoCardBackground(HOME_WHY_CARD_PHOTOS.equipementsModernes) }}
            >
              <div className="icon-badge">🏥</div>
              <strong>Équipements modernes</strong>
              <p style={{ fontSize: "13.5px" }}>
                Imagerie, laboratoire et bloc opératoire aux normes actuelles.
              </p>
            </div>
            <div
              className="why-card photo-card"
              style={{ backgroundImage: photoCardBackground(HOME_WHY_CARD_PHOTOS.equipeMultilingue) }}
            >
              <div className="icon-badge">🌍</div>
              <strong>Équipe multilingue</strong>
              <p style={{ fontSize: "13.5px" }}>
                Consultations en français, anglais et langues locales.
              </p>
            </div>
            <div
              className="why-card photo-card"
              style={{ backgroundImage: photoCardBackground(HOME_WHY_CARD_PHOTOS.assurancesAcceptees) }}
            >
              <div className="icon-badge">💳</div>
              <strong>Assurances acceptées</strong>
              <p style={{ fontSize: "13.5px" }}>
                Large réseau de partenaires et assurances conventionnées.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div>
          <h3>Besoin d&apos;un rendez-vous rapidement ?</h3>
          <p>Réservez en ligne ou contactez-nous directement sur WhatsApp.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            className="btn btn-primary"
            style={{ background: "#fff", color: "var(--color-primary-darker)" }}
          >
            Prendre rendez-vous
          </button>
          <button
            className="btn"
            style={{ border: "1.5px solid rgba(255,255,255,0.5)", color: "#fff" }}
          >
            💬 WhatsApp
          </button>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Actualités</span>
            <h2>Ce qui se passe à la clinique</h2>
          </div>
          <div className="news-grid">
            <div className="card news-card">
              <div className="photo-placeholder">Photo — campagne de santé</div>
              <span className="date">12 juin 2026</span>
              <strong style={{ display: "block", marginTop: 6 }}>
                Campagne de dépistage gratuit
              </strong>
            </div>
            <div className="card news-card">
              <div className="photo-placeholder">Photo — nouvel équipement</div>
              <span className="date">28 mai 2026</span>
              <strong style={{ display: "block", marginTop: 6 }}>
                Un nouvel appareil d&apos;imagerie médicale
              </strong>
            </div>
            <div className="card news-card">
              <div className="photo-placeholder">Photo — prévention</div>
              <span className="date">03 mai 2026</span>
              <strong style={{ display: "block", marginTop: 6 }}>
                5 gestes pour prévenir l&apos;hypertension
              </strong>
            </div>
          </div>
        </div>
      </section>

      <Footer version="v1" />
    </>
  );
}
