# J03-04 — useReducer

[← Página anterior](J03-03-memo.md) · [Siguiente página →](J03-05-store.md)

> Laboratorio de [useReducer](README.md).

### Objetivo

Cambiar la lista con una acción `{ type: "marcar", id }` en vez de un `setItems` escrito a mano.

### Código de partida

`App` tiene `const [items, setItems] = useState(entregables)` y `function marcar`. Si la lista ya vive en `useLista`, el reductor va en ese hook, en el mismo sitio donde está `setItems`. El contexto del revisor no se toca.

### 1 — Estado, acción, estado siguiente

**Dónde:** `App.tsx`, o `useLista.ts` si la lista ya está ahí. Encima del componente.

**Qué haces:**

1. Declara la acción y `reducir`.
2. Sustituye `useState` de `items` por `useReducer`.
3. `marcar` solo hace `dispatch`.
4. Pulsa «Anotar E-101» y mira E-103.

```tsx
import { useReducer, useState } from "react"
import type { Entregable } from "./modelo"
```

Si el reductor está en `hooks/useLista.ts`, el import del tipo es `../modelo`.

```tsx
type Accion = { type: "marcar"; id: string }

function reducir(lista: Entregable[], accion: Accion): Entregable[] {
  switch (accion.type) {
    case "marcar":
      return lista.map((item) =>
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

**Experimento:** cambia un momento la acción a `{ type: "marcar", id: "E-101" }` fijo, sin usar el argumento. Pulsa E-103. Restaura `id`.

→ Con el id del argumento, E-101 pasa a `revisado` y E-103 no. Con el id fijo, cualquier clic marca E-101. El `type` que no está en `Accion` no compila. Se deja `"marcar"`.

**Validación:**

- No queda `setItems` de la lista.
- El botón de `Tarjeta` sigue llamando a `alMarcar(item.id)`.
- Problems vacío.

## Comprueba tu entendimiento

**Qué devuelve el reductor**
Un array nuevo, no el mismo con un campo mutado.
→ El `map` copia el objeto de ese id. El resto de elementos se reaprovechan.

## Reto

### 1 — Otra acción

Añade `{ type: "restaurar" }` y un `case` que devuelva `entregables`. Un botón «Restaurar» la dispara. Puedes dejarlo.

<details>
<summary>Ver solución</summary>

```tsx
type Accion = { type: "marcar"; id: string } | { type: "restaurar" }
```

```tsx
case "restaurar":
  return entregables
```

Tras marcar, «Restaurar» devuelve las seis al estado del archivo. `marcar` no se entera del botón: solo despacha su acción.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `setItems` no existe | El resto del archivo aún lo llama | La lista solo cambia con `dispatch` |
| Un clic marca otra ficha | El `dispatch` cierra sobre un id fijo | `dispatch({ type: "marcar", id })` con el argumento |
| El `switch` no cubre el tipo | Falta el `case` o sobra un `return` implícito | Cada `type` de `Accion` tiene su `case` y devuelve la lista |
