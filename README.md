# Citas Fisio

Aplicación web para organizar las citas de fisioterapia y presoterapia de un club de rugby.
Sustituye la coordinación por mensajes privados de WhatsApp y listas hechas a mano por un
flujo único: el jugador envía una solicitud, cada entrenador prioriza las de su rama,
coordinación reparte los turnos y el equipo de fisioterapia atiende y deja su valoración.

> Proyecto en desarrollo. Todavía no se usan datos reales de jugadores.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL, autenticación y Row Level Security) — próximamente
- Despliegue en Vercel — próximamente

## Desarrollo local

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Revisa el código con ESLint |

## Estructura

```
src/
├── app/          Rutas y páginas (App Router)
└── components/   Componentes reutilizables
docs/             Producto, privacidad, plan y presentación de la idea
```

## Documentación

- [Producto y funcionamiento](docs/producto.md)
- [Privacidad y datos](docs/privacidad.md)
- [Plan de desarrollo](docs/plan.md)
