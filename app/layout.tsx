import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
