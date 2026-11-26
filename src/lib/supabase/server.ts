// server.ts
// Cliente de Supabase para el SERVIDOR.
// Úsalo en Server Components, Server Actions y Route Handlers.
// IMPORTANTE: crea un cliente nuevo en cada petición (no lo guardes en una variable global),
// porque cada petición trae las cookies, y por lo tanto la sesión, de un usuario distinto.

// createServerClient: versión de servidor del cliente de @supabase/ssr.
import { createServerClient } from "@supabase/ssr";

// cookies(): función de Next.js para leer (y, en algunos casos, escribir) las cookies
// de la petición actual. En Next.js 16 es ASÍNCRONA: hay que usar "await cookies()".
import { cookies } from "next/headers";

import { supabasePublishableKey, supabaseUrl } from "./env";

// La función es async porque necesita esperar a cookies().
// Por eso, al usarla, escribiremos: const supabase = await createClient();
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    // Le explicamos a Supabase cómo acceder a las cookies en Next.js.
    cookies: {
      // getAll: Supabase lo llama para leer la sesión del usuario.
      getAll() {
        return cookieStore.getAll();
      },

      // setAll: Supabase lo llama cuando necesita guardar o renovar la sesión
      // (por ejemplo, al iniciar sesión o al refrescar un token que caduca).
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Next.js NO permite escribir cookies desde un Server Component
          // (solo desde Server Actions y Route Handlers), así que aquí puede fallar.
          // Lo ignoramos a propósito: más adelante añadiremos el "proxy" (antes llamado
          // middleware), que se ejecuta antes de cada petición y se encargará de
          // renovar la sesión. Así nunca dependemos de escribir cookies desde aquí.
        }
      },
    },
  });
}
