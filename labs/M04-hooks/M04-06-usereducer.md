# M04-06 — useReducer

[← Página anterior](M04-05-usememo.md) · [Siguiente página →](M04-07-hook-propio.md)

> Un paso. Marcar deja de ser un `setItems` suelto y pasa a ser una acción con tipo.

### Objetivo

Sustituir el `useState` de la lista por `useReducer`, sin cambiar lo que hace el botón.

### Prerrequisitos

- [M04-05](M04-05-usememo.md): `marcar` usa `setItems` y `visibles` depende de `items`.

### 1 — La acción y el reductor

**Qué agregamos:** en `App.tsx`, fuera del componente, el tipo y la función. Luego cambia el estado de la lista.

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

Dentro de `App`, sustituye `useState(entregables)` de la lista:

```tsx
const [items, dispatch] = useReducer(reducir, entregables)

function marcar(id: string): void {
  dispatch({ type: "marcar", id })
}
```

Quita `setItems`. El import pasa a incluir `useReducer`.

**Con esto conseguimos:** el cambio de la lista está en un solo `switch`. `Accion` no admite un `type` inventado: `{ type: "borrar" }` no compila.

**Validar:** escribe en el reductor `dispatch({ type: "borrar", id: "E-101" })` dentro de `marcar`, o el objeto suelto. El editor marca `type`. Déjalo en `"marcar"`. Pulsa «Anotar E-103».

→ Esa pastilla pasa a `revisado` y la pestaña baja un pendiente, igual que con `setItems`.

## Comprueba tu entendimiento

**El estado inicial sigue siendo el array**
Recarga la página.
→ Vuelven los pendientes del fichero `datos.ts`. El reductor no pide al servidor.

## Reto

### 1 — Una acción sin id

Añade al tipo `| { type: "vaciar" }` y un `case` que devuelva `[]`. No hace falta un botón si no quieres dejarlo: si lo añades, comprueba que la lista se vacía y luego borra esa acción para seguir con una sola.

<details>
<summary>Ver solución</summary>

```tsx
type Accion = { type: "marcar"; id: string } | { type: "vaciar" }

case "vaciar":
  return []
```

Sin un `default`, TypeScript exige los dos `case` porque el `switch` tiene que devolver `Entregable[]`. Si no vas a vaciar la lista, deja solo `"marcar"`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `setItems` no existe | Quedó una llamada vieja | Toda la lista pasa por `dispatch` |
| El switch no devuelve en algún camino | Falta un `case` o un `return` | Cada acción devuelve un array |
