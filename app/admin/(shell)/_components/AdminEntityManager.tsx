"use client";

import { useState, useTransition, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  createEntityRow,
  updateEntityRow,
  deleteEntityRow,
  swapSortOrder,
} from "../_actions/entities";

export type EntityFieldType =
  | "text"
  | "textarea"
  | "select"
  | "boolean"
  | "number"
  | "date"
  | "image";

export type EntityFieldOption = { value: string; label: string };

export type EntityField = {
  key: string;
  label: string;
  type: EntityFieldType;
  /** Required for `type: "select"`. */
  options?: EntityFieldOption[];
  placeholder?: string;
  required?: boolean;
  /** Shown in the table columns. Defaults to `true` for every type except `textarea`. */
  showInTable?: boolean;
};

export type EntityConfig = {
  /** Supabase table name — matches `supabase/schema.sql` exactly. */
  table: string;
  /** Singular label used in drawer headings, e.g. "spécialité". */
  entityLabel: string;
  fields: EntityField[];
  /** Column used to name the row in the delete confirmation. Defaults to the first field. */
  titleKey?: string;
};

export type EntityRow = Record<string, unknown> & { id: string; sort_order: number };

function emptyFormValues(fields: EntityField[]): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const field of fields) {
    values[field.key] = field.type === "boolean" ? false : "";
  }
  return values;
}

function rowToFormValues(row: EntityRow, fields: EntityField[]): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const field of fields) {
    const raw = row[field.key];
    values[field.key] = raw ?? (field.type === "boolean" ? false : "");
  }
  return values;
}

