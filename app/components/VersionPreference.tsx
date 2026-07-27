"use client";

import { useEffect } from "react";
import type { Version } from "@/app/lib/nav";

/**
 * Remembers which design version the visitor last viewed, so the root
 * route ("/") can send repeat visitors straight back to it. The explicit
 * /v1/... and /v2/... URLs remain the source of truth; this only affects
 * what "/" redirects to.
 */
export function VersionPreference({ version }: { version: Version }) {
  useEffect(() => {
    document.cookie = `clinic-version=${version}; path=/; max-age=31536000`;
    try {
      window.localStorage.setItem("clinic-version", version);
    } catch {
      // localStorage can be unavailable (e.g. private browsing); the cookie
      // above still lets the server-side redirect work.
    }
  }, [version]);

  return null;
}
