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
| Grabé en Performance y no veo `Tarjeta` | Esa pestaña es la del navegador | La pestaña Profiler lleva el logo de React, al lado de Components |
| El botón no dice «Hecho» | Pulsaste «Anotar E-103» o «Anotar E-105» | El botón cuyo texto es «Anotar E-101» |

## Laboratorio

La demostración grabó una letra. Aquí grabas un clic en una ficha.

### Objetivo

Ver en el Profiler el commit del clic que marca E-101. La pastilla de esa ficha pasa a `revisado`.

### Código de partida

La bandeja en `http://localhost:5173`, con las seis fichas. E-101 sigue en `pendiente`: el botón dice «Anotar E-101». Si ya lo marcaste, recarga y vuelve a ese texto.

Hace falta la extensión React Developer Tools en el mismo navegador. F12. Junto a las pestañas del navegador aparecen dos con el logo de React: Components y Profiler. Profiler no es la pestaña Rendimiento (Performance). Esa no lista `Tarjeta`.

Si no ves el logo, sigue el apartado «Sin la extensión» y salta el apartado del Profiler.

### 1 — Grabar el clic

Abre la pestaña Profiler. Hay dos controles redondos. Usa el círculo de grabar. El otro recarga la página y empieza a grabar: no lo uses, porque perderías el clic.

El círculo pasa a estado de grabación. En la página, pulsa el botón que dice exactamente «Anotar E-101». Es la ficha «Informe de accesibilidad». Hay otros dos «Anotar», E-103 y E-105: no valen para este paso.

El botón pasa a «Hecho E-101». La pastilla dice `revisado`.

Vuelve a las herramientas y pulsa el mismo círculo para parar.

### 2 — Leer el commit

Aparece una barra por cada commit. Pulsa la barra de esa grabación. Si hay varias, pulsa la última: es el clic.

El gráfico lista componentes por nombre. Localiza `App`. Localiza `Tarjeta`.

- Si en `App` siguen `memo` y `useCallback`, la `Tarjeta` coloreada es la de E-101. Las otras pueden salir grises: en ese commit no se ejecutaron.
- Si al empezar esta página pegaste `App` y `Tarjeta` sin `memo`, pueden salir varias `Tarjeta` coloreadas. También vale: el commit es el del clic.

La fila que buscas es el nombre del componente en ese gráfico. La pestaña Red no entra en la comprobación.

**Validación:**

- Hay al menos una barra de commit.
- En la página, E-101 dice `revisado` y el botón dice «Hecho E-101».
- En el gráfico se lee `App` o `Tarjeta`.

### Sin la extensión

En la primera línea del cuerpo de `Tarjeta`, añade `console.count(item.id)` y guarda. Recarga. F12, Consola. Limpia la pantalla si quieres: el número no vuelve a cero hasta que recargas, y la recarga ya ha contado el primer pintado.

Pulsa «Anotar E-101». El número de `E-101` sube. Si no hay `memo`, los otros id también suben. La pastilla de E-101 dice `revisado`.

Borra el `console.count` al acabar. La página de Lighthouse lo quiere fuera.

→ La grabación tiene el commit del clic. E-101 cambia a `revisado`. No hace falta que las seis fichas hayan recibido otro `item`.
