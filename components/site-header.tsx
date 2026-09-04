import Link from "next/link";

const links = [
  { href: "/grammar", label: "Gramática" },
  { href: "/vocabulary", label: "Vocabulario" },
  { href: "/games", label: "Juegos" },
  { href: "/progress", label: "Progreso" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link className="brand" href="/" aria-label="Learning English, inicio">
          <span className="brand-mark" aria-hidden="true">LE</span>
          <span>Learning English</span>
        </Link>
        <nav className="main-nav" aria-label="Navegación principal">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
