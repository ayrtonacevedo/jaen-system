# Producto: cómo funciona Citas Fisio

## El problema

Hoy las citas se coordinan así, una vez por cada rama:

1. El entrenador pide por el grupo de WhatsApp que le escriban por privado quienes
   necesitan fisio.
2. Cada jugador le explica su molestia y su disponibilidad.
3. El entrenador ordena la lista por prioridad (de memoria o en notas) y la pasa a
   coordinación.
4. Coordinación junta las listas de las dos ramas y reparte los turnos a mano.

Problemas: muchos mensajes privados, listas que no existen en ningún sitio, fusión manual
de dos listas sin criterio común, ningún historial y datos de salud circulando por chats
personales.

## Equipo de fisioterapia y capacidad

| Profesional | Días | Horario | Servicios |
|---|---|---|---|
| Fisioterapeuta 1 | Lunes y martes | 19:00–21:00 | Fisioterapia y presoterapia, en paralelo |
| Fisioterapeuta 2 | Miércoles y jueves | Por definir | Por definir |

- Turnos de 15 minutos → Fisioterapeuta 1: 8 turnos por día y servicio, **32 por semana**
  (16 de fisio + 16 de presoterapia).
- Profesionales, días, horarios, duración y servicios **son configurables** por el admin
  (no van fijos en el código). Hay que prever excepciones (festivos, vacaciones).

## Roles

| Rol | Cuenta | Qué hace |
|---|---|---|
| Jugador/a | **No** | Rellena el formulario. Ve su turno en el mensaje del grupo de WhatsApp |
| Entrenador/a (una por rama) | Sí | Revisa, valida, ordena y envía a coordinación las solicitudes de su rama. Ve la valoración del fisio de sus jugadores |
| Coordinación | Sí | Reparte los turnos de las dos ramas. Tiene la última palabra. Deriva al Fisioterapeuta 2. Gestiona cancelaciones |
| Coordinación suplente | Sí | Cubre a coordinación cuando no está |
| Fisioterapeutas | Sí | Ven su agenda con el motivo de cada cita, marcan asistencia y dejan su valoración |
| Admin | Sí | Configura la app y supervisa. **No interviene** en solicitudes ni citas. Acceso completo de lectura, incluidos datos de salud |

Hay un único admin por ahora.

## Ciclo semanal (una sola ronda)

| Fase | Qué pasa | Quién | Cómo termina |
|---|---|---|---|
| Abierta | El formulario acepta solicitudes (desde el domingo tras el partido) | Jugadores | Cierre automático el lunes al mediodía |
| Revisión | Cada entrenador valida y ordena las de su rama | Entrenadores | Botón "Enviar a coordinación". Si no llega a tiempo, coordinación sigue con el orden sugerido |
| Asignación | Coordinación reparte los turnos de lunes y martes | Coordinación | Botón "Publicar" |
| Publicada | Mensaje de WhatsApp generado, agenda del fisio activa, derivaciones al Fisioterapeuta 2 | Coordinación, fisios | Fin de semana |
| Cerrada | Queda en el archivo de semanas | — | — |

Los horarios exactos de apertura, cierre y plazos son configurables.

## Estados de una solicitud

```
RECIBIDA ─► VALIDADA ─┬─► ASIGNADA ─┬─► ATENDIDA
   │      (entrenador) │             ├─► NO SE PRESENTÓ
   │                   │             └─► CANCELADA ─► el turno pasa al siguiente en espera
   │                   ├─► DESCARTADA (motivo obligatorio)
   │                   └─► EN ESPERA ─┬─► ASIGNADA (si se libera un turno)
   │                                  ├─► DERIVADA AL FISIOTERAPEUTA 2 ─► ASIGNADA ─► …
   │                                  └─► SIN CITA (al cerrar la semana)
   └─► TARDÍA ─► EN ESPERA
```

- **Tardías:** las que llegan con el formulario cerrado van directamente a espera, detrás
  de las que llegaron a tiempo.
- **Sin cita al cerrar la semana:** quedan en espera por si se las deriva al
  Fisioterapeuta 2; si no, se cierran como "sin cita".

## Prioridad y reparto

- La app calcula una **prioridad sugerida** a partir de las respuestas del formulario
  (impide jugar, intensidad del dolor, lesión reciente, minutos jugados, etc.). Los pesos
  son configurables y se definirán con coordinación.
- Cada entrenador puede reordenar su lista y añadir una nota para coordinación.
- **Mezcla de ramas:** por gravedad (puntuación), sin importar la rama, respetando el orden
  interno de cada entrenador.
- **Propuesta automática:** rellena la parrilla respetando orden, servicio pedido y
  disponibilidad de cada jugador. Coordinación la ajusta a mano.
