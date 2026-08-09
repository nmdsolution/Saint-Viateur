import Image from "next/image";
import Link from "next/link";
import { NAV_GROUPS, pathFor, type Slug } from "@/app/lib/nav";

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
        {NAV_GROUPS.map((group) => {
          if (group.type === "link") {
            return (
              <Link
                key={group.slug || "home"}
                href={pathFor(group.slug)}
                className={group.slug === active ? "active" : undefined}
              >
                {group.label}
              </Link>
            );
          }

          const isGroupActive = group.items.some((item) => item.slug === active);

          return (
            <div key={group.label} className="site-nav-item" tabIndex={0}>
              <button
                type="button"
                className={
                  isGroupActive ? "site-nav-trigger active" : "site-nav-trigger"
                }
              >
                {group.label}
                <svg className="caret" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="nav-dropdown">
                {group.items.map((item) => (
                  <Link key={item.slug} href={pathFor(item.slug)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
      <div className="header-cta">
        <span className="emergency-strip">
          <span className="dot" /> Urgences 24h/24
        </span>
        <button className="btn btn-primary btn-sm">Prendre RDV</button>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Ouvrir le menu"
          aria-expanded="false"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="mobile-nav-panel">
        {NAV_GROUPS.map((group) => {
          if (group.type === "link") {
            return (
              <Link
                key={group.slug || "home"}
                href={pathFor(group.slug)}
                className={group.slug === active ? "active" : undefined}
              >
                {group.label}
              </Link>
            );
          }

          return (
            <div key={group.label}>
              <span className="group-label">{group.label}</span>
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={pathFor(item.slug)}
                  className={
                    item.slug === active ? "sub-link active" : "sub-link"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          );
        })}
        <span className="emergency-strip">
          <span className="dot" /> Urgences 24h/24
        </span>
      </div>
    </header>
  );
}
