import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CălărașiOrice.ro",
  description: "Director local mobil-first pentru afaceri din Călărași"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
