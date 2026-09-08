import Link from "next/link";
import { redirect } from "next/navigation";
import { login, resendConfirmation, signup } from "./actions";
import { getCurrentUser } from "@/lib/supabase/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import styles from "./page.module.css";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = first(params.next) ?? "/games#vocabulary";
  const error = first(params.error);
  const message = first(params.message);
  const configured = isSupabaseConfigured();
  const user = await getCurrentUser();

  if (user) redirect(next.startsWith("/") ? next : "/account");

  return (
    <div className="shell page-shell">
      <section className={styles.layout}>
        <div className={styles.copy}>
          <span className="eyebrow">Cuenta · Supabase</span>
          <h1>Tu progreso, en todos tus dispositivos.</h1>
          <p>
            La cuenta sincroniza grupos de estudio, errores, aciertos y progreso. El vocabulario B2+C1
            sigue viviendo en el léxico canónico de la web; Supabase guarda únicamente tus datos personales de estudio.
          </p>
          <Link className="text-link" href="/vocabulary">Volver a vocabulario →</Link>
        </div>

        <div className={styles.card}>
          <span className="eyebrow">Entrar o crear cuenta</span>
          <h2>Email + contraseña</h2>

          {!configured ? (
            <div className={styles.noticeError}>
              Este despliegue no tiene las variables de Supabase disponibles todavía.
            </div>
          ) : null}
          {error ? <div className={styles.noticeError}>{error}</div> : null}
          {message ? <div className={styles.notice}>{message}</div> : null}

          <form className={styles.form}>
            <input type="hidden" name="next" value={next} />
            <label>
              <span>Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="tu@email.com" />
            </label>
            <label>
              <span>Contraseña</span>
              <input
                name="password"
                type="password"
                minLength={8}
                required
                autoComplete="current-password"
                placeholder="Mínimo 8 caracteres"
              />
            </label>
            <div className={styles.actions}>
              <button className="button button-primary" formAction={login} disabled={!configured}>
                Iniciar sesión
              </button>
              <button className="button button-secondary" formAction={signup} disabled={!configured}>
                Crear cuenta
              </button>
            </div>
            <button
              className="text-link"
              formAction={resendConfirmation}
              formNoValidate
              disabled={!configured}
              type="submit"
            >
              Reenviar email de confirmación
            </button>
          </form>

          <p className={styles.help}>
            Si Supabase exige confirmación de email, recibirás un enlace antes del primer inicio de sesión.
            Usa siempre el enlace más reciente. Después, la web importará una sola vez los grupos y el progreso que ya tengas en este navegador.
          </p>
        </div>
      </section>
    </div>
  );
}
