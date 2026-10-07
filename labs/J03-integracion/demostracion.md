# Demostración — Jornada 3

[← Página anterior](README.md)

Esta página se sigue en clase, de arriba abajo. Cada paso dice el archivo, el código y lo que tiene que verse antes de pasar al siguiente. Si el archivo se desvía, pega el bloque entero del paso y sigue.

Terminal en `bandeja/`. `npm run dev`. Navegador en `http://localhost:5173`. La pestaña se llama «Bandeja de entregables».

## 0. Punto de partida

`bandeja/src/App.tsx` filtra y marca. `Tarjeta` recibe `item` y `alMarcar`. No hay contexto, ni `fetch`, ni `useReducer`.

Si tu `App.tsx` no es ese, sustitúyelo por este:

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

Escribe `Norte`. Quedan las fichas de ese proveedor. Borra. Vuelven seis. Pulsa «Anotar E-101»: el botón pasa a «Hecho E-101».

<a id="usecontext"></a>

## 1. useContext

El nombre de quien revisa llega a las fichas sin prop nueva.

1. Crea `bandeja/src/contexto/Sesion.tsx` y pega el archivo entero.

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

2. Abre `bandeja/src/main.tsx`. Añade el import y envuelve `<App />`.

```tsx
import { SesionProveedor } from "./contexto/Sesion"
```

```tsx
<StrictMode>
  <SesionProveedor>
    <App />
  </SesionProveedor>
</StrictMode>
```

3. Abre `Tarjeta.tsx`. Añade el import, lee el nombre dentro de la función y pinta un párrafo debajo del título. No toques `TarjetaProps`.

```tsx
import { useSesion } from "../contexto/Sesion"
```

```tsx
const { revisor } = useSesion()
```

```tsx
<p>Revisor: {revisor}</p>
```

4. Abre `App.tsx`. Importa el hook y pon la caja encima de «Buscar».

```tsx
import { useSesion } from "./contexto/Sesion"
```

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

Ves seis veces «Revisor: Ana». Escribe `Luis`. Las seis cambian. En `<Tarjeta>` no hay `revisor=`.

5. Quita `<SesionProveedor>` en `main.tsx` y deja `<App />` solo. Recarga. La página lanza «useSesion fuera del proveedor». Vuelve a envolver `<App />`.

<a id="hoc"></a>

## 2. HOC

`conRevisor` es una función: recibe `Tarjeta` y devuelve otro componente. Ese otro lee el contexto y pasa `revisor` como prop. `App` sigue sin escribirla.

1. Crea `bandeja/src/hoc/conRevisor.tsx` con este contenido.

```tsx
import type { ComponentType } from "react"
import { useSesion } from "../contexto/Sesion"

export function conRevisor<P extends { revisor: string }>(
  Componente: ComponentType<P>,
) {
  function Envuelto(props: Omit<P, "revisor">) {
    const { revisor } = useSesion()
    const completas = { ...props, revisor } as P
    return <Componente {...completas} />
  }
  return Envuelto
}
```

2. Sustituye `Tarjeta.tsx` por este archivo. Ya no llama a `useSesion`.

```tsx
import type { Entregable } from "../modelo"
import { conRevisor } from "../hoc/conRevisor"

interface TarjetaProps {
  item: Entregable
  textoBoton?: string
  alMarcar: (id: string) => void
  revisor: string
}

function Tarjeta({
  item,
  textoBoton = "Anotar",
  alMarcar,
  revisor,
}: TarjetaProps) {
  return (
    <article>
      <p>{item.titulo}</p>
      <p>
        {item.id} · {item.proveedor}
      </p>
      <p>Revisor: {revisor}</p>
      <p className={`estado ${item.estado}`}>{item.estado}</p>
      {item.estado === "pendiente" ? <p>Falta revisión</p> : null}
      <button type="button" onClick={() => alMarcar(item.id)}>
        {item.estado === "revisado" ? "Hecho" : textoBoton} {item.id}
      </button>
    </article>
  )
}

export default conRevisor(Tarjeta)
```

La caja sigue en `Luis` o vuelve a `Ana` si recargaste. Las seis fichas muestran ese nombre. `App` no tiene `revisor=` en la etiqueta.