- Lo que no entra pasa a **espera**, en orden.

## Derivación al Fisioterapeuta 2

Dos vías:

| Caso | Motivo | Quién decide | Prioridad |
|---|---|---|---|
| Falta de turno | No hubo hueco lunes ni martes | Coordinación, desde la lista de espera | Normal |
| Seguimiento clínico | El Fisioterapeuta 1 indica que siga con el Fisioterapeuta 2 esa semana | El Fisioterapeuta 1, en su valoración | **Por delante** de las derivaciones por falta de turno |

- En ambos casos coordinación asigna la hora en la agenda del Fisioterapeuta 2.
- El Fisioterapeuta 2 **no** deriva al Fisioterapeuta 1. Si el jugador necesita seguir, vuelve
  a rellenar el formulario y se evalúa con los criterios normales.
- El formulario pregunta si el jugador podría ir miércoles o jueves.

## Valoración del fisio (feedback)

Al terminar cada sesión, el fisio completa en la misma ficha de la solicitud:

- Valoración (texto libre)
- Tratamiento realizado
- Estado para jugar: **Apto / Apto con limitaciones / No apto**
- Seguimiento: **No necesita / Próxima semana / Derivar al Fisioterapeuta 2 esta semana**
  (la última opción solo para el Fisioterapeuta 1)
- Recomendaciones

Reglas:

- Lo ven el entrenador de la rama del jugador, coordinación y el admin. El jugador no (se lo
  explica el fisio en persona).
- **No apto** → aviso destacado en el panel del entrenador.
- **Seguimiento próxima semana** → la app crea la solicitud de la semana siguiente con
  prioridad extra, copiando la disponibilidad anterior.
- Si el fisio marca asistencia pero no deja valoración, le queda pendiente en su agenda.

## Avisos

| Destinatario | Canal | Contenido | Datos de salud |
|---|---|---|---|
| Jugadores y entrenadores | Mensaje generado por la app, publicado por coordinación en el grupo de WhatsApp (enlace `wa.me` / Web Share) | Nombre, día, hora, tipo de cita | No |
| Fisioterapeutas | Agenda privada en la app (y PDF imprimible) | Agenda completa con el motivo | Sí |

- Se genera un mensaje por profesional (Fisioterapeuta 1 y Fisioterapeuta 2).
- Los cambios tras publicar (cancelaciones, sustituciones) generan un mensaje corto de
  cambio o la lista actualizada.
- **Cancelaciones:** el jugador avisa por WhatsApp a coordinación; coordinación lo marca y la
  app sugiere el primero de la espera que encaje en ese turno.
- Al enviar el formulario, el jugador ve una confirmación con la fecha en que se publicará
  la lista. No hay consulta posterior por DNI.
- **Duplicados:** se detectan por DNI/NIE y se marcan para coordinación.

## Panel de administrador

Primera versión:

- **Inicio:** fase de la semana, contadores (solicitudes, ocupación, espera, derivados),
  alertas, listas enviadas por cada entrenador, lista final de cada fisio con el reparto por
  rama (% y número), espera y derivados.
- **Configuración y usuarios:** profesionales y horarios, calendario del ciclo, excepciones,
  pesos de prioridad, ramas y divisiones, plantilla del mensaje de WhatsApp, alta de staff y
  asignación de roles (incluida coordinación suplente).
- **Jugadores:** ficha por DNI/NIE con historial de solicitudes, citas, asistencia y
  valoraciones.
- **Estadísticas:** % atendidos, en espera, derivados y no presentados, en total y por rama;
  lesiones más comunes por zona y rama; solicitudes por semana frente a capacidad; reparto
  de turnos por rama y por profesional; derivaciones según su tipo.
- **Archivo de semanas:** de cada semana se guardan las listas completas (las de los
  entrenadores, la final de cada fisio, la espera y los derivados). No se registra quién
  movió qué.

Definición en estadísticas: "atendido" incluye a los derivados al Fisioterapeuta 2.

## Formulario del jugador (pendiente de especificar)

Campos previstos: nombre y apellidos, DNI/NIE, rama y división, tipo de cita (fisio,
presoterapia o cualquiera), **zona del cuerpo elegida de una lista** (necesario para las
estadísticas), descripción, cómo ocurrió, desde cuándo, intensidad del dolor (1–10),
minutos jugados en el último partido, si le impide entrenar o jugar, disponibilidad lunes
y martes por franja, si podría ir miércoles o jueves, y consentimiento de datos.

## Ideas para más adelante

- PWA y notificaciones push.
- Email o WhatsApp automáticos (API de WhatsApp Business).
- Conectar el estado Apto / No apto con las convocatorias de partido.
- Estadísticas por división, jugadores recurrentes y tiempo medio en espera.
