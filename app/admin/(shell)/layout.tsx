import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/admin/login/actions";
import { AdminSidebar } from "./_components/AdminSidebar";

function initialsFor(fullName: string | null, email: string | null) {
  const source = fullName?.trim() || email?.trim() || "";
  if (!source) return "?";

  if (fullName?.trim()) {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    const initials = parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
    if (initials) return initials;
  }

  return source[0]?.toUpperCase() ?? "?";
}

const ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  editor: "Éditeur",
};

export default async function AdminShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let fullName: string | null = null;
  let role: string | null = null;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .maybeSingle();

    fullName = profile?.full_name ?? null;
    role = profile?.role ?? null;
  }

  return (
    <div className="adm-shell">
      <AdminSidebar />

      <div className="adm-main">
        <header className="adm-topbar">
          <div className="adm-topbar-spacer" />

          {user ? (
            <div className="adm-user">
              <span className="adm-avatar">
                {initialsFor(fullName, user.email ?? null)}
              </span>
              <div className="adm-user-info">
                <strong>{fullName || user.email}</strong>
                {role ? (
                  <span
                    className={
                      role === "admin"
                        ? "adm-role-pill adm-role-pill-admin"
                        : "adm-role-pill adm-role-pill-editor"
                    }
                  >
                    {ROLE_LABELS[role] ?? role}
                  </span>
                ) : null}
              </div>
              <form action={logout}>
                <button type="submit" className="adm-logout-btn">
                  Déconnexion
                </button>
              </form>
            </div>
          ) : null}
        </header>

        <main className="adm-content">{children}</main>
      </div>
    </div>
  );
}