"use client";

import { useEffect, useState, type CSSProperties, type FocusEvent } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

const SLIDE_INTERVAL_MS = 5000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (paused) return;
      setActive((current) => (current === 0 ? 1 : 0));
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setPaused(false);
    }
  };

  return (
    <>
      <div
        className="hero-track"
        style={{ "--active": active } as CSSProperties}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={handleBlur}
      >
        <div
          className="hero-slide hero-slide-logo"
          data-active={active === 0}
        >
          <div className="blob blob-a" />
          <div className="blob blob-b" />
          <div>
            <Reveal index={0}>
              <span className="eyebrow">Clinique médicale pluridisciplinaire</span>
            </Reveal>
            <Reveal index={1}>
              <h1>
                Votre santé, entre des <span className="accent">mains de confiance</span>
              </h1>
            </Reveal>
            <Reveal index={2}>
              <p className="lead">
                La Clinique Médicale Saint Viateur accompagne les familles
                d&apos;Abidjan avec plus de 30 spécialités médicales, des
                équipements modernes et une équipe disponible 24h/24 pour les
                urgences.
              </p>
            </Reveal>
            <Reveal index={3}>
              <div className="hero-actions">
                <button className="btn btn-primary">Prendre rendez-vous</button>
                <button className="btn btn-outline">Découvrir nos services</button>
              </div>
            </Reveal>
            <Reveal index={4}>
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
            </Reveal>
          </div>
          <Reveal index={5}>
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

        <div
          className="hero-slide hero-slide-video"
          data-active={active === 1}
        >
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            src="/hero-medoc-home.mp4"
          />
          <div className="hero-actions">
            <button className="btn btn-primary">Prendre rendez-vous</button>
            <button className="btn btn-outline">Découvrir nos services</button>
          </div>
        </div>
      </div>

      <div className="hero-dots">
        {[0, 1].map((slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            className="hero-dot"
            data-active={active === slideIndex}
            aria-label={`Aller à la diapositive ${slideIndex + 1}`}
            onClick={() => setActive(slideIndex)}
          />
        ))}
      </div>
    </>
  );
}
