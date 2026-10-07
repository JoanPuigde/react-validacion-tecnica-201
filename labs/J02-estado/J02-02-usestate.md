# J02-02 — useState

[← Página anterior](J02-01-state.md) · [Siguiente página →](J02-03-useeffect.md)

> Laboratorio de [useState](README.md).

### Objetivo

Tener la caja y el filtro en estado, y la lista visible calculada.

### Código de partida

Si tu `App.tsx` ya filtra, pasa al experimento. Si no, sustituye `bandeja/src/App.tsx` por este archivo. `Tarjeta` es la de [J01-06](../J01-fundamentos/J01-06-props.md).

```tsx
import { useState } from "react"
import { entregables } from "./datos"
import type { Entregable } from "./modelo"
import Tarjeta from "./componentes/Tarjeta"

export default function App() {
  const [texto, setTexto] = useState("")
  const [items, setItems] = useState<Entregable[]>(entregables)

  const visibles = items.filter((item) => {
    const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
    return blob.includes(texto.toLowerCase())
  })

  function marcar(id: string): void {
    setItems((lista) =>
      lista.map((item) =>
        item.id === id ? { ...item, estado: "revisado" } : item,
      ),
    )
  }

  return (
    <main>
      <h1>Bandeja de entregables</h1>
      <label htmlFor="filtro">Buscar</label>
      <input
        id="filtro"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
      />
      {visibles.length === 0 ? <p>Ningún entregable coincide.</p> : null}
      <ul className="lista">
        {visibles.map((item) => (
          <li key={item.id}>
            <Tarjeta item={item} alMarcar={marcar} />
          </li>
        ))}
      </ul>
    </main>
  )
}
```

### 1 — Filtrar sin un segundo estado

**Dónde:** la caja y `datos.ts`.

**Qué haces:**

1. Escribe `Norte`. Cuenta fichas.
2. Borra. Cuentan seis.
3. Escribe `zzzz`.
4. Abre `datos.ts` y cuenta objetos. No lo edites.

**Experimento:** guarda `visibles` en otro `useState(items)` y no lo actualices. Escribe `Norte`. Restaura el `const`.

→ Con el `const`, `Norte` deja las fichas de ese proveedor y `zzzz` muestra «Ningún entregable coincide.». `datos.ts` sigue con seis. Con el segundo estado, la caja cambia y las fichas no.

**Validación:**

- El input tiene `id="filtro"` y `value={texto}`.
- El `map` recorre `visibles`.
- No hay un `useState` para la lista filtrada.

## Comprueba tu entendimiento

**De dónde sale el tipo**
`useState("")` fija `texto` como `string`.
→ `setTexto(1)` lo marca Problems. No dejes ese número.

## Reto

### 1 — Contar sobre la lista filtrada

Muestra `visibles.length` en un párrafo. Escribe `Norte`. Quita el párrafo si no lo quieres dejar.

<details>
<summary>Ver solución</summary>

El número baja y el array de `datos.ts` no. Es un cálculo, no otro estado.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La caja no se puede editar | Falta `onChange` o el `value` es un `let` | `value={texto}` y `setTexto` |
| El filtro no quita fichas | El `map` sigue en `entregables` | `visibles.map` |
