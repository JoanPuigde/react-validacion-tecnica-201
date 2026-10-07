# J02-06 — Lógica y presentación

[← Página anterior](J02-05-flujo.md) · [Siguiente página →](../J03-integracion/README.md)

> Laboratorio de [Lógica y presentación](README.md).

### Objetivo

Sacar `items`, `marcar` y el título de la pestaña a `useLista`, y dejar en `App` el filtro y el JSX.

### Código de partida

`App` tiene `texto`, `items`, `visibles`, `marcar` y el efecto de «Pendientes». La lista sale de `datos.ts`, no de `fetch`. Si falta el efecto, añádelo como en [J02-03](J02-03-useeffect.md).

### 1 — El hook de la lista

**Dónde:** archivo nuevo `bandeja/src/hooks/useLista.ts`.

**Qué haces:**

1. Mueve `items`, `marcar`, `pendientes` y el efecto.
2. Devuelve `{ items, marcar }`.
3. `App` llama al hook y se queda el filtro.
4. Recarga.

```tsx
import { useEffect, useState } from "react"
import { entregables } from "../datos"
import type { Entregable } from "../modelo"

export function useLista() {
  const [items, setItems] = useState<Entregable[]>(entregables)

  const pendientes = items.filter((item) => item.estado === "pendiente").length

  useEffect(() => {
    document.title = `Pendientes: ${pendientes}`
  }, [pendientes])

  function marcar(id: string): void {
    setItems((lista) =>
      lista.map((item) =>
        item.id === id ? { ...item, estado: "revisado" } : item,
      ),
    )
  }

  return { items, marcar }
}
```

```tsx
import { useState } from "react"
import Tarjeta from "./componentes/Tarjeta"
import { useLista } from "./hooks/useLista"

export default function App() {
  const [texto, setTexto] = useState("")
  const { items, marcar } = useLista()
```

El `filter` y el `return` de `App` no cambian de sitio.

**Experimento:** deja también `useState(entregables)` en `App` y pinta el del hook. Marca una ficha. Borra el estado duplicado.

→ La ficha cambia porque el `map` usa el hook. El estado de `App` no se entera. Al borrarlo, queda una lista. `Tarjeta` sigue sin `useState`. El hook sigue sin `className`.

**Validación:**

- Al recargar, seis fichas, filtro y «Pendientes: 3».
- `App.tsx` no tiene `useEffect`.
- Problems vacío.

## Comprueba tu entendimiento

**Quién conoce el filtro**
Busca `texto` en `useLista.ts`.
→ No está. El hook no sabe qué hay escrito en la caja.

## Reto

### 1 — className en el hook

Pinta un `className` dentro de `useLista` y mira el aviso. Quítalo.

<details>
<summary>Ver solución</summary>

El hook no devuelve interfaz. `className` vive en `Tarjeta`. El hook devuelve datos y `marcar`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No encuentra `datos` | El import no sube de carpeta | Desde `hooks/` es `../datos` |
| Dos listas | El `useState` sigue en `App` | Solo el del hook |
