"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

const SLIDE_INTERVAL_MS = 5000;

function HeroText() {
  return (
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
  );
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((current) => (current === 0 ? 1 : 0));
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="hero-track"
      style={{ "--active": active } as CSSProperties}
    >
      <div className="hero-slide hero-slide-logo">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <Reveal index={0}>
          <HeroText />
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
      </div>

      <div className="hero-slide hero-slide-video">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          src="/hero-medoc-home.mp4"
        />
        <div className="hero-video-overlay" />
        <div className="hero-content">
          <HeroText />
        </div>
      </div>
    </div>
  );
}
