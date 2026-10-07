# J03-06 — Consumo de API

[← Página anterior](J03-05-store.md) · [Siguiente página →](J03-07-finales.md)

> Laboratorio de [Consumo de API](README.md).

### Objetivo

Cargar `/entregables.json` y aceptar la respuesta solo si cada elemento es un `Entregable`.

### Código de partida

Si tu `App.tsx` no tiene buscador, `marcar` y la pestaña «Pendientes: 3», sustituye `bandeja/src/App.tsx` por este archivo. `Tarjeta.tsx`, `datos.ts` y `modelo.ts` se quedan. `public/entregables.json` ya está.

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

Abre `http://localhost:5173/entregables.json`. Son los mismos seis. La app todavía no los pide.

### En qué consiste

Un guarda sobre `unknown` y un efecto que pide el JSON una vez.

### 1 — El guarda

**Dónde:** archivo nuevo `bandeja/src/api/entregables.ts`.

**Qué haces:**

1. Crea la carpeta y el archivo.
2. Guarda.
3. Busca `any`. No debe estar.

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

**Experimento:** cambia `unknown` por `any` en `datos`. Mira Problems. Vuelve a `unknown`.

→ Con `any` el guarda deja de exigirse. El archivo se queda en `unknown`. La página no ha cambiado.

### 2 — Llamarla una vez

**Dónde:** `App.tsx`. Quita el import de `entregables`. Los hooks siguen antes del `return`.

**Qué haces:**

1. Importa `cargarEntregables`.
2. `items` empieza en `[]`.
3. Añade este efecto debajo del título de la pestaña.
4. Recarga con Network abierto.

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

**Experimento:** en el JSON, pon `"estado": "listo"` en E-104. Recarga. Restaura `"rechazado"`.

→ Con `"listo"`, la consola muestra el error y no aparecen fichas a medias. Al restaurar, Network tiene una petición y luego las seis. Teclear en «Buscar» no añade otra.

**Validación:**

- Al recargar, seis fichas y la pestaña «Pendientes: 3».
- `App` ya no importa `datos.ts`.
- Problems vacío. No hay `any`.

## Comprueba tu entendimiento

**Dónde está fetch**
Busca `fetch` en `Tarjeta.tsx` y fuera de `cargarEntregables`.
→ No está. `App` solo llama a `cargarEntregables` desde el efecto con `[]`.

## Reto

### 1 — Una petición por letra

Mueve la llamada a `cargarEntregables()` al cuerpo de `App`, fuera del efecto. Escribe una letra. Devuélvela al efecto.

<details>
<summary>Ver solución</summary>

Network dispara una petición por cada letra. El cuerpo del componente corre en cada pintado. La llamada vuelve al efecto con `[]`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Sigue el array de `datos.ts` | El import y el `useState(entregables)` siguen | Estado inicial `[]` y el efecto llama a `cargarEntregables` |
| Una petición por letra | El `fetch` no está en el efecto, o el efecto no tiene `[]` | Efecto con `[]` |
| `"listo"` entra | El JSON se leyó como `any` | `const datos: unknown` |
