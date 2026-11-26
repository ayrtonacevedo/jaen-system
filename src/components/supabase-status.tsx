// supabase-status.tsx
//Componente TEMPORAL para comprobar la conexion con Supabase.

//Es un Server Component(se ejecuta en el servidor)
import { createClient } from "@/lib/supabase/server";

//Es async porque espera a Supabase. Solo los Server Components pueden usar async
export async function SupabaseStatus() {
  // Creamos el cliente de servidor(lee las coockies de esta peticion)
  const supabase = await createClient();

  // Consultamos una tabla que no existe a proposito.
  // supabase-js no lanza excepciones: devuelve {data,error}
  const { error } = await supabase
    .from("connection_check")
    .select("*")
    .limit(1);

  // PGRST205 = "no encuentro esa tabla" → Supabase respondió y aceptó la clave.
  const connected = !error || error.code === "PGRST205";
  return (
    <p className={connected ? "text-green-600" : "text-red-600"}>
      {connected
        ? "Conectado a Supabase"
        : `Error al conectar con Supabase: ${error?.message}`}
    </p>
  );
}
