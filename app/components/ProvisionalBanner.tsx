import type { Version } from "@/app/lib/nav";

export function ProvisionalBanner({ version }: { version: Version }) {
  return (
    <div className="provisional-banner">
      {version === "v1"
        ? "Maquette de conception — contenu provisoire à valider avec la clinique (voir todo.txt)"
        : "Maquette de conception (V2 — plus animée) — contenu provisoire à valider avec la clinique"}
    </div>
  );
}
