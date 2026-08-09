import type { ReactNode } from "react";

/**
 * Central registry of every inline icon used across the public pages,
 * keyed by the `icon_slug` values seeded in supabase/seed.sql. Paths are
 * copied verbatim from the bespoke <svg> markup that used to be duplicated
 * inline in app/services, app/equipment, app/patient-services and
 * app/page.tsx — several slugs intentionally reuse the exact same path set
 * because the original pages already reused the same icon art across
 * multiple specialties/tiles (e.g. Neurologie/Neurochirurgie, the three
 * surgery specialties, Urologie/Néphrologie/Radiologie/Scanner).
 *
 * Slugs with no prior inline-SVG source (the homepage "Nos partenaires"
 * section used real <img> logos for everything except CNTS) fall back to
 * FALLBACK_ICON — see ICON_PATHS comments below for exactly which slugs
 * that applies to.
 */
const ICON_PATHS: Record<string, ReactNode> = {
  // --- specialties: medecine -------------------------------------------------
  stethoscope: (
    <>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M10 12v3a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-2" />
      <circle cx="19" cy="9" r="2" />
    </>
  ),
  obstetrics: (
    <>
      <circle cx="11" cy="4.5" r="2" />
      <path d="M11 8c-2 0-3 2-3 4v8" />
      <path d="M11 9c3 0 5 2 5 5s-2 4-5 4" />
    </>
  ),
  baby: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21a6 6 0 0 1 12 0" />
      <path d="M10.5 8h.01M13.5 8h.01" />
    </>
  ),
  heart: <path d="M12 20s-7-4.5-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5c0 5-7 9.5-7 9.5z" />,
  lungs: (
    <>
      <path d="M12 4v9" />
      <path d="M12 8c-1.5 0-3 1-3.5 3l-1.5 5c-.4 1.4.6 2.5 2 2.5h2c.8 0 1.5-.7 1.5-1.5V8z" />
      <path d="M12 8c1.5 0 3 1 3.5 3l1.5 5c.4 1.4-.6 2.5-2 2.5h-2c-.8 0-1.5-.7-1.5-1.5V8z" />
    </>
  ),
  // Neurologie's icon; Neurochirurgie ("brain-surgery") reuses it verbatim.
  brain: (
    <>
      <path d="M12 5a3 3 0 0 0-6 0v1a3 3 0 0 0-1 5.5A3 3 0 0 0 7 19h5z" />
      <path d="M12 5a3 3 0 0 1 6 0v1a3 3 0 0 1 1 5.5A3 3 0 0 1 17 19h-5z" />
    </>
  ),
  "brain-surgery": (
    <>
      <path d="M12 5a3 3 0 0 0-6 0v1a3 3 0 0 0-1 5.5A3 3 0 0 0 7 19h5z" />
      <path d="M12 5a3 3 0 0 1 6 0v1a3 3 0 0 1 1 5.5A3 3 0 0 1 17 19h-5z" />
    </>
  ),
  joint: (
    <>
      <path d="M8.5 15.5l7-7" />
      <circle cx="6.4" cy="17.6" r="2.4" />
      <circle cx="17.6" cy="6.4" r="2.4" />
    </>
  ),
  // Urologie's icon; Néphrologie ("kidney"), Radiologie and Scanner reuse it.
  "urinary-tract": (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
      <path d="M3 12h18" />
    </>
  ),
  kidney: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
      <path d="M3 12h18" />
    </>
  ),
  "digestive-system": (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 7.5c-2.4 1.8 2.4 3.2 0 5s2.4 3.2 0 4" />
    </>
  ),
  "blood-drop": <path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3z" />,
  endocrine: (
    <>
      <path d="M12 4v16M6 8h12" />
      <path d="M6 8l-3 5h6zM18 8l-3 5h6z" />
    </>
  ),
  skin: (
    <>
      <path d="M10 3h4v3l1.5 2c.3.6.5 1.3.5 2v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-9c0-.7.2-1.4.5-2L10 6z" />
      <path d="M8 13h8" />
    </>
  ),
  infection: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 7V4M12 20v-3M7 12H4M20 12h-3M8.5 8.5 6 6M18 18l-2.5-2.5" />
    </>
  ),
  oncology: (
    <>
      <path d="M9 20.5l3-7 3 7" />
      <path d="M12 13.5 8 6a4 4 0 0 1 8 0z" />
    </>
  ),
  psychiatry: <path d="M5 5h5a2 2 0 1 1 4 0h5v5a2 2 0 1 0 0 4v5H5z" />,
  nutrition: (
    <>
      <path d="M4 12h16a8 8 0 0 1-16 0z" />
      <path d="M8 12a4 4 0 0 1 8 0" />
    </>
  ),
  rehabilitation: <path d="M3 13h4l3-5 3 8 2-4h5" />,
  trauma: (
    <>
      <rect x="3.5" y="8" width="17" height="8" rx="4" transform="rotate(-20 12 12)" />
      <path d="M11 11h.01M13 13h.01" />
    </>
  ),

  // --- specialties: chirurgie -------------------------------------------------
  // Chirurgie Générale's icon; Chirurgie Pédiatrique and Chirurgie Thoracique
  // ("pediatric-surgery" / "thoracic-surgery") reuse it verbatim.
  surgery: (
    <>
      <path d="M4 20l7-7" />
      <path d="M11 13l6-9 3 3-6 6z" />
    </>
  ),
  "pediatric-surgery": (
    <>
      <path d="M4 20l7-7" />
      <path d="M11 13l6-9 3 3-6 6z" />
    </>
  ),
  "thoracic-surgery": (
    <>
      <path d="M4 20l7-7" />
      <path d="M11 13l6-9 3 3-6 6z" />
    </>
  ),
  ent: <path d="M8.5 20.5c0-3-1.5-4-1.5-8a5 5 0 0 1 10 0c0 3-3 3-3 6a2.5 2.5 0 0 1-4 1.5" />,
  // Stomatologie's icon; Chirurgie Dentaire ("dental-surgery") reuses it.
  dental: (
    <path d="M8 3C6 3 4.5 4.6 4.5 7c0 5 1.5 6 2 13 .1 1.4 2 1.6 2.4 0L10 15c.3-1.2 1.7-1.2 2 0l1.1 5c.4 1.6 2.3 1.4 2.4 0 .5-7 2-8 2-13 0-2.4-1.5-4-3.5-4-1.6 0-2 .8-3 .8S9.6 3 8 3z" />
  ),
  "dental-surgery": (
    <path d="M8 3C6 3 4.5 4.6 4.5 7c0 5 1.5 6 2 13 .1 1.4 2 1.6 2.4 0L10 15c.3-1.2 1.7-1.2 2 0l1.1 5c.4 1.6 2.3 1.4 2.4 0 .5-7 2-8 2-13 0-2.4-1.5-4-3.5-4-1.6 0-2 .8-3 .8S9.6 3 8 3z" />
  ),

  // --- specialties: technique --------------------------------------------------
  anesthesia: <path d="M20 14a8 8 0 1 1-9.5-10 6.5 6.5 0 0 0 9.5 10z" />,
  radiology: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
      <path d="M3 12h18" />
    </>
  ),
  lab: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v14a2 2 0 0 0 4 0V3" />
      <path d="M10 12h4" />
    </>
  ),
  physio: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 8v5M12 13l-5 6M12 13l5 6M6 11l6 2 6-2" />
    </>
  ),

  // --- equipment_highlights ------------------------------------------------
  // Same path set as "radiology"/"urinary-tract" (Equipment marquee reuses it).
  scanner: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M20 8V6a2 2 0 0 0-2-2h-2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2" />
      <path d="M3 12h18" />
    </>
  ),
  // "hospital-bed" (patient-services: Hospitalisation) reuses this icon too.
  "operating-room": (
    <>
      <path d="M3 19v-9M3 14h18v5" />
      <path d="M21 19v-5a3 3 0 0 0-3-3h-7v3" />
      <circle cx="7" cy="11" r="2" />
    </>
  ),
  "hospital-bed": (
    <>
      <path d="M3 19v-9M3 14h18v5" />
      <path d="M21 19v-5a3 3 0 0 0-3-3h-7v3" />
      <circle cx="7" cy="11" r="2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  // "insurance" (patient-services: Assurances acceptées) reuses this shield.
  "shield-check": <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  insurance: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  // Same path set as "stethoscope" (Équipe technique formée reuses it).
  team: (
    <>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M10 12v3a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-2" />
      <circle cx="19" cy="9" r="2" />
    </>
  ),

  // --- patient_service_tiles -------------------------------------------------
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  emergency: (
    <>
      <path d="M3 16.5V8h11v8.5" />
      <path d="M14 11h3l3 3v2.5h-6" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
      <path d="M8 10v3M6.5 11.5h3" />
    </>
  ),
  pharmacy: (
    <>
      <rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)" />
      <path d="M9.5 14.5l5-5" />
    </>
  ),
  whatsapp: <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" />,

  // --- partners --------------------------------------------------------------
  // The only partner that had real inline SVG art in the source (the other
  // five partners used real <img> logos, not icons — see FALLBACK_ICON note
  // in the Icon component below).
  "blood-bank": (
    <>
      <path d="M9 3h6l1 4H8z" />
      <path d="M8 7l-3 13h14L16 7" />
      <path d="M10 12h4" />
    </>
  ),
};

/** Generic circle/dot icon used for any icon_slug not found in ICON_PATHS. */
const FALLBACK_ICON: ReactNode = (
  <>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="2" />
  </>
);

export function Icon({
  slug,
  className = "ico",
}: {
  slug?: string | null;
  className?: string;
}) {
  const paths = (slug && ICON_PATHS[slug]) || FALLBACK_ICON;
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {paths}
    </svg>
  );
}
