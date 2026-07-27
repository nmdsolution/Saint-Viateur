import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, pathFor, type Slug, type Version } from "@/app/lib/nav";

export function Header({
  version,
  active,
}: {
  version: Version;
  active: Slug;
}) {
  const otherVersion: Version = version === "v1" ? "v2" : "v1";
  const switchLabel = version === "v1" ? "Switch to V2" : "Switch to V1";

  return (
    <header className="site-header">
      <div className="brand">
        <Image
          src="/logo.png"
          alt="Logo Clinique Médicale Saint Viateur"
          width={59}
          height={48}
          style={{ height: 48, width: "auto" }}
          priority
        />
        <div className="brand-text">
          <strong>Clinique Médicale Saint Viateur</strong>
          <span>Riviera SIDECI — Abidjan</span>
        </div>
      </div>
      <nav className="site-nav">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.slug || "home"}
            href={pathFor(version, item.slug)}
            className={item.slug === active ? "active" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-cta">
        <span className="emergency-strip">
          {version === "v2" ? <span className="dot" /> : "☎"} Urgences 24h/24
        </span>
        <button className="btn btn-primary btn-sm">Prendre RDV</button>
        <Link href={pathFor(otherVersion, active)} className="btn btn-outline btn-sm">
          {switchLabel}
        </Link>
      </div>
    </header>
  );
}
