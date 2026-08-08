export const NAV_ITEMS = [
  { slug: "", label: "Accueil" },
  { slug: "services", label: "Spécialités" },
  { slug: "equipment", label: "Équipements" },
  { slug: "patient-services", label: "Services patients" },
  { slug: "gallery", label: "Galerie" },
  { slug: "news", label: "Actualités" },
  { slug: "contact", label: "Contact" },
] as const;

export type Slug = (typeof NAV_ITEMS)[number]["slug"];

export function pathFor(slug: Slug): string {
  return slug ? `/${slug}` : "/";
}