3. Cambia un momento la última línea a `export default Tarjeta`. Problems pide `revisor` en cada `<Tarjeta>`. Restaura `export default conRevisor(Tarjeta)`. Problems queda vacío.

<a id="memo"></a>

## 3. Memo

`memo` también es un HOC: recibe un componente y devuelve otro. Abre la consola (F12, Consola). Cada ejecución de la ficha escribe su id. En desarrollo pueden salir duplicados por `StrictMode`. Mira si aparecen líneas nuevas, no el número exacto.

1. En la primera línea de `function Tarjeta`, añade:

```tsx
console.log(item.id)
```

Limpia la consola. Escribe una letra en «Buscar». Salen ids. La ficha es hija de `App`, y `App` se volvió a ejecutar.

2. En `App.tsx`, cambia el import y `marcar`.

```tsx
import { useCallback, useState } from "react"
```

```tsx
const marcar = useCallback((id: string) => {
  setItems((lista) =>
    lista.map((item) =>
      item.id === id ? { ...item, estado: "revisado" } : item,
    ),
  )
}, [])
```

En `Tarjeta.tsx`, importa `memo` desde `react` y cambia la última línea:

```tsx
export default memo(conRevisor(Tarjeta))
```

Limpia la consola. Escribe otra letra. No salen ids. `item` es el mismo y `alMarcar` también, porque `useCallback` tiene `[]`.

3. En `Sesion.tsx`, el proveedor se pinta por un estado que no es el nombre, y el `value` es un objeto nuevo cada vez. Sustituye la función por esta.

```tsx
export function SesionProveedor({ children }: { children: ReactNode }) {
  const [revisor, setRevisor] = useState("Ana")
  const [tocar, setTocar] = useState(0)
  return (
    <SesionContexto.Provider value={{ revisor, setRevisor }}>
      <button type="button" onClick={() => setTocar(tocar + 1)}>
        Tocar {tocar}
      </button>
      {children}
    </SesionContexto.Provider>
  )
}
```

Limpia la consola. Pulsa «Tocar». El botón pasa a «Tocar 1» y el nombre sigue en Ana, pero salen ids. `memo` no ha frenado a `conRevisor`: el contexto entregó otro objeto.

4. Memoriza ese objeto. Añade `useMemo` al import de `Sesion.tsx` y deja el proveedor así.

```tsx
const [revisor, setRevisor] = useState("Ana")
const [tocar, setTocar] = useState(0)
const valor = useMemo(() => ({ revisor, setRevisor }), [revisor])
return (
  <SesionContexto.Provider value={valor}>
    <button type="button" onClick={() => setTocar(tocar + 1)}>
      Tocar {tocar}
    </button>
    {children}
  </SesionContexto.Provider>
)
```

Limpia la consola. Pulsa «Tocar». No salen ids. Escribe `Luis` en la caja del revisor. Salen ids y las seis fichas dicen «Revisor: Luis».

5. Quita `tocar`, el botón y el `console.log`. El proveedor se queda así:

```tsx
export function SesionProveedor({ children }: { children: ReactNode }) {
  const [revisor, setRevisor] = useState("Ana")
  const valor = useMemo(() => ({ revisor, setRevisor }), [revisor])
  return (
    <SesionContexto.Provider value={valor}>{children}</SesionContexto.Provider>
  )
}
```

`memo` y `useCallback` se quedan. La jornada 4 vuelve a escribir el id para medir.

<a id="reducer"></a>

## 4. useReducer

La lista deja de cambiar con `setItems`. Cambia con una acción.

1. Arriba de `App`, después de los imports, pega el tipo y la función. El import de `useState` sigue haciendo falta para la caja. Añade `useReducer`.

```tsx
import { useCallback, useReducer, useState } from "react"
```

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

2. Sustituye el estado de la lista y `marcar`.

```tsx
const [items, dispatch] = useReducer(reducir, entregables)

const marcar = useCallback((id: string) => {
  dispatch({ type: "marcar", id })
}, [])
```

Recarga. Pulsa «Anotar E-103». Solo esa pastilla pasa a `revisado`. E-101, si no lo marcaste ahora, sigue pendiente.

