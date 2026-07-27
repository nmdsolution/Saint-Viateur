"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ports the V2 mockup's scripted French chatbot (design/v2_sync's
 * assets/chatbot.js) as a client component. The knowledge base, the
 * normalize()/answer() matching logic and the conversational flow
 * (typing indicator, quick replies, greeting) are kept verbatim —
 * only the DOM-building is translated to React state/JSX.
 */

type KBEntry = { k: string[]; a: string; q: string[] };

const KB: KBEntry[] = [
  { k: ["rendez", "rdv", "reserver", "réserver", "consultation"], a: "Pour un rendez-vous : réservation en ligne via le bouton « Prendre RDV », par téléphone au +225 XX XX XX XX XX, ou sur WhatsApp. Souhaitez-vous une consultation générale ou une spécialité ?", q: ["Spécialités", "Horaires"] },
  { k: ["urgence", "urgences", "nuit", "24"], a: "Le service des urgences est ouvert 24h/24 et 7j/7, sans rendez-vous. En cas d'urgence vitale, présentez-vous directement à l'accueil des urgences.", q: ["Adresse", "Téléphone"] },
  { k: ["horaire", "heure", "ouvert", "ouverture"], a: "Consultations : tous les jours, du lundi au dimanche. Urgences : 24h/24. Le laboratoire et l'imagerie fonctionnent aux heures d'ouverture de la clinique.", q: ["Rendez-vous", "Résultats"] },
  { k: ["specialite", "spécialité", "specialites", "spécialités", "médecin", "medecin", "docteur"], a: "Plus de 30 spécialités : médecine générale, pédiatrie, cardiologie, gynécologie-obstétrique, imagerie, chirurgie, dermatologie, ORL, dentaire et bien d'autres. La liste complète est sur la page Spécialités.", q: ["Rendez-vous", "Équipements"] },
  { k: ["assurance", "mutuelle", "cnam", "prise en charge", "remboursement"], a: "La clinique travaille avec un large réseau d'assurances conventionnées. Munissez-vous de votre carte d'assuré et d'une pièce d'identité lors de l'admission.", q: ["Tarifs", "Hospitalisation"] },
  { k: ["resultat", "résultat", "analyse", "laboratoire", "labo"], a: "Les résultats d'analyses sont disponibles au laboratoire et peuvent être transmis par e-mail sur demande. Prévoyez votre reçu et une pièce d'identité pour le retrait.", q: ["Horaires", "Téléphone"] },
  { k: ["adresse", "ou", "où", "situe", "situé", "plan", "localisation", "venir"], a: "Nous sommes à Riviera SIDECI, Abidjan, Côte d'Ivoire. La carte et l'itinéraire sont sur la page Contact.", q: ["Horaires", "Urgences"] },
  { k: ["telephone", "téléphone", "numero", "numéro", "appeler", "contact", "whatsapp"], a: "Téléphone : +225 XX XX XX XX XX — également joignable sur WhatsApp. E-mail : contact@cliniquesaintviateur.ci", q: ["Rendez-vous", "Adresse"] },
  { k: ["equipement", "équipement", "scanner", "imagerie", "radio", "echographie", "échographie"], a: "Le plateau technique comprend imagerie numérique, échographie, scanner, laboratoire d'analyses et bloc opératoire. Détails sur la page Équipements.", q: ["Rendez-vous", "Spécialités"] },
  { k: ["hospitalisation", "chambre", "sejour", "séjour", "admission"], a: "Chambres individuelles et collectives. À l'admission : pièce d'identité, carte d'assurance et ordonnance ou lettre du médecin traitant.", q: ["Assurances", "Tarifs"] },
  { k: ["tarif", "prix", "cout", "coût", "combien"], a: "Les tarifs dépendent de la consultation et de la prise en charge par votre assurance. L'accueil vous communiquera un devis précis — appelez le +225 XX XX XX XX XX.", q: ["Assurances", "Rendez-vous"] },
  { k: ["pediatrie", "pédiatrie", "enfant", "bebe", "bébé", "vaccin"], a: "La pédiatrie assure le suivi de croissance, les vaccinations et les consultations de l'enfant, du nouveau-né à l'adolescent.", q: ["Rendez-vous", "Horaires"] },
  { k: ["grossesse", "enceinte", "gyneco", "gynéco", "accouchement", "maternite", "maternité"], a: "Le service de gynécologie-obstétrique assure le suivi de grossesse, les échographies et l'accouchement, avec une équipe disponible en continu.", q: ["Rendez-vous", "Équipements"] },
  { k: ["merci", "super", "parfait", "ok"], a: "Avec plaisir 🙂 Puis-je vous aider sur autre chose ?", q: ["Rendez-vous", "Urgences"] },
  { k: ["bonjour", "salut", "bonsoir", "hello"], a: "Bonjour et bienvenue à la Clinique Médicale Saint Viateur. Comment puis-je vous aider aujourd'hui ?", q: ["Rendez-vous", "Urgences", "Horaires"] },
];

