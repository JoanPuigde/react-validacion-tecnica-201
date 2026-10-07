# J04-07 — Lighthouse

[← Página anterior](J04-06-profiler.md) · [Siguiente página →](../J05-testing/README.md)

Lighthouse hace una pasada de carga. En seis fichas la nota sale holgada. Esa nota no borra lo que decía el contador de la consola, y el contador no es la nota.

## Demostración

### Objetivo

Leer una pasada de carga y quitar el contador de depuración.

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

Lighthouse viene con el navegador, en F12. Si `Tarjeta` tiene `console.count`, esta página lo quita al final.

### 1 — Una pasada y el contador fuera

**Dónde:** pestaña Lighthouse. Luego `Tarjeta.tsx`.

**Qué haces:**

1. Categoría Rendimiento. Analiza la carga de la página.
2. Lee un número: el peso, el bloqueo o la puntuación. No cambies código para subirlo.
3. Borra `console.count` de `Tarjeta`.
4. Recarga y escribe una letra. La consola ya no cuenta ids.

**Experimento:** repite la pasada si quieres. Compara la holgura de la nota con lo que el contador decía antes de borrarlo.

→ En seis fichas la pasada sale holgada. El contador, mientras estuvo, decía que había ejecuciones de más. Son lecturas distintas. `memo` y `useCallback` pueden quedarse. El `console.count` no.

**Validación:**

- Has leído al menos un número de Lighthouse.
- `Tarjeta.tsx` no contiene `console.count`.
- El filtro y marcar siguen igual.

## Comprueba tu entendimiento

**Qué no demuestra la nota**
Una nota alta no dice que `memo` hiciera falta.
→ La nota mira la carga. El contador miraba los renders. En esta lista la nota no justifica el `memo`. El contador explicó por qué se puso.

## Reto

### 1 — Lighthouse no ve el estado

Marca E-101 y lanza otra pasada. Lighthouse recarga la página.
→ La marca no está en el informe. La pasada vuelve a cargar `/` y el estado de memoria se pierde.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Lighthouse no abre la app | El puerto no responde | `npm run dev` en `bandeja/` |
| La consola sigue contando | Quedó otro `console.count` | Búscalo en `Tarjeta.tsx` y bórralo |

## Laboratorio

La demostración lanzó Lighthouse en escritorio y no persiguió la nota. Aquí cambias el dispositivo, no el código.

### Objetivo

Sacar una segunda pasada con móvil y quedarte con las dos notas, sin editar `Tarjeta`.

### Código de partida

`npm run dev` en el 5173. Lighthouse en F12. Sin `console.count` en la ficha.

### Qué haces

1. Categoría Rendimiento, dispositivo móvil, analiza.
2. Anota el número al lado del de escritorio, en un comentario de `App` o en un papel.
3. No cambies componentes para subir la nota.
4. Borra el comentario si lo pusiste en el código. Las dos notas bastan como lectura.

→ Hay dos números. Ninguno ha obligado a tocar `memo` ni el filtro. La bandeja se usa igual.
