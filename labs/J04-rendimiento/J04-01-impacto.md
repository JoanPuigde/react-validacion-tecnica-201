# J04-01 — Qué impacta

[← Página anterior](README.md) · [Siguiente página →](J04-02-rerender.md)

React pinta en dos momentos. El render llama a las funciones. El commit aplica el árbol al documento. Si el estado vive en el padre, un `setTexto` vuelve a ejecutar al padre y a los hijos. `console.count` cuenta esas llamadas. No dice que la página vaya lenta.

## Demostración

### Objetivo

Contar cuántas veces se ejecuta `Tarjeta` al teclear, antes de optimizar.

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

### 1 — El contador

**Dónde:** `Tarjeta.tsx`, primera línea de la función.

**Qué haces:**

1. Añade `console.count(item.id)`.
2. Recarga, abre la consola y límpiala.
3. Escribe una letra. Borra la letra.
4. Marca una ficha pendiente y mira si otras fichas también cuentan.

```tsx
console.count(item.id)
```

**Experimento:** anota el id que más crece.

→ Una letra vuelve a ejecutar las fichas que siguen en pantalla. El padre se ha ejecutado y ha vuelto a pintar la lista. No has envuelto nada en `memo`.

**Validación:**

- La consola muestra `E-101: N` al teclear.
- La página se ve igual.
- El contador se queda para el laboratorio siguiente.

## Comprueba tu entendimiento

**Qué no dice el número**
`console.count` no es un tiempo.
→ Dice cuántas veces se llamó a la función. No dice si la página va lenta.

## Reto

### 1 — La ficha que el filtro quita

Escribe `Norte` y compara el contador de una ficha visible con el de una que desaparece.
→ La que desaparece deja de contar hasta que vuelve.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No cuenta | El `count` está fuera de la función | Primera línea del cuerpo de `Tarjeta` |
| No hay caja | `App` no filtra | Pega el archivo de J02-02 |

## Laboratorio

La demostración contó ejecuciones dentro de `Tarjeta`. Aquí cuentas en `App`, para ver una sola llamada del padre.

### Objetivo

Dejar claro que una letra ejecuta `App` una vez, aunque las fichas sean seis.

### Código de partida

La caja «Buscar» y el `map`. Quita `console.count` de `Tarjeta` si la demostración lo dejó.

### Qué haces

1. Como primera línea de `App`, `console.count("App")`.
2. Limpia la consola. Escribe una letra.
3. Mira cuántas veces sube `App`.
4. Borra el `console.count`.

→ Sube el contador de `App`. No sale un salto por ficha: las fichas son hijas, este contador es el padre. En desarrollo, StrictMode puede doblar el número. Mira si sube al teclear, no el valor exacto.
