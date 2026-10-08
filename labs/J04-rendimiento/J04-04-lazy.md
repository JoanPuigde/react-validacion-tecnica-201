# J04-04 — Lazy loading

[← Página anterior](J04-03-estado.md) · [Siguiente página →](J04-05-devtools.md)

`lazy` parte el paquete. El trozo llega cuando se muestra. `Suspense` enseña un respaldo mientras llega. El pie de la bandeja basta para ver el mecanismo.

## Demostración

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
| `Ayuda` sale en Red al recargar | La etiqueta está siempre en el `return`, sin el `abierta ?` | Envuelve `<Ayuda />` en `{abierta ? ( … ) : null}` |
| El botón no pide ningún archivo | `lazy` está dentro de la función `App` | `const Ayuda = lazy(...)` va junto a los import, fuera del componente |

## Laboratorio

La demostración cargó el pie al arrancar la página. Aquí el trozo llega solo si pulsas un botón.

### Objetivo

`Ayuda` entra con `lazy` cuando `abierta` pasa a verdadero. El respaldo dice «Abriendo ayuda…».

### Código de partida

`App` pinta la lista en el 5173. Si la demostración dejó `Pie` con `lazy`, no lo reutilices: este componente es otro archivo. El pie puede quedarse en la página. La fila que vas a buscar en Red se llama `Ayuda`, no `Pie`.

### 1 — El archivo

Crea `bandeja/src/componentes/Ayuda.tsx`.

```tsx
export default function Ayuda() {
  return <p>La marca vive en memoria hasta que recargas.</p>
}
```

### 2 — El lazy fuera del componente

En `bandeja/src/App.tsx`, deja un solo import de React. Si ya tenías `useState`, amplíalo: no añadas una segunda línea `from "react"`.

```tsx
import { lazy, Suspense, useState } from "react"
```

Debajo de los import, y antes de `export default function App`, declara el lazy. Ahí se ejecuta una vez. Dentro de `App` nacería otro componente en cada pintado.

```tsx
const Ayuda = lazy(() => import("./componentes/Ayuda"))
```

Dentro de `App`, junto a los otros `useState`:

```tsx
const [abierta, setAbierta] = useState(false)
```

En el `return`, después de `</ul>` y antes de `</main>`:

```tsx
<button type="button" onClick={() => setAbierta(true)}>
  Ayuda
</button>
{abierta ? (
  <Suspense fallback={<p>Abriendo ayuda…</p>}>
    <Ayuda />
  </Suspense>
) : null}
```

Guarda.

### 3 — La red antes del clic

F12, pestaña Red. Pulsa el icono de prohibido para vaciar la lista. En la barra de filtros pulsa `JS`, para quedarte con los archivos de script.

Recarga la página con la pestaña Red abierta.

Bajo la lista se ve el botón «Ayuda». No se lee «La marca vive en memoria hasta que recargas.» Ni «Abriendo ayuda…».

En la columna Nombre no hay ninguna fila cuyo nombre contenga `Ayuda`. Puede haber una fila `Pie` si dejaste el de la demostración: esa llega al recargar, y no es la de este ejercicio.

### 4 — El clic

Pulsa «Ayuda».

Aparece una fila nueva cuyo nombre contiene `Ayuda`. Es un archivo distinto de `App.tsx`. Debajo del botón se lee «La marca vive en memoria hasta que recargas.»

«Abriendo ayuda…» puede cruzar la pantalla tan rápido que no llegues a leerlo. Si la frase final está y la fila `Ayuda` apareció al pulsar, el respaldo cumplió. Vuelve a pulsar el botón: `abierta` ya es verdadero, no sale otra fila.

Al acabar puedes dejar el botón o quitar el estado, el `lazy`, la etiqueta y el archivo `Ayuda.tsx`.

**Validación:**

- Al recargar, con el filtro `JS`, no hay fila `Ayuda`.
- Tras el clic, la fila existe y se lee la frase de la marca.
- La lista de fichas sigue en `App`, no dentro de `Ayuda.tsx`.

→ Antes del clic no está el párrafo ni su archivo. Después del clic se lee la frase. La lista no se ha ido a ese trozo.
