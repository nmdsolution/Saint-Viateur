import Image from "next/image";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProvisionalBanner } from "@/app/components/ProvisionalBanner";
import { Reveal } from "@/app/components/Reveal";
import { CountUp } from "@/app/components/CountUp";

export default function V2HomePage() {
  return (
    <>
      <ProvisionalBanner version="v2" />
      <Header version="v2" active="" />

      <section className="hero">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Clinique médicale pluridisciplinaire</span>
            <h1>
              Votre santé, entre des <span className="accent">mains de confiance</span>
            </h1>
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
                <CountUp target={30} suffix="+" />
                <br />
                <span>Spécialités médicales</span>
              </div>
              <div>
                <CountUp target={24} suffix="/7" />
                <br />
                <span>Service d&apos;urgences</span>
              </div>
              <div>
                <CountUp target={15} suffix="+" />
                <br />
                <span>Équipements de pointe</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal index={1}>
          <div className="hero-visual">
            <Image
              src="/logo.png"
              alt="Bâtiment de la clinique"
              width={897}
              height={726}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Reveal>
      </section>

      <svg
        className="wave-divider"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32 C360,80 1080,-16 1440,32 L1440,60 L0,60 Z"
          fill="#F2FAFC"
        />
      </svg>

      <section className="section section-soft" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal index={0}>
            <div className="section-header">
              <span className="eyebrow">Nos services</span>
              <h2>Un accompagnement médical complet</h2>
              <p>
                Un aperçu de nos spécialités les plus consultées — la liste
                complète est disponible sur la page Spécialités.
              </p>
            </div>
          </Reveal>
          <div className="services-grid">
            <Reveal index={1}>
              <div className="card service-card">
                <div className="icon-badge">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 3v5a4 4 0 0 0 8 0V3" />
                    <path d="M10 12v3a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-2" />
                    <circle cx="19" cy="9" r="2" />
                  </svg>
                </div>
                <strong>Médecine Générale</strong>
                <p>Consultations pour toute la famille, du dépistage au suivi.</p>
              </div>
            </Reveal>
            <Reveal index={2}>
              <div className="card service-card">
                <div className="icon-badge">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 21a6 6 0 0 1 12 0" />
                    <path d="M10.5 8h.01M13.5 8h.01" />
                  </svg>
                </div>
                <strong>Pédiatrie</strong>
                <p>Suivi de la croissance et de la santé de l&apos;enfant.</p>
              </div>
            </Reveal>
            <Reveal index={3}>
              <div className="card service-card">
                <div className="icon-badge">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 20s-7-4.5-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5c0 5-7 9.5-7 9.5z" />
                  </svg>
                </div>
                <strong>Cardiologie</strong>
                <p>Diagnostic et suivi des maladies cardiovasculaires.</p>
              </div>
            </Reveal>
            <Reveal index={4}>
              <div className="card service-card">
                <div className="icon-badge">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="4.5" r="2" />
                    <path d="M11 8c-2 0-3 2-3 4v8" />
                    <path d="M11 9c3 0 5 2 5 5s-2 4-5 4" />
                  </svg>
                </div>
                <strong>Gynécologie – Obstétrique</strong>
                <p>Suivi de grossesse et santé de la femme.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal index={0}>
            <div className="section-header">
              <span className="eyebrow">Pourquoi nous choisir</span>
              <h2>Une clinique pensée pour votre tranquillité</h2>
            </div>
          </Reveal>
          <div className="why-grid">
            <Reveal index={1}>
              <div className="why-card card">
                <div className="icon-badge">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 21V7l8-4 8 4v14" />
                    <path d="M12 10v6M9 13h6" />
                  </svg>
                </div>
                <strong>Équipements modernes</strong>
                <p style={{ fontSize: "13.5px" }}>
                  Imagerie, laboratoire et bloc opératoire aux normes actuelles.
                </p>
              </div>
            </Reveal>
            <Reveal index={2}>
              <div className="why-card card">
                <div className="icon-badge">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M4 12h16" />
                    <path d="M12 4c2.5 2.4 2.5 13.6 0 16-2.5-2.4-2.5-13.6 0-16z" />
                  </svg>
                </div>
                <strong>Équipe multilingue</strong>
                <p style={{ fontSize: "13.5px" }}>
                  Consultations en français, anglais et langues locales.
                </p>
              </div>
            </Reveal>
            <Reveal index={3}>
              <div className="why-card card">
                <div className="icon-badge">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="6" width="18" height="12" rx="2" />
                    <path d="M3 10h18M7 15h4" />
                  </svg>
                </div>
                <strong>Assurances acceptées</strong>
                <p style={{ fontSize: "13.5px" }}>
                  Large réseau de partenaires et assurances conventionnées.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal index={0}>
        <div className="cta-band">
          <div>
            <h3>Besoin d&apos;un rendez-vous rapidement ?</h3>
            <p>Réservez en ligne ou contactez-nous directement sur WhatsApp.</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="btn"
              style={{ background: "#fff", color: "var(--color-primary-darker)", animation: "none" }}
            >
              Prendre rendez-vous
            </button>
            <button
              className="btn"
              style={{ border: "1.5px solid rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.14)", color: "#fff" }}
            >
              <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" />
              </svg>{" "}
              WhatsApp
            </button>
          </div>
        </div>
      </Reveal>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal index={0}>
            <div className="section-header">
              <span className="eyebrow">Actualités</span>
              <h2>Ce qui se passe à la clinique</h2>
            </div>
          </Reveal>
          <div className="news-grid">
            <Reveal index={1}>
              <div className="card news-card">
                <div className="photo-placeholder">Photo — campagne de santé</div>
                <span className="date">12 juin 2026</span>
                <strong style={{ display: "block", marginTop: 6 }}>
                  Campagne de dépistage gratuit
                </strong>
              </div>
            </Reveal>
            <Reveal index={2}>
              <div className="card news-card">
                <div className="photo-placeholder">Photo — nouvel équipement</div>
                <span className="date">28 mai 2026</span>
                <strong style={{ display: "block", marginTop: 6 }}>
                  Un nouvel appareil d&apos;imagerie médicale
                </strong>
              </div>
            </Reveal>
            <Reveal index={3}>
              <div className="card news-card">
                <div className="photo-placeholder">Photo — prévention</div>
                <span className="date">03 mai 2026</span>
                <strong style={{ display: "block", marginTop: 6 }}>
                  5 gestes pour prévenir l&apos;hypertension
                </strong>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer version="v2" />
    </>
  );
}
