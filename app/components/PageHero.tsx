import type { ReactNode } from "react";
import { Reveal } from "@/app/components/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  /** Optional background video (e.g. "/hero-medoc-home.mp4"). Renders the `.page-hero--video` variant. */
  videoSrc?: string;
  /** Extra content rendered after the description, e.g. the services/equipment hero-pills row. */
  children?: ReactNode;
};

/**
 * Shared "page-hero" banner used by the "À propos de nous" dropdown pages.
 * Without `videoSrc` it renders the classic decorative-blob hero; with it,
 * a full-bleed looping background video with a dark scrim for legibility.
 */
export function PageHero({ eyebrow, title, description, videoSrc, children }: PageHeroProps) {
  const text = (
    <div className={videoSrc ? "page-hero-text" : undefined}>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );

  if (videoSrc) {
    return (
      <section className="page-hero page-hero--video">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          src={videoSrc}
        />
        <Reveal index={0}>{text}</Reveal>
      </section>
    );
  }

  return (
    <section className="page-hero">
      <div className="blob blob-a" />
      <div className="blob blob-c" />
      <Reveal index={0}>{text}</Reveal>
    </section>
  );
}
