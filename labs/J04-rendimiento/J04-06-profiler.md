# J04-06 — Profiler

[← Página anterior](J04-05-devtools.md) · [Siguiente página →](J04-07-lighthouse.md)

El Profiler pregunta qué componente se ejecutó y cuánto tardó el render. Hace falta la extensión React DevTools. No sustituye a Network.

## Demostración

### Objetivo

Grabar un pintado y ver qué componente se ejecutó al teclear.

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

Hace falta la extensión React DevTools en el navegador donde se abre el puerto. Sin ella, `console.count(item.id)` en la primera línea de `Tarjeta` responde qué ficha se ejecutó, sin tiempos.

### 1 — Una letra grabada

**Dónde:** pestaña Profiler de React DevTools.

**Qué haces:**

1. Empieza a grabar.
2. Escribe una letra en «Buscar».
3. Para la grabación.
4. Localiza `App` y `Tarjeta` en el árbol de ese pintado.

**Experimento:** marca una ficha pendiente con el Profiler grabando. Para y mira si la ficha marcada y las demás salen juntas.

→ `App` sale al teclear, porque el estado de la caja vive ahí. `Tarjeta` sale en las que se volvieron a ejecutar. Si `memo` y `useCallback` ya están, una letra no tiene por qué ejecutar las fichas cuyo `item` no cambió. Marcar ejecuta al menos la ficha cuyo objeto es nuevo.

**Validación:**

- Hay una grabación con al menos un commit.
- No has cambiado código para «mejorar» la barra.
- La página sigue usable.

## Comprueba tu entendimiento

**Qué no mira el Profiler**
No lista las peticiones HTTP.
→ Eso es Network. El Profiler mira el render de React.

## Reto

### 1 — El commit del título

Si tienes el efecto de la pestaña, márcalo con el Profiler grabando.
→ Hay un commit porque `pendientes` cambió. El título del documento no es un componente, pero el render que lo provocó sí sale.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No aparece la pestaña Profiler | La extensión no está en ese navegador | Instálala, o usa el `console.count` |
| La grabación sale vacía | No tecleaste durante la grabación | Graba, escribe una letra, para |

## Laboratorio

La demostración grabó una letra. Aquí grabas un clic en una ficha.

### Objetivo

Ver en el Profiler que marcar E-101 afecta a esa ficha, no pedir el documento.

### Código de partida

React DevTools instalado. La bandeja en el 5173. Si no tienes la extensión, mira la consola: `console.count(item.id)` en `Tarjeta` y pulsa «Anotar E-101».

### Qué haces

1. Abre Profiler. Empieza a grabar.
2. Pulsa «Anotar E-101». Para.
3. Busca `Tarjeta` o `App` en la grabación.
4. No mires la pestaña Red para este ejercicio: el clic no es una petición.

→ La grabación tiene commits del clic. E-101 cambia a `revisado`. No hace falta que las seis fichas hayan recibido otro `item`.
