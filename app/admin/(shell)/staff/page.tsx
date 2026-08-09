import { listStaffMembers, updateStaffRole, inviteStaffMember } from "./actions";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Éditeur" },
];

export default async function StaffPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; inviteError?: string; invited?: string }>;
}) {
  const { error, inviteError, invited } = await searchParams;
  const staff = await listStaffMembers();

  return (
    <>
      <h1 className="adm-page-title">Équipe</h1>

      <section className="aem-section">
        {error ? (
          <div className="aem-form-error">Impossible de mettre à jour le rôle.</div>
        ) : null}

        <table className="aem-table">
          <thead>
            <tr>
              <th>E-mail</th>
              <th>Nom complet</th>
              <th>Rôle</th>
              <th className="aem-col-actions" />
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id}>
                <td>{member.email ?? "—"}</td>
                <td>{member.full_name ?? "—"}</td>
                <td colSpan={2}>
                  <form className="aem-inline-form" action={updateStaffRole}>
                    <input type="hidden" name="id" value={member.id} />
                    <select name="role" defaultValue={member.role}>
                      {ROLE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="aem-btn-secondary">
                      Enregistrer
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {staff.length === 0 ? (
          <p className="adm-empty-state">Aucun membre du personnel pour l&apos;instant.</p>
        ) : null}
      </section>

      <section className="aem-section">
        <h2 className="aem-section-title">Inviter un membre</h2>

        {invited ? (
          <div className="aem-form-success">
            Invitation envoyée — la personne recevra un e-mail pour définir son mot de passe.
          </div>
        ) : null}
        {inviteError ? (
          <div className="aem-form-error">
            Impossible d&apos;envoyer l&apos;invitation. Vérifiez l&apos;adresse e-mail.
          </div>
        ) : null}

        <form className="aem-form aem-form-page" action={inviteStaffMember}>
          <div className="aem-field">
            <label htmlFor="email">Adresse e-mail</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="aem-field">
            <label htmlFor="full_name">Nom complet</label>
            <input id="full_name" name="full_name" type="text" />
          </div>

          <div className="aem-field">
            <label htmlFor="role">Rôle</label>
            <select id="role" name="role" defaultValue="editor">
              {ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="aem-drawer-actions aem-drawer-actions-page">
            <button type="submit" className="aem-btn-primary">
              Envoyer l&apos;invitation
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
