# J03-01 — useContext

[← Página anterior](README.md) · [Siguiente página →](J03-02-hoc.md)

El contexto entrega un valor a los componentes de dentro sin pasarlo por cada prop. Quien provee decide el valor. Quien llama a `useContext` lo lee. Si no hay proveedor, el valor es `null` y el hook propio avisa.

### Objetivo

Llevar el nombre de quien revisa a las fichas sin añadirlo a las props.

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

`TarjetaProps` no tiene `revisor`. El párrafo «Revisor:» todavía no está.

### 1 — El proveedor y la lectura

**Dónde:** archivo nuevo `bandeja/src/contexto/Sesion.tsx`, `main.tsx` y `Tarjeta.tsx`.

**Qué haces:**

1. Crea el contexto y el hook.
2. Envuelve `<App />` en `main.tsx`.
3. En `Tarjeta`, lee `revisor` y pinta un párrafo. No toques `TarjetaProps`.
4. En `App`, una caja cambia el nombre.
5. Escribe `Luis`.

```tsx
import { createContext, useContext, useState, type ReactNode } from "react"

interface Sesion {
  revisor: string
  setRevisor: (nombre: string) => void
}

const SesionContexto = createContext<Sesion | null>(null)

export function SesionProveedor({ children }: { children: ReactNode }) {
  const [revisor, setRevisor] = useState("Ana")
  return (
    <SesionContexto.Provider value={{ revisor, setRevisor }}>
      {children}
    </SesionContexto.Provider>
  )
}

export function useSesion(): Sesion {
  const sesion = useContext(SesionContexto)
  if (!sesion) throw new Error("useSesion fuera del proveedor")
  return sesion
}
```

```tsx
import { SesionProveedor } from "./contexto/Sesion"
```

En `main.tsx`, `<SesionProveedor>` envuelve a `<App />` y queda dentro de `<StrictMode>`.

```tsx
const { revisor } = useSesion()
```

```tsx
<p>Revisor: {revisor}</p>
```

En `App`, encima de «Buscar»:

```tsx
const { revisor, setRevisor } = useSesion()
```

```tsx
<label htmlFor="revisor">Revisor</label>
<input
  id="revisor"
  value={revisor}
  onChange={(evento) => setRevisor(evento.target.value)}
/>
```

**Experimento:** quita `<SesionProveedor>` en `main.tsx`. Recarga. Vuelve a ponerlo.

→ Con el proveedor, las seis fichas dicen «Revisor: Ana». `Luis` las cambia todas. `TarjetaProps` no tiene `revisor`. Sin el proveedor, la página lanza «useSesion fuera del proveedor».

**Validación:**

- No hay `revisor={revisor}` en `<Tarjeta>`.
- Problems vacío con el proveedor puesto.
- El filtro sigue respondiendo.

## Comprueba tu entendimiento

**Quién provee**
El `useState` de `revisor` está en `SesionProveedor`, no en `Tarjeta`.
→ La ficha solo lee. La caja de `App` pide el siguiente nombre.

## Reto

### 1 — Un campo de más en el contexto

Añade `turno: number` a la interfaz y no lo pongas en el valor. Lee Problems. Quítalo.

<details>
<summary>Ver solución</summary>

El objeto del `value` no cumple `Sesion`. O añades `turno: 1` en los dos sitios, o dejas la interfaz solo con `revisor` y `setRevisor`. Para seguir, se queda sin `turno`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `useSesion fuera del proveedor` | `App` quedó fuera de `SesionProveedor` | El proveedor envuelve `<App />` en `main.tsx` |
| El editor pide `revisor` en `<Tarjeta>` | Lo metiste en `TarjetaProps` | Quítalo de la interfaz. Se lee con `useSesion` |
| Solo cambia una ficha | Escribiste el nombre a mano en una ficha | El párrafo es `{revisor}` del contexto |
