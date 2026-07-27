import "./v1.css";
import { VersionPreference } from "@/app/components/VersionPreference";

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VersionPreference version="v1" />
      {children}
    </>
  );
}
