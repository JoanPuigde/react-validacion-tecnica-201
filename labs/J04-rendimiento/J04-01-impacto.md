# J04-01 — Qué impacta

[← Página anterior](README.md) · [Siguiente página →](J04-02-rerender.md)

> Laboratorio de [Qué impacta](README.md).

### Objetivo

Contar cuántas veces se ejecuta `Tarjeta` al teclear, antes de optimizar.

### Código de partida

Hace falta la caja «Buscar» y `Tarjeta` en un `map`. Si no están, pega el `App.tsx` de [J02-02](../J02-estado/J02-02-usestate.md). El `fetch` puede estar o no.

### 1 — El contador

**Dónde:** `Tarjeta.tsx`, primera línea de la función.

**Qué haces:**

1. Añade `console.count(item.id)`.
2. Recarga, abre la consola y límpiala.
3. Escribe una letra. Borra la letra.
4. Marca una ficha pendiente y mira si otras fichas también cuentan.

```tsx
console.count(item.id)
```

**Experimento:** anota el id que más crece.

→ Una letra vuelve a ejecutar las fichas que siguen en pantalla. El padre se ha ejecutado y ha vuelto a pintar la lista. No has envuelto nada en `memo`.

**Validación:**

- La consola muestra `E-101: N` al teclear.
- La página se ve igual.
- El contador se queda para el laboratorio siguiente.

## Comprueba tu entendimiento

**Qué no dice el número**
`console.count` no es un tiempo.
→ Dice cuántas veces se llamó a la función. No dice si la página va lenta.

## Reto

### 1 — La ficha que el filtro quita

Escribe `Norte` y compara el contador de una ficha visible con el de una que desaparece.
→ La que desaparece deja de contar hasta que vuelve.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No cuenta | El `count` está fuera de la función | Primera línea del cuerpo de `Tarjeta` |
| No hay caja | `App` no filtra | Pega el archivo de J02-02 |
