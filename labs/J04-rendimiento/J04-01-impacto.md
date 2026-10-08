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
| Al teclear sale `App: 6` | El `count("App")` está dentro del `map`, en cada ficha | Primera línea de la función `App`, antes de los `useState` |
| La consola sigue contando al borrar la línea | Quedó el `console.count` de `Tarjeta` | Bórralo también en `Tarjeta.tsx` y guarda |

## Laboratorio

La demostración contó ejecuciones dentro de `Tarjeta`. Aquí cuentas en `App`, para ver una sola llamada del padre.

### Objetivo

Dejar claro que una letra ejecuta `App` una vez, aunque las fichas sean seis.

### Código de partida

La bandeja en `http://localhost:5173`, con la caja «Buscar» y las seis fichas. `npm run dev` sigue en marcha dentro de `bandeja/`.

Abre `bandeja/src/componentes/Tarjeta.tsx`. Si la demostración dejó `console.count(item.id)`, borra esa línea y guarda. Si se queda, la consola mezcla el padre y las fichas y no se distingue quién sube.

### Qué haces

1. Abre `bandeja/src/App.tsx`. La primera línea del cuerpo de `App`, antes de `useState`, queda así. Guarda.

```tsx
export default function App() {
  console.count("App")
  const [texto, setTexto] = useState("")
```

2. Recarga la página con F5. El número vuelve a cero solo al recargar. Limpiar la consola borra las líneas y deja el número donde estaba. F12, pestaña Consola. El filtro de niveles deja pasar `Info`.

   Antes de teclear ya puede leerse `App: 1` o `App: 2`. Es el primer pintado. `main.tsx` envuelve la app en `StrictMode` y en desarrollo ese pintado puede contar dos veces.

3. Haz clic en la caja «Buscar». Escribe una sola letra, `n`.

   El número sube un paso: de 2 a 3, de 2 a 4, o el salto que te haya tocado. Sube una vez por la letra, o dos si StrictMode dobla también esa ejecución. No sube seis, una por ficha.

4. Sin recargar, escribe otra letra, `o`. El número sube el mismo paso, otra vez. En pantalla siguen las fichas que coinciden con `no`. La página no se siente más lenta.

5. Borra la línea `console.count("App")`. Guarda. Recarga, y escribe `p`.

   Ya no aparece `App`. El filtro sigue. Vacía la caja antes de la página siguiente.

**Validación:**

- Tras la primera letra el número subió un paso, no seis.
- `Tarjeta.tsx` ya no tiene `console.count`.
- `App.tsx` tampoco, cuando terminas el paso 5.

→ El contador que sube es el del padre. Las seis fichas son hijas de esa ejecución. StrictMode puede doblar el número: mira que suba al teclear, no el valor exacto.
