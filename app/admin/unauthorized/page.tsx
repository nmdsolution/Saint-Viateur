import Link from "next/link";

export default function AdminUnauthorizedPage() {
  return (
    <div className="adm-login-page">
      <div className="adm-login-card adm-unauthorized-card">
        <h1>Accès refusé</h1>
        <p>
          Vous n&apos;avez pas les droits nécessaires pour accéder à cette
          section.
        </p>
        <Link href="/" className="adm-login-submit adm-unauthorized-link">
          Retour au site
        </Link>
      </div>
    </div>
  );
}
