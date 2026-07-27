import "./v2.css";
import { VersionPreference } from "@/app/components/VersionPreference";
import { SiteMotion } from "@/app/components/SiteMotion";
import { Chatbot } from "@/app/components/Chatbot";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VersionPreference version="v2" />
      <SiteMotion />
      {children}
      <Chatbot />
    </>
  );
}
