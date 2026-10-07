# J03-05 — useStore

[← Página anterior](J03-04-reducer.md) · [Siguiente página →](J03-06-fetch.md)

> Laboratorio de [useStore](README.md).

### Objetivo

Leer la lista, `marcar` y el revisor con `useStore()`, sin `useReducer` ni `useContext` en `App` ni en `Tarjeta`.

### Código de partida

Hay un reductor `marcar` y un contexto de revisor, de [J03-04](J03-04-reducer.md) y [J03-01](J03-01-contexto.md). Si falta uno, esos laboratorios traen el código. `Tarjeta` todavía puede recibir `alMarcar` por props: este paso se lo quita.

### 1 — La tienda

**Dónde:** archivo nuevo `bandeja/src/tienda.tsx`. `main.tsx`, `App.tsx` y `Tarjeta.tsx`.

**Qué haces:**

1. Crea la tienda con el reductor, el revisor y `useStore`.
2. En `main.tsx`, sustituye `SesionProveedor` por `TiendaProveedor`.
3. `App` pide `items`, `revisor` y `setRevisor` a `useStore()`. Quita de `App` el `useReducer`, el `useState` de la lista y `useSesion`.
4. `Tarjeta` pide `marcar` y `revisor` a `useStore()`. Quita la prop `alMarcar`.
5. Escribe `Luis` y pulsa «Anotar E-101».

```tsx
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react"
import { entregables } from "./datos"
import type { Entregable } from "./modelo"

type Accion = { type: "marcar"; id: string }

function reducir(lista: Entregable[], accion: Accion): Entregable[] {
  switch (accion.type) {
    case "marcar":
      return lista.map((item) =>
        item.id === accion.id ? { ...item, estado: "revisado" } : item,
      )
  }
}

interface Tienda {
  items: Entregable[]
  marcar: (id: string) => void
  revisor: string
  setRevisor: (nombre: string) => void
}

const TiendaContexto = createContext<Tienda | null>(null)

export function TiendaProveedor({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducir, entregables)
  const [revisor, setRevisor] = useState("Ana")
  const marcar = useCallback((id: string) => {
    dispatch({ type: "marcar", id })
  }, [])
  const valor = useMemo(
    () => ({ items, marcar, revisor, setRevisor }),
    [items, marcar, revisor],
  )
  return <TiendaContexto.Provider value={valor}>{children}</TiendaContexto.Provider>
}

export function useStore(): Tienda {
  const tienda = useContext(TiendaContexto)
  if (!tienda) throw new Error("useStore fuera de TiendaProveedor")
  return tienda
}
```

```tsx
const { items, revisor, setRevisor } = useStore()
```

En `Tarjeta`, dentro de la función:

```tsx
const { marcar, revisor } = useStore()
```

El botón llama a `marcar(item.id)`. La etiqueta en `App` queda `<Tarjeta item={item} />`, sin `alMarcar`. Borra `alMarcar` de `TarjetaProps`.

**Experimento:** quita `<TiendaProveedor>` y recarga. Vuelve a ponerlo.

→ `Luis` cambia las seis líneas «Revisor:». E-101 pasa a `revisado` y E-103 no. Sin el proveedor, se lee «useStore fuera de TiendaProveedor». `App.tsx` y `Tarjeta.tsx` no importan `useReducer` ni `useContext`.

**Validación:**

- `useStore` está en `tienda.tsx`.
- Problems vacío.
- El filtro de `App` sigue calculando `visibles` a partir de `items`.
- `Sesion.tsx` puede quedarse sin uso. Si el editor lo marca, bórralo: la tienda ocupa su sitio.

## Comprueba tu entendimiento

**Qué es useStore**
No viene de React. Es el hook de este archivo.
→ Por dentro llama a `useContext`. El `useReducer` vive en el proveedor, una sola vez.

## Reto

### 1 — Leer la tienda en un sitio de más

Llama a `useStore()` también dentro de `reducir`.
→ No se puede: `reducir` no es un componente. Borra esa llamada. El reductor solo recibe la lista y la acción.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `useStore fuera de TiendaProveedor` | El proveedor no envuelve `<App />` | Está en `main.tsx`, dentro de `StrictMode` |
| `alMarcar` no existe | La prop se borró y el botón aún la nombra | El botón llama a `marcar` de `useStore()` |
| Dos listas | `useState(entregables)` sigue en `App` | `items` sale solo de `useStore()` |
