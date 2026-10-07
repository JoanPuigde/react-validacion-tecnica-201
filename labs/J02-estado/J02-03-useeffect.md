# J02-03 — useEffect

[← Página anterior](J02-02-usestate.md) · [Siguiente página →](J02-04-ciclo.md)

> Laboratorio de [useEffect](README.md).

### Objetivo

Llevar el número de pendientes al título de la pestaña, y ver qué pasa si las dependencias mienten.

### Código de partida

`App.tsx` es el de [J02-02](J02-02-usestate.md): caja, `items`, `visibles`, `marcar`. No tiene `useEffect`. Si el tuyo no coincide, pega ese archivo. La pestaña dice «Bandeja de entregables».

### 1 — El título de la pestaña

**Dónde:** `App.tsx`, después de `visibles`. El import pasa a `import { useEffect, useState } from "react"`.

**Qué haces:**

1. Calcula `pendientes` desde `items`.
2. Añade el efecto con `[pendientes]`.
3. Mira la pestaña del navegador, no el `<h1>`.

```tsx
const pendientes = items.filter((item) => item.estado === "pendiente").length

useEffect(() => {
  document.title = `Pendientes: ${pendientes}`
}, [pendientes])
```

**Experimento:**

1. Escribe `Sur`. Lee la pestaña y cuenta fichas.
2. Borra el filtro. Marca E-101. Lee la pestaña.
3. Cambia el array a `[]`. Recarga. Marca una ficha. Lee la pestaña.
4. Devuelve `[pendientes]`.

→ Con `Sur`, la pestaña sigue en «Pendientes: 3». Al marcar, baja a 2. Con `[]`, se queda en 3. Con `[pendientes]`, acompaña a la pastilla.

**Validación:**

- Al recargar, la pestaña dice «Pendientes: 3».
- `pendientes` no sale de `visibles`.
- Problems vacío.

## Comprueba tu entendimiento

**El efecto no filtra**
`visibles` sigue fuera del efecto.
→ Teclear sigue filtrando aunque el efecto solo escriba el título.

## Reto

### 1 — Sin array

Quita el segundo argumento del `useEffect`. Teclea. Devuelve `[pendientes]`.

<details>
<summary>Ver solución</summary>

El efecto corre en cada letra. El título no cambia porque el número no cambió, pero el contrato ha desaparecido. Se deja `[pendientes]`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `useEffect is not defined` | El import no lo nombra | `import { useEffect, useState } from "react"` |
| El título no baja | Dependencias `[]` | `[pendientes]` |
| Miras el h1 | El número está en la pestaña | Lee la pestaña del navegador |
