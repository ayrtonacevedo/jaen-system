// env.ts
// Lee y valida las variables de entorno de Supabase.
// Si falta alguna, la app falla al arrancar con un mensaje claro,
// en lugar de dar un error confuso más adelante al intentar conectarse.

// 1. Leemos las variables desde .env.local (o desde la configuración de Vercel en producción).
//    Hay que escribir "process.env.NEXT_PUBLIC_..." completo y literal: Next.js busca ese texto
//    exacto al compilar y lo reemplaza por el valor real, también en el código del navegador.
//    El tipo de cada una es "string | undefined", porque podrían no existir.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// 2. Si falta alguna, cortamos aquí con un error que explica qué revisar.
if (!url || !publishableKey) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. " +
      "Revisa tu archivo .env.local (puedes copiar .env.example como plantilla).",
  );
}

// 3. Exportamos los valores ya validados.
//    Gracias al "if" de arriba, TypeScript sabe que aquí ya no pueden ser undefined,
//    así que su tipo pasa a ser "string" (esto se llama "estrechamiento de tipos" o narrowing).
//    Los reasignamos a nuevas constantes para que el resto del proyecto reciba "string" y no
//    tenga que volver a comprobarlo.
export const supabaseUrl: string = url;
export const supabasePublishableKey: string = publishableKey;
