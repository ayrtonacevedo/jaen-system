# Citas Fisio (JaenSystem)

Aplicación web para organizar las citas de fisioterapia y presoterapia de un club de rugby
(rama masculina y femenina). Sustituye el sistema actual de mensajes privados por WhatsApp
y listas hechas a mano.

- Nombre provisional: **Citas Fisio**
- Estado: diseño cerrado; empezando el desarrollo (etapa 1)
- Detalle del producto, flujo y decisiones: [`docs/`](docs/)
- Código en `src/` (`src/app` para las rutas). El alias `@/*` apunta a `src/*`.

Instrucciones de Next.js para asistentes (versión 16, con cambios recientes):

@AGENTS.md

## Cómo trabajamos

- **El objetivo es aprender construyéndolo.** El desarrollador quiere entender cada pieza y
  escribir buena parte del código. Claude guía, explica el porqué, propone y revisa; no
  genera grandes bloques de código sin explicarlos ni avanza sin acordar el paso.
- Avanzar en etapas pequeñas, cada una funcionando y entendida antes de la siguiente.
- Perfil del desarrollador: avanzado; conoce HTML/CSS/JS, React/Next.js y SQL.
- Idioma: español para la conversación, la documentación y los textos de la interfaz.
  Código (nombres de variables, funciones, tablas) en inglés.
- Antes de cambiar una decisión de `docs/`, comentarlo y actualizar el documento.

## Stack

| Capa | Tecnología |
|---|---|
| App | Next.js (App Router, Server Components, Server Actions) + TypeScript estricto |
| UI | Tailwind CSS + shadcn/ui; web responsive (PWA más adelante) |
| Datos | Supabase (PostgreSQL, región UE) con `supabase-js` y tipos generados |
| Seguridad | Row Level Security por rol y rama |
| Login del staff | Enlace mágico por email, solo por invitación; 2FA para el admin |
| Formulario público | Validación con Zod, rate limiting y Cloudflare Turnstile |
| Formularios | react-hook-form + Zod (esquemas compartidos cliente/servidor) |
| Tareas programadas | pg_cron en Supabase |
| Migraciones | Supabase CLI, SQL versionado en `supabase/migrations` |
| Tests | Vitest (lógica, reparto, RLS) + Playwright (flujos clave) |
| Alojamiento | Vercel (subdominio `.vercel.app`) |
| Calidad | ESLint, Prettier, GitHub Actions |

Entornos: **un único proyecto de Supabase en la nube (región UE), que es el de producción.**
No se usa Docker ni Supabase local. Next.js corre en local y en Vercel contra ese proyecto.

Salvaguardas:

- Los cambios de esquema se hacen siempre como **migraciones versionadas** (`supabase migration new`,
  `supabase db push`), nunca editando tablas a mano en el panel.
- Mientras no haya datos reales, la base de datos puede resetearse con los datos de prueba.
- **Antes del piloto** con datos reales: borrar los datos de prueba, activar copias de seguridad y
  replantear si conviene un segundo proyecto para desarrollo.

## Reglas importantes

- **Datos de salud (RGPD, categoría especial).** Cada rol ve solo lo que necesita; el
  control de acceso se aplica en la base de datos con RLS, nunca solo en la interfaz.
- **No usar datos reales de jugadores** hasta que la directiva del club apruebe el proyecto.
  En desarrollo, solo datos de prueba.
- Nunca enviar datos de salud por WhatsApp: el mensaje al grupo lleva solo nombre, día,
  hora y tipo de cita.
- Nombres en la interfaz y en la documentación: usar roles ("Fisioterapeuta 1",
  "coordinación", "entrenador/a de la rama"), no nombres propios del staff.