3. Cambia un momento la acción a `dispatch({ type: "marcar", id: "E-101" })`, sin usar el argumento. Pulsa E-103: se marca E-101. Restaura `id`.

<a id="store"></a>

## 5. useStore

`useStore` junta el reductor y el revisor. `App` y `Tarjeta` dejan de importar `useReducer` y `useContext`.

1. Crea `bandeja/src/tienda.tsx` con este archivo.

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
  return (
    <TiendaContexto.Provider value={valor}>{children}</TiendaContexto.Provider>
  )
}

export function useStore(): Tienda {
  const tienda = useContext(TiendaContexto)
  if (!tienda) throw new Error("useStore fuera de TiendaProveedor")
  return tienda
}
```

2. En `main.tsx`, cambia `SesionProveedor` por `TiendaProveedor`.

```tsx
import { TiendaProveedor } from "./tienda"
```

```tsx
<TiendaProveedor>
  <App />
</TiendaProveedor>
```

3. Sustituye `App.tsx` por este. Ya no tiene reductor ni `useSesion`.

```tsx
import { useState } from "react"
import type { Entregable } from "./modelo"
import Tarjeta from "./componentes/Tarjeta"
import { useStore } from "./tienda"

export default function App() {
  const [texto, setTexto] = useState("")
  const { items, revisor, setRevisor } = useStore()

  const visibles = items.filter((item: Entregable) => {
    const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
    return blob.includes(texto.toLowerCase())
  })

  return (
    <main>
      <h1>Bandeja de entregables</h1>
      <label htmlFor="revisor">Revisor</label>
      <input
        id="revisor"
        value={revisor}
        onChange={(evento) => setRevisor(evento.target.value)}
      />
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
            <Tarjeta item={item} />
          </li>
        ))}
      </ul>
    </main>
  )
}
```

4. Sustituye `Tarjeta.tsx` por este. La ficha pide `marcar` y `revisor` a la tienda. Ya no hay HOC ni prop `alMarcar`.

```tsx
import { memo } from "react"
import type { Entregable } from "../modelo"
import { useStore } from "../tienda"

interface TarjetaProps {
  item: Entregable
  textoBoton?: string
}

function Tarjeta({ item, textoBoton = "Anotar" }: TarjetaProps) {
  const { marcar, revisor } = useStore()
  return (
    <article>
      <p>{item.titulo}</p>
      <p>
        {item.id} · {item.proveedor}
      </p>
      <p>Revisor: {revisor}</p>
      <p className={`estado ${item.estado}`}>{item.estado}</p>
      {item.estado === "pendiente" ? <p>Falta revisión</p> : null}
      <button type="button" onClick={() => marcar(item.id)}>
        {item.estado === "revisado" ? "Hecho" : textoBoton} {item.id}
      </button>
    </article>
  )
}

export default memo(Tarjeta)
```

Escribe `Luis`: cambian las seis líneas. Pulsa «Anotar E-101»: solo esa pastilla pasa a `revisado`.

Quita `<TiendaProveedor>` y recarga. Lees «useStore fuera de TiendaProveedor». Vuelve a envolver `<App />`.

`Sesion.tsx` y `conRevisor.tsx` ya no se importan. Si el editor los marca, bórralos.

<a id="api"></a>

## 6. Consumo de API

A partir de aquí la lista deja de salir de `datos.ts`. Los laboratorios de la API no usan la tienda. Deja `tienda.tsx` en el disco si quieres, pero `main.tsx` vuelve a pintar `<App />` sin proveedor.

Sustituye `main.tsx` el render por `<StrictMode><App /></StrictMode>` y quita el import de `TiendaProveedor`.

Sustituye `App.tsx` por este. Tiene buscador, `marcar` y la pestaña «Pendientes: 3». La lista sigue en memoria, un momento.

```tsx
import { useEffect, useState } from "react"
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

`Tarjeta` tiene que volver a aceptar `alMarcar`. Si la acabas de dejar con `useStore`, sustituye `bandeja/src/componentes/Tarjeta.tsx` por este archivo.

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

Abre `http://localhost:5173/entregables.json`. Ves los seis objetos. En la pestaña Red de la aplicación, al recargar `/`, esa petición no está: la lista sale de `datos.ts`.

