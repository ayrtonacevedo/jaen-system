import { HelloWorld } from "@/components/hello-world";
import { Suspense } from "react";
import { SupabaseStatus } from "@/components/supabase-status";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      {/* Parte estática: se genera una vez y se sirve al instante. */}
      <HelloWorld name="Citas Fisio" />

      {/* Parte dinámica: depende de las cookies y de Supabase, así que va dentro de
          <Suspense>. Mientras espera se ve el fallback, y luego se reemplaza por el resultado. */}
      <Suspense fallback={<p className="opacity-70">Comprobando conexión…</p>}>
        <SupabaseStatus />
      </Suspense>
    </main>
  );
}
