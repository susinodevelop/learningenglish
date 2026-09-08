import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "@/app/login/actions";
import { getCurrentUser } from "@/lib/supabase/auth";
import styles from "./page.module.css";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  return (
    <div className="shell page-shell">
      <header className="page-header compact-header">
        <span className="eyebrow">Cuenta · Supabase</span>
        <h1>Tu estudio sincronizado.</h1>
        <p>
          Esta cuenta guarda grupos, progreso e intentos en Supabase para que continúes desde cualquier dispositivo.
        </p>
      </header>

      <section className={styles.card}>
        <div>
          <span className="eyebrow">Sesión activa</span>
          <h2>{user.email}</h2>
          <p>
            El vocabulario B2+C1 permanece versionado en GitHub. La base de datos solo conserva tus datos personales de estudio.
          </p>
        </div>
        <div className={styles.actions}>
          <Link className="button button-primary" href="/games#vocabulary">Ir a estudiar</Link>
          <Link className="button button-secondary" href="/progress">Ver progreso</Link>
          <form action={logout}>
            <button className="button button-secondary" type="submit">Cerrar sesión</button>
          </form>
        </div>
      </section>

      <section className={styles.infoGrid}>
        <article>
          <strong>Grupos</strong>
          <p>Los grupos estáticos y dinámicos se sincronizan con tu cuenta.</p>
        </article>
        <article>
          <strong>Progreso</strong>
          <p>Aciertos, errores, rachas y última práctica se guardan por acepción.</p>
        </article>
        <article>
          <strong>Migración automática</strong>
          <p>Al entrar desde un navegador con datos antiguos, se importan una sola vez sin perder los IDs históricos.</p>
        </article>
      </section>
    </div>
  );
}
