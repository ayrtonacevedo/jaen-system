# Privacidad y datos

La app trata **datos de salud**, una categoría especial según el RGPD. El club es el
responsable del tratamiento.

## Principios

- **Mínimo acceso:** cada rol ve solo lo que necesita. Se aplica con Row Level Security en
  la base de datos.
- **Datos en la UE:** proyecto de Supabase en una región europea.
- **Sin datos de salud fuera de la app:** WhatsApp solo recibe nombre, día, hora y tipo de
  cita.
- **Sin datos reales** hasta la aprobación de la directiva.

## Quién ve qué

| Dato | Jugador | Entrenador de su rama | Entrenador de la otra rama | Coordinación | Fisios | Admin |
|---|---|---|---|---|---|---|
| Solicitud (lesión, dolor, descripción) | Solo al enviarla | Sí | No | Sí | Sí, los de su agenda | Sí |
| Valoración del fisio | No | Sí | No | Sí | Sí | Sí |
| Turno asignado | Sí (WhatsApp) | Sí | Sí (WhatsApp) | Sí | Sí | Sí |
| Estadísticas agregadas | No | Por definir | Por definir | Por definir | No | Sí |

## Seguridad de cuentas

- Staff solo por invitación del admin, con enlace mágico por email.
- Cuenta de admin con verificación en dos pasos.
- Formulario público protegido con rate limiting y Cloudflare Turnstile.

## Pendiente

- Texto de consentimiento del formulario. Debe indicar que acceden a los datos los
  entrenadores de la rama, coordinación, el equipo de fisioterapia y el admin, y que el
  entrenador ve la valoración del fisio.
- Plazo de conservación de los datos y procedimiento de borrado.
- Copias de seguridad (el plan gratuito de Supabase no las incluye).
