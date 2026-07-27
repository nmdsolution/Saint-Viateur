import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProvisionalBanner } from "@/app/components/ProvisionalBanner";

export default function V1ContactPage() {
  return (
    <>
      <ProvisionalBanner version="v1" />
      <Header version="v1" active="contact" />

      <section className="page-hero">
        <span className="eyebrow">Contact</span>
        <h1>Parlons de votre santé</h1>
        <p>
          Une question, une demande de rendez-vous ou une urgence ? Contactez-nous
          par le formulaire, téléphone ou WhatsApp.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container contact-grid">
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

          <div>
            <div className="card" style={{ marginBottom: 20 }}>
              <div className="info-row">
                <div className="icon-badge">📍</div>
                <div>
                  <strong>Adresse</strong>
                  <span>Riviera SIDECI, Abidjan, Côte d&apos;Ivoire</span>
                </div>
              </div>
              <div className="info-row">
                <div className="icon-badge">📞</div>
                <div>
                  <strong>Téléphone</strong>
                  <span>+225 XX XX XX XX XX</span>
                </div>
              </div>
              <div className="info-row">
                <div className="icon-badge">✉</div>
                <div>
                  <strong>E-mail</strong>
                  <span>contact@cliniquesaintviateur.ci</span>
                </div>
              </div>
              <div className="info-row">
                <div className="icon-badge">🕒</div>
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
              <button className="btn btn-primary">💬 Écrire sur WhatsApp</button>
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
        </div>
      </section>

      <Footer version="v1" />
    </>
  );
}
