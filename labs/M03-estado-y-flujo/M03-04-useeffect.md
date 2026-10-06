# M03-04 — useEffect

[← Página anterior](M03-03-flujo.md) · [Siguiente página →](M03-05-reglas.md)

> Un paso. Después de pintar, el título de la pestaña copia un número que ya calculaste.

### Objetivo

Mostrar en la pestaña cuántos entregables siguen en `"pendiente"`.

### Prerrequisitos

- [M03-03](M03-03-flujo.md): `marcar` cambia `estado` en `items`.

### 1 — El efecto y su dependencia

**Qué agregamos:** en `App.tsx`, junto a los demás cálculos.

```tsx
import { useEffect, useState } from "react"

const pendientes = items.filter((item) => item.estado === "pendiente").length

useEffect(() => {
  document.title = `Pendientes: ${pendientes}`
}, [pendientes])
```

**Con esto conseguimos:** el título del documento se entera del número después de pintar. El array `[pendientes]` vuelve a lanzar el efecto solo cuando ese número cambia. Filtrar no lo cambia.

**Validar:** la pestaña dice «Pendientes: 3». Escribe `Sur` en «Buscar».

→ La pestaña sigue en 3. Hay dos fichas en pantalla. Marca E-101 (borra el filtro si no la ves).

→ La pestaña pasa a «Pendientes: 2».

> [!TIP]
> Si dejas el array vacío, `[]`, el título se queda en el primer 3 aunque marques. Pruébalo y devuelve `[pendientes]`.

## Comprueba tu entendimiento

**El efecto no calcula la lista**
`visibles` sigue siendo un `const`, no sale de dentro del efecto.
→ El filtro responde al teclear aunque el efecto solo mire `pendientes`.

## Reto

### 1 — La limpieza

Devuelve una función que deje el título en «Bandeja de entregables» y escriba `limpieza` en la consola. Marca otro pendiente.

<details>
<summary>Ver solución</summary>

```tsx
useEffect(() => {
  document.title = `Pendientes: ${pendientes}`
  return () => {
    document.title = "Bandeja de entregables"
    console.log("limpieza")
  }
}, [pendientes])
```

Al marcar, la consola escribe `limpieza` y enseguida el efecto vuelve a poner «Pendientes: N». La limpieza corre antes de repetir el efecto.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `useEffect is not defined` | El import no lo nombra | `import { useEffect, useState } from "react"` |
| El título no baja al marcar | `pendientes` cuenta otra cosa, o el array de dependencias está vacío | Cuenta `item.estado === "pendiente"` y depende de `[pendientes]` |
