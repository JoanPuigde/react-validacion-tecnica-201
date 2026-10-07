# J04-04 — Lazy loading

[← Página anterior](J04-03-estado.md) · [Siguiente página →](J04-05-devtools.md)

`lazy` parte el paquete. El trozo llega cuando se muestra. `Suspense` enseña un respaldo mientras llega. El pie de la bandeja basta para ver el mecanismo.

### Objetivo

Cargar un componente en otro archivo del paquete, con un respaldo mientras llega.

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

No hay `Pie.tsx`. El pie se crea en el paso.

### 1 — El pie

**Dónde:** `bandeja/src/componentes/Pie.tsx` y `App.tsx`, debajo de la lista.

**Qué haces:**

1. Crea `Pie.tsx`.
2. Cárgalo con `lazy` y envuélvelo en `Suspense`.
3. Recarga. Abre Network y busca el archivo del pie.
4. Puedes dejar el pie.

```tsx
export default function Pie() {
  return <p>Lista de entregables.</p>
}
```

```tsx
import { lazy, Suspense } from "react"

const Pie = lazy(() => import("./componentes/Pie"))
```

```tsx
<Suspense fallback={<p>Cargando el pie…</p>}>
  <Pie />
</Suspense>
```

**Experimento:** escribe mal la ruta del import, `./componentes/NoEsta`. Recarga. Restaura `./componentes/Pie`.

→ Con la ruta mala, el respaldo se queda o la consola muestra el fallo del módulo. Con la ruta buena, se lee «Lista de entregables.» bajo la lista. El respaldo puede no llegar a verse: el archivo es pequeño.

**Validación:**

- `Pie` no está importado con un `import` normal además del `lazy`.
- La lista sigue filtrando.
- Problems vacío.

## Comprueba tu entendimiento

**Qué no acelera**
El pie no quita trabajo al filtro.
→ Parte el paquete. En esta pantalla no hay un panel pesado que justificar.

## Reto

### 1 — Sin Suspense

Quita `Suspense` y deja el `lazy`. Lee la consola. Vuelve a envolverlo.

<details>
<summary>Ver solución</summary>

React avisa de que falta un límite de `Suspense`. El pie vuelve a ir dentro.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `Pie is not defined` | Falta el `const Pie = lazy(...)` | El `lazy` está en `App`, no dentro del `return` |
| El respaldo no desaparece | La ruta del import no resuelve | `./componentes/Pie` |
