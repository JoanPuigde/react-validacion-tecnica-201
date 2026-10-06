# M04-06 — useReducer

[← Página anterior](M04-05-usememo.md) · [Siguiente página →](M04-07-hook-propio.md)

> Práctica de [Estructura](../M03-apis-y-arquitectura/02-estructura.md).

### Objetivo

Sustituir el `useState` de la lista por `useReducer`, sin cambiar lo que hace el botón.

### Prerrequisitos

- [M04-05](M04-05-usememo.md): `marcar` usa `setItems`. `visibles` depende de `[items, texto]`.

### En qué consiste

Un tipo de acción y un `switch`. El experimento manda un `type` que no existe y luego marca una ficha de verdad.

### 1 — La acción y el reductor

**Dónde:** `App.tsx`. El tipo y `reducir` van fuera del componente. El hook va donde estaba el `useState` de la lista.

**Qué haces:**

1. Declara `Accion` y `reducir`.
2. Sustituye `useState(entregables)` de la lista por `useReducer`.
3. `marcar` hace `dispatch`. Borra `setItems`.
4. Añade `useReducer` al import.
5. Guarda.

```tsx
import type { Entregable } from "./modelo"

type Accion = { type: "marcar"; id: string }

function reducir(estado: Entregable[], accion: Accion): Entregable[] {
  switch (accion.type) {
    case "marcar":
      return estado.map((item) =>
        item.id === accion.id ? { ...item, estado: "revisado" } : item,
      )
  }
}
```

```tsx
const [items, dispatch] = useReducer(reducir, entregables)

function marcar(id: string): void {
  dispatch({ type: "marcar", id })
}
```

**Experimento:** dentro de `marcar`, cambia el objeto a `{ type: "borrar", id }`. Guarda.

→ Problems marca `type`: `"borrar"` no está en `Accion`. No lo tapes con `any`. Déjalo en `"marcar"`.

Segundo experimento: recarga, pulsa «Anotar E-103» y lee la pastilla y la pestaña.

→ La pastilla de E-103 pasa a `revisado`. La pestaña baja de 3 a 2. E-101 sigue pendiente. Es el mismo resultado que con `setItems`.

**Validación:**

- En `App.tsx` no queda `setItems`.
- Problems vacío.
- Un clic cambia solo esa ficha.
- Al recargar, vuelven los pendientes de `datos.ts`.

## Comprueba tu entendimiento

**El filtro no se entera del nombre de la acción**
`visibles` sigue dependiendo de `items`.
→ Escribe `Norte` y marca una ficha de las visibles. La pastilla cambia porque `items` es un array nuevo, no porque el `useMemo` conozca `"marcar"`.

## Reto

### 1 — Una acción sin id

Añade `| { type: "vaciar" }` y un `case` que devuelva `[]`. Si añades un botón, comprueba que la lista se vacía y luego borra esa acción.

<details>
<summary>Ver solución</summary>

```tsx
type Accion = { type: "marcar"; id: string } | { type: "vaciar" }

case "vaciar":
  return []
```

Sin un `default`, TypeScript exige los dos `case` si la función tiene que devolver `Entregable[]`. Para seguir, deja solo `"marcar"`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `setItems` no existe | Quedó una llamada vieja | Toda la lista pasa por `dispatch` |
| El switch no cubre un camino | Falta un `return` en el `case` | `"marcar"` devuelve el `map` |
| Todas pasan a revisado | El `map` no compara `accion.id` | Solo el id de la acción cambia |
