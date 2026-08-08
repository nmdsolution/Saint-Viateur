import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import { SiteMotion } from "@/app/components/SiteMotion";
import { Chatbot } from "@/app/components/Chatbot";

export const metadata: Metadata = {
  title: "Clinique Médicale Saint Viateur",
  description:
    "Clinique Médicale Saint Viateur — Riviera SIDECI, Abidjan, Côte d'Ivoire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <SiteMotion />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
