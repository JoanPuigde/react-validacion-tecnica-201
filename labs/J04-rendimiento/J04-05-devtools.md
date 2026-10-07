# J04-05 — Chrome DevTools

[← Página anterior](J04-04-lazy.md) · [Siguiente página →](J04-06-profiler.md)

Network dice si cada letra pide el documento o el JSON. Performance dice si el tiempo se fue en script, en pintura o en red. En seis fichas el tramo es corto. La pregunta se hace igual.

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
