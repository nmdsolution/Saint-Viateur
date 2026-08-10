export const NAV_ITEMS = [
  { slug: "", label: "Accueil" },
  { slug: "services", label: "Spécialités" },
  { slug: "equipment", label: "Équipements" },
  { slug: "mot-direction", label: "Mot de la direction" },
  { slug: "ils-parlent-de-nous", label: "Ils parlent de nous" },
  { slug: "patient-services", label: "Services patients" },
  { slug: "gallery", label: "Galerie" },
  { slug: "news", label: "Actualités" },
  { slug: "contact", label: "Contact" },
] as const;

export type Slug = (typeof NAV_ITEMS)[number]["slug"];

export type NavGroup =
  | { type: "link"; slug: Slug; label: string }
  | { type: "dropdown"; label: string; items: { slug: Slug; label: string }[] };

export const NAV_GROUPS: NavGroup[] = [
  { type: "link", slug: "", label: "Accueil" },
  {
    type: "dropdown",
    label: "À propos de nous",
    items: [
      { slug: "services", label: "Spécialités" },
      { slug: "equipment", label: "Équipements" },
      { slug: "mot-direction", label: "Mot de la direction" },
      { slug: "ils-parlent-de-nous", label: "Ils parlent de nous" },
    ],
  },
  { type: "link", slug: "patient-services", label: "Services patients" },
  {
    type: "dropdown",
    label: "Découvrir",
    items: [
      { slug: "gallery", label: "Galerie" },
      { slug: "news", label: "Actualités" },
    ],
  },
  { type: "link", slug: "contact", label: "Contact" },
];

export function pathFor(slug: Slug): string {
  return slug ? `/${slug}` : "/";
}
