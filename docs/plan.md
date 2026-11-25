# Plan de desarrollo

Cada etapa termina con algo funcionando y entendido antes de pasar a la siguiente.

| Etapa | Objetivo | Estado |
|---|---|---|
| 0. Diseño | Problema, roles, flujo, panel, stack y presentación de la idea | Hecho |
| 1. Preparación | Git y GitHub, proyecto Next.js, proyecto de Supabase en la nube (UE), primer despliegue en Vercel | En curso |
| 2. Modelo de datos | Tablas, relaciones, estados y políticas RLS | Pendiente |
| 3. Formulario del jugador | Especificar preguntas y construir el formulario público | Pendiente |
| 4. Login y roles | Enlace mágico, invitaciones, roles y ramas | Pendiente |
| 5. Panel del entrenador | Lista, prioridad sugerida, reordenar y enviar | Pendiente |
| 6. Panel de coordinación | Parrilla, propuesta automática, espera, derivaciones, mensaje de WhatsApp | Pendiente |
| 7. Fisioterapeutas | Agenda, asistencia y valoración | Pendiente |
| 8. Panel de admin | Inicio, configuración, jugadores, estadísticas y archivo | Pendiente |
| 9. Piloto | Uso real con WhatsApp como respaldo (tras la aprobación de la directiva) | Pendiente |

## Adopción

1. Presentación de la idea a la directiva (PDF de diapositivas, sin costes ni tecnología).
2. Tras la aprobación, trabajo con cada área: coordinación, entrenadores y fisios.
3. Piloto de 3–4 semanas con WhatsApp como respaldo.
4. Lanzamiento: mensaje en los grupos y guía corta para el staff.

Costes, mantenimiento y presupuesto se presentarán por separado.

## Pendientes fuera del código

- Aprobación de la directiva.
- Horario y servicios del Fisioterapeuta 2.
- Pesos de la prioridad, con coordinación.
- Texto de consentimiento y plazo de conservación de datos.

## Antes del piloto (paso a datos reales)

- Borrar todos los datos de prueba del proyecto de Supabase.
- Activar copias de seguridad.
- Configurar un SMTP propio para los emails de login (el de Supabase permite muy pocos por hora).
- Decidir si se crea un segundo proyecto para seguir desarrollando sin tocar datos reales.
