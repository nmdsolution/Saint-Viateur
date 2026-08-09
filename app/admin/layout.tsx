import "./admin.css";

/**
 * Root layout for everything under `/admin`. Deliberately renders no
 * chrome of its own — it only exists to load `admin.css` exactly once for
 * the whole admin surface. The actual sidebar + topbar shell lives in the
 * nested `(shell)` route group's layout, so that `/admin/login` and
 * `/admin/unauthorized` (siblings outside that group) render as bare pages
 * without the authenticated-shell chrome around them.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}