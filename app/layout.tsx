import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Learning English | Aprende y practica inglés",
    template: "%s | Learning English",
  },
  description: "Repositorio educativo de inglés con gramática, vocabulario, juegos y práctica por niveles.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <p><strong>Learning English</strong> · Aprende entendiendo, practica haciendo.</p>
            <p>Material educativo en evolución.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