export function AdminEntityManager({
  config,
  initialRows,
}: {
  config: EntityConfig;
  initialRows: EntityRow[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [drawer, setDrawer] = useState<{ mode: "create" | "edit"; row: EntityRow | null } | null>(
    null
  );
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [error, setError] = useState<string | null>(null);
  const [imageFieldState, setImageFieldState] = useState<
    Record<string, { uploading: boolean; error: string | null }>
  >({});

  // `initialRows` comes straight from the parent Server Component's fetch;
  // after any mutation we call `router.refresh()` to re-run that fetch and
  // get a fresh array here, so no separate local copy is needed.
  const rows = initialRows;
  const sortedRows = [...rows].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const tableFields = config.fields.filter((field) => field.showInTable ?? field.type !== "textarea");
  const titleKey = config.titleKey ?? config.fields[0]?.key;

  function openCreate() {
    setError(null);
    setFormValues(emptyFormValues(config.fields));
    setDrawer({ mode: "create", row: null });
  }

  function openEdit(row: EntityRow) {
    setError(null);
    setFormValues(rowToFormValues(row, config.fields));
    setDrawer({ mode: "edit", row });
  }

  function closeDrawer() {
    setDrawer(null);
    setError(null);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        if (drawer?.mode === "edit" && drawer.row) {
          await updateEntityRow(config.table, drawer.row.id, formValues);
        } else {
          const maxOrder = rows.reduce((max, row) => Math.max(max, row.sort_order ?? 0), -1);
          await createEntityRow(config.table, { ...formValues, sort_order: maxOrder + 1 });
        }
        closeDrawer();
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      }
    });
  }

  function handleDelete(row: EntityRow) {
    const label = titleKey ? String(row[titleKey] ?? "cet élément") : "cet élément";
    if (!window.confirm(`Supprimer « ${label} » ? Cette action est définitive.`)) return;

    startTransition(async () => {
      try {
        await deleteEntityRow(config.table, row.id);
        router.refresh();
      } catch (err) {
        window.alert(err instanceof Error ? err.message : "Suppression impossible.");
      }
    });
  }

  function handleMove(row: EntityRow, direction: -1 | 1) {
    const index = sortedRows.findIndex((r) => r.id === row.id);
    const neighbor = sortedRows[index + direction];
    if (!neighbor) return;

    startTransition(async () => {
      try {
        await swapSortOrder(
          config.table,
          { id: row.id, sort_order: row.sort_order },
          { id: neighbor.id, sort_order: neighbor.sort_order }
        );
        router.refresh();
      } catch (err) {
        window.alert(err instanceof Error ? err.message : "Réorganisation impossible.");
      }
    });
  }

  function handleImageFileChange(field: EntityField, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setImageFieldState((current) => ({
      ...current,
      [field.key]: { uploading: true, error: null },
    }));

    (async () => {
      try {
        const supabase = createClient();
        const path = `${config.table}/${crypto.randomUUID()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("media").getPublicUrl(path);

        setFormValues((current) => ({ ...current, [field.key]: publicUrl }));
        setImageFieldState((current) => ({
          ...current,
          [field.key]: { uploading: false, error: null },
        }));
      } catch (err) {
        setImageFieldState((current) => ({
          ...current,
          [field.key]: {
            uploading: false,
            error: err instanceof Error ? err.message : "Envoi impossible.",
          },
        }));
      }
    })();
  }

  function renderCellValue(field: EntityField, row: EntityRow) {
    const value = row[field.key];

    if (field.type === "boolean") return value ? "✓" : "—";
    if (field.type === "select") {
      return field.options?.find((option) => option.value === value)?.label ?? String(value ?? "—");
    }
    if (value === null || value === undefined || value === "") return "—";

    const text = String(value);
    return text.length > 60 ? `${text.slice(0, 60)}…` : text;
  }

  function renderFormField(field: EntityField) {
    const value = formValues[field.key];

    if (field.type === "textarea") {
      return (
        <textarea
          id={field.key}
          rows={4}
          required={field.required}
          value={(value as string) ?? ""}
          onChange={(event) =>
            setFormValues((current) => ({ ...current, [field.key]: event.target.value }))
          }
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          id={field.key}
          required={field.required}
          value={(value as string) ?? ""}
          onChange={(event) =>
            setFormValues((current) => ({ ...current, [field.key]: event.target.value }))
          }
        >
          <option value="" disabled>
            Sélectionner…
          </option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "boolean") {
      return (
        <span className="aem-switch">
          <input
            id={field.key}
            type="checkbox"
            checked={!!value}
            onChange={(event) =>
              setFormValues((current) => ({ ...current, [field.key]: event.target.checked }))
            }
          />
          <span className="aem-switch-track" />
        </span>
      );
    }

    if (field.type === "image") {
      const uploadState = imageFieldState[field.key];
      const currentUrl = typeof value === "string" ? value : "";
      return (
        <div className="aem-image-field">
          {currentUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentUrl} alt="" className="aem-image-preview" />
          ) : null}
          <input
            id={field.key}
            type="file"
            accept="image/*"
            disabled={uploadState?.uploading}
            onChange={(event) => handleImageFileChange(field, event)}
          />
          {uploadState?.uploading ? (
            <span className="aem-image-status">Envoi en cours…</span>
          ) : null}
          {uploadState?.error ? (
            <span className="aem-image-error">{uploadState.error}</span>
          ) : null}
        </div>
      );
    }

    return (
      <input
        id={field.key}
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        required={field.required}
        placeholder={field.placeholder}
        value={(value as string | number | undefined) ?? ""}
        onChange={(event) =>
          setFormValues((current) => ({
            ...current,
            [field.key]:
              field.type === "number"
                ? Number.isNaN(event.target.valueAsNumber)
                  ? ""
                  : event.target.valueAsNumber
                : event.target.value,
          }))
        }
      />
    );
  }

  return (
    <div className="aem-manager">
      <div className="aem-toolbar">
        <button type="button" className="aem-btn-primary" onClick={openCreate}>
          + Ajouter
        </button>
      </div>

      <table className="aem-table">
        <thead>
          <tr>
            {tableFields.map((field) => (
              <th key={field.key}>{field.label}</th>
            ))}
            <th className="aem-col-order">Ordre</th>
            <th className="aem-col-actions" />
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <tr key={row.id} className="aem-row" onClick={() => openEdit(row)}>
              {tableFields.map((field) => (
                <td key={field.key}>{renderCellValue(field, row)}</td>
              ))}
              <td className="aem-col-order" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  className="aem-order-btn"
                  disabled={isPending || index === 0}
                  onClick={() => handleMove(row, -1)}
                  aria-label="Monter"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="aem-order-btn"
                  disabled={isPending || index === sortedRows.length - 1}
                  onClick={() => handleMove(row, 1)}
                  aria-label="Descendre"
                >
                  ↓
                </button>
              </td>
              <td className="aem-col-actions" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  className="aem-btn-danger"
                  disabled={isPending}
                  onClick={() => handleDelete(row)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedRows.length === 0 ? (
        <p className="adm-empty-state">Aucun élément pour l&apos;instant.</p>
      ) : null}

      {drawer ? (
        <div className="aem-drawer-overlay" onClick={closeDrawer}>
          <div className="aem-drawer" onClick={(event) => event.stopPropagation()}>
            <h3>
              {drawer.mode === "create"
                ? `Ajouter — ${config.entityLabel}`
                : `Modifier — ${config.entityLabel}`}
            </h3>

            {error ? <div className="aem-form-error">{error}</div> : null}

            <form className="aem-form" onSubmit={handleSubmit}>
              {config.fields.map((field) => (
                <div className="aem-field" key={field.key}>
                  <label htmlFor={field.key}>{field.label}</label>
                  {renderFormField(field)}
                </div>
              ))}

              <div className="aem-drawer-actions">
                <button type="button" className="aem-btn-secondary" onClick={closeDrawer}>
                  Annuler
                </button>
                <button type="submit" className="aem-btn-primary" disabled={isPending}>
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
