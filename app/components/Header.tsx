import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, pathFor, type Slug } from "@/app/lib/nav";

export function Header({ active }: { active: Slug }) {
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
            href={pathFor(item.slug)}
            className={item.slug === active ? "active" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-cta">
        <span className="emergency-strip">
          <span className="dot" /> Urgences 24h/24
        </span>
        <button className="btn btn-primary btn-sm">Prendre RDV</button>
      </div>
    </header>
  );
}