const FALLBACK: KBEntry = {
  k: [],
  a: "Je n'ai pas encore la réponse à cette question. L'accueil de la clinique peut vous renseigner au +225 XX XX XX XX XX, ou via le formulaire de la page Contact.",
  q: ["Rendez-vous", "Urgences", "Spécialités"],
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function answer(text: string): KBEntry {
  const t = normalize(text);
  let best: KBEntry | null = null;
  let score = 0;
  KB.forEach((entry) => {
    let s = 0;
    entry.k.forEach((k) => {
      if (t.indexOf(normalize(k)) !== -1) s += k.length;
    });
    if (s > score) {
      score = s;
      best = entry;
    }
  });
  return best || FALLBACK;
}

type Message = { id: number; role: "bot" | "me"; text: string };

let messageId = 0;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [quick, setQuick] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  function bot(text: string, q: string[]) {
    setQuick([]);
    setTyping(true);
    const delay = Math.min(1400, 500 + text.length * 8);
    typingTimeout.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: messageId++, role: "bot", text }]);
      setQuick(q);
    }, delay);
  }

  function send(text: string) {
    setMessages((prev) => [...prev, { id: messageId++, role: "me", text }]);
    const result = answer(text);
    bot(result.a, result.q);
  }

  function toggle() {
    const next = !open;
    setOpen(next);
    setBadgeVisible(false);
    if (next) {
      if (!greeted) {
        setGreeted(true);
        bot(
          "Bonjour 👋 Je suis l'assistant de la Clinique Médicale Saint Viateur. Rendez-vous, urgences, horaires, assurances — posez votre question.",
          ["Rendez-vous", "Urgences", "Horaires", "Assurances"]
        );
      }
      setTimeout(() => inputRef.current?.focus(), 320);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value) return;
    setInputValue("");
    send(value);
  }

  return (
    <>
      <button
        className="cb-launcher"
        aria-label="Ouvrir l'assistant"
        onClick={toggle}
        type="button"
      >
        <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" />
        </svg>
        {badgeVisible && <span className="cb-badge" />}
      </button>

      <div className={`cb-panel${open ? " open" : ""}`}>
        <div className="cb-head">
          <div className="av">
            <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="4" y="8" width="16" height="11" rx="3" />
              <path d="M12 4v4M9 13h.01M15 13h.01M9.5 16.5h5" />
            </svg>
          </div>
          <div>
            <strong>Assistant Saint Viateur</strong>
            <span>
              <i /> En ligne — réponse immédiate
            </span>
          </div>
          <div className="x" role="button" aria-label="Fermer" onClick={toggle}>
            &#10005;
          </div>
        </div>

        <div className="cb-body" ref={bodyRef}>
          {messages.map((m) => (
            <div className={`cb-msg ${m.role}`} key={m.id}>
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="cb-typing">
              <i />
              <i />
              <i />
            </div>
          )}
        </div>

        <div className="cb-quick">
          {quick.map((label) => (
            <button type="button" key={label} onClick={() => send(label)}>
              {label}
            </button>
          ))}
        </div>

        <form className="cb-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Écrivez votre question…"
            aria-label="Votre message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
          />
          <button type="submit" aria-label="Envoyer">
            <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12l16-8-7 16-2-6z" />
            </svg>
          </button>
        </form>

        <div className="cb-note">
          Assistant de démonstration — les informations médicales doivent être
          confirmées par la clinique.
        </div>
      </div>
    </>
  );
}
