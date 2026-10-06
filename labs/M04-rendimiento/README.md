# M04 — Rendimiento

[← Página anterior](../M03-apis-y-arquitectura/02-estructura.md) · [Siguiente página →](01-que-mirar.md)

> [!NOTE]
> Guía del módulo. Aquí se aprende qué mirar. Los laboratorios del final de la página siguiente sirven para comprobar una ficha, no para convertir el curso en un curso de rendimiento.

## Qué aprenderás

- Separar el render del commit, y no optimizar antes de ver el coste.
- Reconocer cuándo `memo` no se salta un pintado.
- Saber qué pregunta contestan el Profiler, Performance y Lighthouse.

## De qué va

La bandeja de seis fichas no está lenta. El módulo no existe para acelerarla. Existe para leer una entrega cuando alguien diga que «va mal»: qué componente se volvió a ejecutar, si el tiempo se fue en script o en red, y si un `memo` está puesto sin una medición.

## Páginas

1. [Qué mirar](01-que-mirar.md)

## Demostración guiada

Punto de partida: el filtro responde y marcar cambia una ficha. La página siguiente parte el recorrido en dos momentos. [M04-05](../M04-hooks/M04-05-usememo.md) quita `texto` de las dependencias del filtro y las fichas dejan de moverse. Más tarde, con la lista ya en JSON, `console.count` dentro de `Tarjeta` sube al teclear hasta que `marcar` y el contexto dejan de nacer en cada pintado. El guion está en [Qué mirar](01-que-mirar.md).

→ Sigue en **[Qué mirar](01-que-mirar.md)**.
