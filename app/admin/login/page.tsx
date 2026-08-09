import Image from "next/image";
import { login } from "@/app/admin/login/actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="adm-login-page">
      <div className="adm-login-card">
        <div className="adm-login-brand">
          <Image
            src="/logo.png"
            alt="Logo Clinique Médicale Saint Viateur"
            width={59}
            height={48}
            style={{ height: 48, width: "auto" }}
            priority
          />
          <div>
            <h1>Backoffice — Saint Viateur</h1>
            <p>Réservé au personnel de la clinique</p>
          </div>
        </div>

        {error ? (
          <div className="adm-login-error" role="alert">
            Identifiants incorrects. Merci de réessayer.
          </div>
        ) : null}

        <form className="adm-login-form" action={login}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />

          <button type="submit" className="adm-login-submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