1. Crea `bandeja/src/api/entregables.ts` y pega esto. La página no cambia: nadie llama al archivo.

```tsx
import type { Entregable, EstadoEntregable } from "../modelo"

function esEstado(valor: unknown): valor is EstadoEntregable {
  return valor === "pendiente" || valor === "revisado" || valor === "rechazado"
}

function esEntregable(valor: unknown): valor is Entregable {
  if (typeof valor !== "object" || valor === null) return false
  const candidato = valor as Record<string, unknown>
  return (
    typeof candidato.id === "string" &&
    typeof candidato.titulo === "string" &&
    typeof candidato.proveedor === "string" &&
    esEstado(candidato.estado)
  )
}

export async function cargarEntregables(): Promise<Entregable[]> {
  const respuesta = await fetch("/entregables.json")
  if (!respuesta.ok) throw new Error(`Respuesta ${respuesta.status}`)
  const datos: unknown = await respuesta.json()
  if (!Array.isArray(datos) || !datos.every(esEntregable)) {
    throw new Error("El JSON no es una lista de entregables")
  }
  return datos
}
```

2. En `App.tsx`, quita el import de `entregables`. El estado inicial pasa a `[]`. Debajo del efecto del título, pega este otro.

```tsx
import { cargarEntregables } from "./api/entregables"
```

```tsx
const [items, setItems] = useState<Entregable[]>([])
```

```tsx
useEffect(() => {
  let vivo = true
  cargarEntregables()
    .then((lista) => {
      if (vivo) setItems(lista)
    })
    .catch((causa: unknown) => {
      console.error(causa)
    })
  return () => {
    vivo = false
  }
}, [])
```

Recarga con la pestaña Red abierta. Hay una petición a `entregables.json` y después las seis fichas. La pestaña del documento dice «Pendientes: 3». Escribe en «Buscar»: no sale otra petición.

3. En `public/entregables.json`, el estado de E-104 pasa a `"listo"`. Recarga. La consola muestra el error y no hay fichas a medias. Restaura `"rechazado"`. Recarga. Vuelven las seis.

<a id="finales"></a>

## 7. Loading, error y vacío

1. En `App.tsx`, junto a los otros `useState`:

```tsx
const [cargando, setCargando] = useState(true)
const [error, setError] = useState("")
```

2. Sustituye el efecto de la petición por este.

```tsx
useEffect(() => {
  let vivo = true
  setCargando(true)
  setError("")
  cargarEntregables()
    .then((lista) => {
      if (vivo) setItems(lista)
    })
    .catch((causa: unknown) => {
      console.error(causa)
      if (vivo) setError("No se pudo cargar la bandeja.")
    })
    .finally(() => {
      if (vivo) setCargando(false)
    })
  return () => {
    vivo = false
  }
}, [])
```

3. Justo antes del `return` de la lista, pega estas dos salidas. Los hooks quedan arriba.

```tsx
if (cargando) {
  return (
    <main>
      <h1>Bandeja de entregables</h1>
      <p>Cargando entregables…</p>
    </main>
  )
}

if (error) {
  return (
    <main>
      <h1>Bandeja de entregables</h1>
      <p role="alert">{error}</p>
    </main>
  )
}
```

Recarga. Se lee «Cargando entregables…» y enseguida las fichas.

4. En `cargarEntregables`, la URL pasa a `"/no-esta.json"`. Recarga. Ves «No se pudo cargar la bandeja.» y ninguna ficha. Restaura `"/entregables.json"`. Recarga. Vuelven las seis.

5. Escribe `zzzz` en «Buscar». Ves «Ningún entregable coincide.». Ese párrafo no tiene `role="alert"`.

<a id="estructura"></a>

## 8. Estructura del proyecto

1. Crea `bandeja/src/hooks/useEntregables.ts` con este archivo. Es el bloque que ahora está en `App`: lista, carga, error, título y `marcar`.

