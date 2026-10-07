# J04-03 — Estado y referencias

[← Página anterior](J04-02-rerender.md) · [Siguiente página →](J04-04-lazy.md)

`useMemo` fija el resultado de un cálculo. No acelera las seis fichas. Se nota cuando falta `texto` en las dependencias: la caja cambia y las fichas no. Entregar un objeto nuevo en `marcar` es lo que permite el repintado.

## Demostración

### Objetivo

Ver que un `useMemo` sin `texto` miente, y que el array nuevo de `marcar` es el que permite pintar.

### Código de partida

Pega estos dos archivos y recarga `http://localhost:5173`. Hay seis fichas y una caja «Buscar». El botón de una pendiente dice «Anotar» y, al pulsarlo, «Hecho».

`bandeja/src/App.tsx`

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

`bandeja/src/componentes/Tarjeta.tsx`

```tsx
import type { Entregable } from "../modelo"

interface TarjetaProps {
  item: Entregable
  textoBoton?: string
  alMarcar: (id: string) => void
}

export default function Tarjeta({
  item,
  textoBoton = "Anotar",
  alMarcar,
}: TarjetaProps) {
  return (
    <article>
      <p>{item.titulo}</p>
      <p>
        {item.id} · {item.proveedor}
      </p>
      <p className={`estado ${item.estado}`}>{item.estado}</p>
      {item.estado === "pendiente" ? <p>Falta revisión</p> : null}
      <button type="button" onClick={() => alMarcar(item.id)}>
        {item.estado === "revisado" ? "Hecho" : textoBoton} {item.id}
      </button>
    </article>
  )
}
```

### 1 — La dependencia

**Dónde:** el cálculo de `visibles`.

**Qué haces:**

1. Envuélvelo en `useMemo` con `[items, texto]`. Escribe `Norte`.
2. Deja el array en `[items]`. Recarga y escribe.
3. Devuelve `[items, texto]`.

```tsx
const visibles = useMemo(
  () =>
    items.filter((item) => {
      const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
      return blob.includes(texto.toLowerCase())
    }),
  [items, texto],
)
```

**Experimento:** con `[items]`, la caja escribe y las fichas no se filtran. Si el editor avisa, señala que `texto` se usa y no está en el array.

→ Al restituir `texto`, `Norte` vuelve a filtrar. En seis fichas no hay una ganancia que contar. El `useMemo` sirvió para ver la dependencia rota.

**Validación:**

- Las dependencias son `[items, texto]`.
- `marcar` sigue creando un objeto nuevo.
- Problems vacío.

## Comprueba tu entendimiento

**Qué no acelera**
El filtro con `[items, texto]` se ve igual que el `const`.
→ No se celebra el `useMemo` en esta lista. Se sabe por qué estaba la dependencia.

## Reto

### 1 — Mutar otra vez

En `marcar`, devuelve el mismo array mutado. Pulsa una ficha. Restaura el `map`.

<details>
<summary>Ver solución</summary>

La pastilla puede no cambiar: la referencia del array es la misma. El `map` con `{ ...item }` entrega un objeto nuevo y la pastilla cambia.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El filtro no vuelve | El array se quedó en `[items]` | `[items, texto]` |
| `useMemo` no está definido | Falta en el import de `App` | Añádelo junto a `useState` |

## Laboratorio

La demostración memorizó `visibles` y rompió la dependencia `texto`. Aquí memorizas la lista de ids, y la dependencia que miente es `items`.

### Objetivo

Un párrafo con los id visibles que se queda viejo si olvidas `items` al marcar.

### Código de partida

`visibles` es un `const` o un `useMemo` con `[items, texto]`. `marcar` copia el objeto.

### Qué haces

1. Añade este `useMemo` y el párrafo.
2. Pulsa «Anotar E-101». Los id no cambian, el párrafo puede quedar igual: no incluye el estado. Está bien.
3. Quita `visibles` del array y deja `[]`. Escribe `Norte`. El párrafo sigue listando los seis id.
4. Restaura `[visibles]`. `Norte` deja solo los id de ese proveedor. Borra el párrafo si no lo quieres.

```tsx
const ids = useMemo(() => visibles.map((item) => item.id).join(", "), [visibles])
```

```tsx
<p>Ids: {ids}</p>
```

→ Con `[visibles]`, `Norte` cambia el párrafo. Con `[]`, la caja filtra las fichas y los id escritos no se enteran.
