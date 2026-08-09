import type { ReactNode } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Reveal } from "@/app/components/Reveal";

function Ico({ children }: { children: ReactNode }) {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header active="contact" />

      <section className="page-hero">
        <div className="blob blob-a" />
        <div className="blob blob-c" />
        <Reveal index={0}>
          <div>
            <span className="eyebrow">Contact</span>
            <h1>
              Parlons de <em>votre santé</em>
            </h1>
            <p>
              Une question, une demande de rendez-vous ou une urgence ?
              Contactez-nous par le formulaire, téléphone ou WhatsApp.
            </p>
            <div className="hero-pills">
              <span className="hero-pill">
                <Ico>
                  <path d="M6 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />
                </Ico>
                +225 XX XX XX XX XX
              </span>
              <span className="hero-pill">
                <Ico>
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4l3 2" />
                </Ico>
                Réponse sous 24 h
              </span>
              <span className="hero-pill">
                <Ico>
                  <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </Ico>
                Riviera SIDECI
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container contact-grid">
          <Reveal index={1}>
            <div className="card contact-form">
              <strong style={{ display: "block", marginBottom: 18, fontSize: 16 }}>
                Formulaire de contact
              </strong>
              <label>Nom complet</label>
              <input type="text" placeholder="Votre nom" />
              <label>Téléphone</label>
              <input type="text" placeholder="+225 XX XX XX XX XX" />
              <label>E-mail</label>
              <input type="text" placeholder="vous@exemple.com" />
              <label>Motif</label>
              <select>
                <option>Prise de rendez-vous</option>
                <option>Question générale</option>
                <option>Recrutement</option>
              </select>
              <label>Message</label>
              <textarea placeholder="Votre message..." />
              <button className="btn btn-primary" style={{ width: "100%" }}>
                Envoyer
              </button>
            </div>
          </Reveal>

          <Reveal index={2}>
            <div>
              <div className="card" style={{ marginBottom: 20 }}>
                <div className="info-row">
                  <div className="icon-badge">
                    <Ico>
                      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </Ico>
                  </div>
                  <div>
                    <strong>Adresse</strong>
                    <span>Riviera SIDECI, Abidjan, Côte d&apos;Ivoire</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="icon-badge">
                    <Ico>
                      <path d="M6 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />
                    </Ico>
                  </div>
                  <div>
                    <strong>Téléphone</strong>
                    <span>+225 XX XX XX XX XX</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="icon-badge">
                    <Ico>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 8l9 6 9-6" />
                    </Ico>
                  </div>
                  <div>
                    <strong>E-mail</strong>
                    <span>contact@cliniquesaintviateur.ci</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="icon-badge">
                    <Ico>
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 8v4l3 2" />
                    </Ico>
                  </div>
                  <div>
                    <strong>Horaires</strong>
                    <span>Lun–Dim, urgences 24h/24</span>
                  </div>
                </div>
                <div className="photo-placeholder map-placeholder">Carte Google Maps</div>
              </div>

              <div className="whatsapp-band">
                <div>
                  <strong style={{ display: "block", marginBottom: 2 }}>
                    WhatsApp Business
                  </strong>
                  <span style={{ fontSize: 13, color: "var(--color-ink-soft)" }}>
                    Réponse rapide pour vos questions
                  </span>
                </div>
                <button className="btn btn-primary">
                  <Ico>
                    <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" />
                  </Ico>{" "}
                  Écrire sur WhatsApp
                </button>
              </div>

              <div style={{ marginTop: 20 }}>
                <strong style={{ display: "block", marginBottom: 10, fontSize: "13.5px" }}>
                  Réseaux sociaux
                </strong>
                <div className="social-row" style={{ justifyContent: "flex-start" }}>
                  <a
                    href="#"
                    style={{ background: "var(--color-primary-light)", color: "var(--color-primary-darker)" }}
                  >
                    f
                  </a>
                  <a
                    href="#"
                    style={{ background: "var(--color-primary-light)", color: "var(--color-primary-darker)" }}
                  >
                    in
                  </a>
                  <a
                    href="#"
                    style={{ background: "var(--color-primary-light)", color: "var(--color-primary-darker)" }}
                  >
                    ig
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
