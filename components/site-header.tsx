import Link from "next/link";
import { logout } from "@/app/login/actions";
import { getCurrentUser } from "@/lib/supabase/auth";
import styles from "./site-header.module.css";

const links = [
  { href: "/grammar", label: "Gramática" },
  { href: "/vocabulary", label: "Vocabulario" },
  { href: "/games", label: "Ejercicios" },
  { href: "/progress", label: "Progreso" },
];

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand" href="/" aria-label="Learning English, inicio">
          <span className="brand-mark" aria-hidden="true">LE</span>
          <span>Learning English</span>
        </Link>

        <div className={styles.rightSide}>
          <nav className="main-nav" aria-label="Navegación principal">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </nav>

          <div className={styles.account}>
            {user ? (
              <>
                <Link className={styles.accountLink} href="/account" title={user.email ?? "Mi cuenta"}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  <span>{user.email?.split("@")[0] ?? "Cuenta"}</span>
                </Link>
                <form action={logout}>
                  <button type="submit">Salir</button>
                </form>
              </>
            ) : (
              <Link className={styles.accountLink} href="/login">
                <span className={styles.statusDotMuted} aria-hidden="true" />
                <span>Cuenta</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
