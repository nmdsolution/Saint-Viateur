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

export type Version = "v1" | "v2";

export function pathFor(version: Version, slug: Slug): string {
  return slug ? `/${version}/${slug}` : `/${version}`;
}
