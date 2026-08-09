"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

const CONTENT_NAV: NavItem[] = [
  { href: "/admin/specialties", label: "Spécialités" },
  { href: "/admin/equipment", label: "Équipements" },
  { href: "/admin/patient-services", label: "Services patients & FAQ" },
  { href: "/admin/partners", label: "Assurances & partenaires" },
  { href: "/admin/gallery", label: "Galerie" },
  { href: "/admin/news", label: "Actualités" },
];

const SITE_NAV: NavItem[] = [
  { href: "/admin/site-settings", label: "Paramètres du site" },
  { href: "/admin/chatbot", label: "Assistant — conversations" },
  { href: "/admin/staff", label: "Équipe" },
];

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  return (
    <Link
      href={item.href}
      className={isActive ? "adm-nav-link active" : "adm-nav-link"}
    >
      {item.label}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="adm-sidebar">
      <Link href="/admin" className="adm-brand">
        <Image
          src="/logo.png"
          alt="Logo Clinique Médicale Saint Viateur"
          width={40}
          height={33}
        />
        <div className="adm-brand-text">
          <strong>Saint Viateur</strong>
          <span>Backoffice</span>
        </div>
      </Link>

      <nav className="adm-nav">
        <div className="adm-nav-group">
          <span className="adm-nav-group-label">Contenu</span>
          {CONTENT_NAV.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>

        <div className="adm-nav-group">
          <span className="adm-nav-group-label">Site</span>
          {SITE_NAV.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </div>
      </nav>
    </aside>
  );
}