// client.ts
// Cliente de Supabase para el NAVEGADOR.
// Úsalo en Client Components (los archivos que empiezan con "use client").
// Para Server Components y Server Actions usaremos server.ts (el próximo paso).

// createBrowserClient viene de @supabase/ssr: además de crear el cliente,
// guarda la sesión del usuario en cookies (y no solo en el navegador), para que
// el servidor de Next.js también pueda saber quién ha iniciado sesión.
import { createBrowserClient } from "@supabase/ssr";

// Importamos los valores ya validados en env.ts.
// Usamos una ruta relativa ("./env") porque está en la misma carpeta.
import { supabasePublishableKey, supabaseUrl } from "./env";

// Exportamos una función, no un cliente ya creado.
// Así cada parte de la app pide su cliente cuando lo necesita.
// (En el navegador, @supabase/ssr reutiliza internamente la misma instancia,
// así que llamarla varias veces no crea conexiones de más.)
export function createClient() {
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}
