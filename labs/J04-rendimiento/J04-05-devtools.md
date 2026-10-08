# J04-05 — Chrome DevTools

[← Página anterior](J04-04-lazy.md) · [Siguiente página →](J04-06-profiler.md)

Network dice si cada letra pide el documento o el JSON. Performance dice si el tiempo se fue en script, en pintura o en red. En seis fichas el tramo es corto. La pregunta se hace igual.

## Demostración

### Objetivo

Leer Network y una pasada corta de Performance mientras se filtra.

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

`npm run dev` en marcha. La pestaña Red del navegador se abre con F12.

### 1 — Network y Performance

**Dónde:** las herramientas del navegador.

**Qué haces:**

1. Abre Network. Recarga. Localiza el documento HTML.
2. Escribe en «Buscar». Mira si el documento se repite.
3. Si existe la petición a `entregables.json`, mira si se repite al teclear.
4. Abre Performance, graba, escribe `Norte`, borra y para la grabación.
5. Mira si hay un tramo de script. No cambies código.

**Experimento:** recarga con la caja vacía y compara el número de peticiones del documento con el de una letra.

→ El documento se pide al recargar, no al teclear. En seis fichas el tramo de Performance es corto. La lectura es esa, no una optimización.

**Validación:**

- Has visto la petición del documento.
- Has visto que teclear no lo repite.
- La bandeja sigue filtrando.

## Comprueba tu entendimiento

**Qué pregunta contesta Network**
No contesta cuántas veces se ejecutó `Tarjeta`.
→ Contesta qué salió por la red. El contador de la consola contesta lo otro.

## Reto

### 1 — El JSON a mano

Abre `http://localhost:5173/entregables.json` desde la barra de direcciones.
→ El archivo está publicado. Que la app lo pida o no depende de si `App` todavía importa `datos.ts`.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Cada letra pide el HTML | No estás en el puerto de Vite | `npm run dev`, puerto 5173 |
| Performance vacío | La grabación no estaba en marcha al teclear | Graba, teclea, para |
| Al teclear aparecen muchas filas | Estás contando los `.js` de Vite | En la barra de Red pulsa el filtro `Doc` y cuenta solo esa fila |
| No encuentro Slow 3G | El desplegable trae otros nombres | La opción más lenta que no sea Offline: `3G` o `Slow 4G` |

## Laboratorio

La demostración miró la Red al teclear. Aquí miras la Red al recargar con la CPU y la red limitadas.

### Objetivo

Ver el documento y, si existe, `entregables.json`, con la red en «Slow 3G». Teclear sigue sin repetirlos.

### Código de partida

`npm run dev` dentro de `bandeja/`. La página abierta es `http://localhost:5173`. F12.

El `App.tsx` de esta página importa `datos.ts`. Con ese archivo no hay fila `entregables.json`. Si tu `App` sí pide el JSON, la fila existe y el paso 4 te dice qué hacer con ella.

### 1 — Limitar

Pestaña Red. En la barra de esa pestaña hay un desplegable que dice `No throttling` o `Sin limitación`. Ábrelo y elige `Slow 3G`. Si no está, elige la opción más lenta que no sea `Offline` (`3G` o `Slow 4G`).

La CPU no se limita en ese desplegable. Ve a la pestaña Rendimiento (Performance). Pulsa el engranaje, «Capture settings». En CPU elige `4x slowdown`. Si ese nombre no está, cualquier slowdown que no sea `No throttling`. En la pestaña queda un icono de aviso: la CPU sigue limitada mientras las herramientas estén abiertas. Vuelve a Red.

### 2 — Una sola fila de documento

En Red, pulsa el icono de prohibido para vaciar la lista. En la barra de filtros pulsa `Doc`, no `All` y no `JS`. Así solo ves el HTML.

Recarga con F5 y espera. Con Slow 3G la barra tarda más que antes.

Queda una fila. El tipo es `document`. El nombre es la dirección de la página, a menudo `localhost` o `/`. El estado es 200. Anota un 1.

Las filas de módulos (`.js`, `.tsx`) no entran en esta cuenta. Si las ves, el filtro `Doc` no está pulsado.

### 3 — Teclear no pide otro HTML

Sin vaciar la lista y sin quitar el filtro `Doc`, haz clic en «Buscar» y escribe `Norte`.

La lista de la página se queda en dos fichas, E-101 y E-103. En Red sigue habiendo una fila `document`. `Norte` no ha añadido otra.

### 4 — El JSON, si tu app lo pide

Quita el filtro `Doc` y pulsa `Fetch/XHR`.

- Si `App` importa `datos.ts`, esta lista sale vacía. No busques `entregables.json`: esta página no lo pide.
- Si tu `App` carga `/entregables.json`, esa fila salió en la recarga del paso 2. Escribe `Norte` otra vez, con la lista sin vaciar: la fila no se repite.

### 5 — Quitar las limitaciones

En Red, el desplegable vuelve a `No throttling`. En Rendimiento, el engranaje, CPU vuelve a `No throttling`. Recarga una vez y comprueba que la página responde como al empezar.

**Validación:**

- Con el filtro `Doc`, la recarga dejó una fila.
- `Norte` no añadió una segunda fila `document`.
- El desplegable de red y la CPU han vuelto a `No throttling`.

→ El documento se pide una vez, más despacio. `Norte` no añade otra fila del HTML. Si la lista viene de `entregables.json`, esa fila tampoco se repite al teclear.