```tsx
import { useEffect, useState } from "react"
import { cargarEntregables } from "../api/entregables"
import type { Entregable } from "../modelo"

export function useEntregables() {
  const [items, setItems] = useState<Entregable[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  const pendientes = items.filter((item) => item.estado === "pendiente").length

  useEffect(() => {
    document.title = `Pendientes: ${pendientes}`
  }, [pendientes])

  useEffect(() => {
    let vivo = true
    setCargando(true)
    setError("")
    cargarEntregables()
      .then((lista) => {
        if (vivo) setItems(lista)
      })
      .catch((causa: unknown) => {
        console.error(causa)
        if (vivo) setError("No se pudo cargar la bandeja.")
      })
      .finally(() => {
        if (vivo) setCargando(false)
      })
    return () => {
      vivo = false
    }
  }, [])

  function marcar(id: string): void {
    setItems((lista) =>
      lista.map((item) =>
        item.id === id ? { ...item, estado: "revisado" } : item,
      ),
    )
  }

  return { items, cargando, error, marcar }
}
```

2. Sustituye la cabecera de `App.tsx` por esta. Borra de `App` los estados `items`, `cargando` y `error`, los dos efectos y `marcar`. El `filter` de `visibles` y los tres `return` se quedan.

```tsx
import { useState } from "react"
import Tarjeta from "./componentes/Tarjeta"
import { useEntregables } from "./hooks/useEntregables"

export default function App() {
  const [texto, setTexto] = useState("")
  const { items, cargando, error, marcar } = useEntregables()
```

Recarga. Seis fichas, el filtro responde y la pestaña dice «Pendientes: 3». En `App.tsx` no aparece `useEffect`. En `Tarjeta.tsx` no aparece `fetch`.

<a id="responsabilidades"></a>

## 9. Separación de responsabilidades

1. Busca `texto` en `useEntregables.ts`. No está.
2. Busca `fetch` en `Tarjeta.tsx`. No está.
3. En el cuerpo de `Tarjeta`, antes del `return`, añade esta línea y guarda.

```tsx
void fetch("/entregables.json")
```

Recarga con la pestaña Red abierta. Hay una petición por ficha. Escribe una letra: salen más. Borra esa línea. Recarga. Vuelve a haber una sola petición.

<a id="reutilizable"></a>

## 10. Componente reutilizable

En el `map` de `App`, una sola etiqueta lleva otro rótulo:

```tsx
<Tarjeta
  item={item}
  alMarcar={marcar}
  textoBoton={item.id === "E-104" ? "Registrar" : undefined}
/>
```

E-104, que está rechazado, dice «Registrar E-104». El resto dice «Anotar» o «Hecho». Sigue habiendo un solo archivo `Tarjeta.tsx`.

Quita `item={item}`. Problems marca la etiqueta. Vuelve a poner `item={item}` y quita `textoBoton`. E-104 vuelve a «Anotar».

<a id="antipatrones"></a>

## 11. Antipatrones

Los tres se deshacen. No se quedan.

1. En `useEntregables.ts`, sustituye `marcar` por una mutación.

```tsx
function marcar(id: string): void {
  setItems((lista) => {
    lista.forEach((item) => {
      if (item.id === id) item.estado = "revisado"
    })
    return lista
  })
}
```

Recarga y pulsa «Anotar E-103». Si la pastilla no cambia, React ha recibido el mismo array. Restaura el `map`:

```tsx
function marcar(id: string): void {
  setItems((lista) =>
    lista.map((item) =>
      item.id === id ? { ...item, estado: "revisado" } : item,
    ),
  )
}
```

Pulsa otra vez. La pastilla pasa a `revisado`.

2. En `App.tsx`, sustituye el `const visibles = items.filter(...)` por un estado que nadie actualiza:

```tsx
const [visibles] = useState(items)
```

Escribe `Este`. La caja cambia y las fichas no la siguen: se quedaron en la lista del primer pintado, a menudo vacía porque el JSON aún no había llegado. Borra ese `useState` y devuelve el `filter`. `Este` deja «Inventario de componentes».

3. En `api/entregables.ts`, cambia `const datos: unknown` por `const datos: any`. En el JSON, E-104 pasa otra vez a `"listo"`. Recarga: el guarda ya no se queja y el dato entra. Restaura `unknown` y `"rechazado"`. Problems vuelve a vaciarse cuando el JSON es válido.
