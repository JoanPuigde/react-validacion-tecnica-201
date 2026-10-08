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
| Con `[]` el párrafo ya nace filtrado | Escribiste `Norte` antes de recargar | Vacía la caja, guarda el `[]`, recarga, y luego escribe `Norte` |
| Con `[visibles]` el párrafo no filtra | El `useMemo` de `ids` sigue en `[]` | El array de `ids` es `[visibles]` |

## Laboratorio

La demostración memorizó `visibles` y rompió la dependencia `texto`. Aquí memorizas la lista de ids. La dependencia que miente es la de ese segundo `useMemo`: si la dejas en `[]`, el párrafo no se entera del filtro.

### Objetivo

Un párrafo `Ids: …` que sigue a las fichas cuando depende de `visibles`, y que se queda en los seis id cuando el array está vacío.

### Código de partida

En `App.tsx`, `visibles` es un `const` o un `useMemo` con `[items, texto]`. Las dos formas sirven para este ejercicio. `marcar` sigue copiando el objeto con `{ ...item, estado: "revisado" }`.

El import de React incluye `useMemo`. Si la demostración ya lo puso, no lo dupliques.

```tsx
import { useMemo, useState } from "react"
```

Vacía la caja «Buscar» y recarga, para partir de las seis fichas.

### 1 — El párrafo con los seis id

Justo debajo de `visibles`, añade este cálculo.

```tsx
const ids = useMemo(
  () => visibles.map((item) => item.id).join(", "),
  [visibles],
)
```

En el `return`, debajo del `input` y antes de la lista:

```tsx
<p>Ids: {ids}</p>
```

Guarda. Encima de las fichas se lee:

`Ids: E-101, E-102, E-103, E-104, E-105, E-106`

### 2 — Marcar no cambia esa frase

Pulsa el botón «Anotar E-101». La pastilla de esa ficha pasa a `revisado` y el botón dice «Hecho E-101».

El párrafo sigue con los mismos seis id. La frase no incluye el estado, solo el id, y E-101 sigue en la lista. Que no cambie es lo esperado.

### 3 — El array vacío se queda viejo

En el `useMemo` de `ids`, deja el array de dependencias vacío.

```tsx
const ids = useMemo(
  () => visibles.map((item) => item.id).join(", "),
  [],
)
```

Guarda. Vacía «Buscar» si tiene algo. Recarga la página con F5, todavía con la caja vacía. El párrafo tiene que nacer con los seis id. Si recargas con `Norte` ya escrito, el memo guarda el filtro y el experimento no se ve.

Escribe `Norte`.

- En la lista quedan dos fichas: «Informe de accesibilidad» (E-101) y «Manual de operación» (E-103).
- El párrafo sigue diciendo `Ids: E-101, E-102, E-103, E-104, E-105, E-106`.

El editor puede avisar de que `visibles` se usa y no está en el array. El aviso describe esta mentira. No lo arregles todavía.

### 4 — Restaurar la dependencia

Vuelve a poner `[visibles]`. Guarda. La caja sigue con `Norte`.

El párrafo pasa a `Ids: E-101, E-103`. Borra la caja: vuelven los seis id, en las fichas y en el párrafo.

Si no quieres dejar el párrafo en la página, borra `<p>Ids: {ids}</p>` y el `useMemo` de `ids`. `visibles` se queda como estaba al empezar este laboratorio.

**Validación:**

- Con `[]`, tras recargar y escribir `Norte`, las fichas son dos y el párrafo lista seis id.
- Con `[visibles]`, `Norte` deja el párrafo en `E-101, E-103`.
- Problems no marca el array `[visibles]`.

→ Con `[visibles]`, `Norte` cambia el párrafo. Con `[]`, la caja filtra las fichas y los id escritos se quedan en la primera lista.
