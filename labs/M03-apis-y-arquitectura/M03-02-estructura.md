# M03-02 — Estructura

[← Página anterior](M03-01-api.md) · [Siguiente página →](../M04-rendimiento/README.md)

> Práctica del módulo. La teoría y la demo están en el [README del módulo](README.md).

### Objetivo

Dejar la petición en `src/api/`, el estado de la bandeja en un hook, y la ficha sin `fetch`.

### Prerrequisitos

- [M03-01](M03-01-api.md): `App.jsx` carga `/entregables.json` y pinta carga, error y vacío.

### En qué consiste

Mueves código sin cambiar lo que se ve. Al final recorres tres antipatrones y compruebas que la bandeja no los tiene.

### 1 — Extraer la API

**Acción:** crea `bandeja/src/api/entregables.js`:

```js
export async function cargarEntregables() {
  const respuesta = await fetch("/entregables.json")
  if (!respuesta.ok) throw new Error(String(respuesta.status))
  return respuesta.json()
}
```

**Por qué:** la URL y el criterio de error quedan en un solo sitio. El componente no construye la petición.

**Resultado esperado:** el archivo exporta `cargarEntregables`. La bandeja todavía usa el `fetch` de `App` hasta el paso siguiente.

### 2 — Extraer el hook

**Acción:** crea `bandeja/src/hooks/useEntregables.js` con el estado, el efecto de carga, `marcar` y el efecto del título. Devuelve lo que `App` necesita para pintar.

```js
import { useEffect, useState } from "react"
import { cargarEntregables } from "../api/entregables.js"

export function useEntregables() {
  const [items, setItems] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let vivo = true
    async function cargar() {
      try {
        const datos = await cargarEntregables()
        if (vivo) setItems(datos)
      } catch {
        if (vivo) setError("No se pudo cargar la bandeja.")
      } finally {
        if (vivo) setCargando(false)
      }
    }
    cargar()
    return () => {
      vivo = false
    }
  }, [])

  const pendientes = items.filter((item) => item.estado === "pendiente").length

  useEffect(() => {
    document.title = `Pendientes: ${pendientes}`
    return () => {
      document.title = "Bandeja de entregables"
    }
  }, [pendientes])

  function marcar(id) {
    setItems((lista) =>
      lista.map((item) => (item.id === id ? { ...item, marca: "revisado" } : item)),
    )
  }

  return { items, cargando, error, marcar }
}
```

En `App.jsx`, borra de `Bandeja` esos estados, efectos y `marcar`, y deja el filtro y el JSX. El hook se llama dentro de `Bandeja`:

```jsx
import { useState } from "react"
import ListaPesada from "./variantes/ListaPesada.jsx"
import Tarjeta from "./componentes/Tarjeta.jsx"
import { useEntregables } from "./hooks/useEntregables.js"

export default function App() {
  const lenta = new URLSearchParams(window.location.search).has("lenta")
  if (lenta) return <ListaPesada />
  return <Bandeja />
}

function Bandeja() {
  const { items, cargando, error, marcar } = useEntregables()
  const [texto, setTexto] = useState("")

  const visibles = items.filter((item) => {
    const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
    return blob.includes(texto.toLowerCase())
  })

  return (
    <main>
      {/* el mismo JSX de título, filtro, carga, error, vacío y lista */}
    </main>
  )
}
```

Sustituye el comentario por el JSX que ya tenías en el return.

**Por qué:** el hook es la lógica de la bandeja. `Bandeja` calcula `visibles` porque el filtro es de esta pantalla. `Tarjeta` no importa el hook ni la API.

**Resultado esperado:** al recargar, mismas seis fichas, mismo filtro, mismo «Hecho» al marcar, mismo título «Pendientes: 3». En `Tarjeta.jsx` no aparece la palabra `fetch`.

### 3 — Pasar la lista de antipatrones

**Acción:** busca en `src/` estas tres cosas.

1. Un `fetch` escrito en el cuerpo de un componente, fuera de una función async llamada desde un efecto.
2. Un `useState` que guarde la lista ya filtrada.
3. Un `fetch` dentro de `Tarjeta.jsx`.

**Por qué:** son los tres fallos que más se cuelan al «dejarlo funcionando» en un solo archivo.

**Resultado esperado:** el único `fetch` está en `src/api/entregables.js`. `visibles` es un `const`, no un estado. `Tarjeta.jsx` solo usa props.

## Comprueba tu entendimiento

**La ficha no pide datos**
En el navegador, recarga la bandeja con la pestaña Network abierta y filtra por Fetch/XHR. Escribe en «Buscar».
→ Hay una petición a `entregables.json` al cargar. Escribir en el filtro no dispara otra.

## Reto

### 1 — Abortar de verdad

Sustituye la bandera `vivo` por un `AbortController` pasado a `fetch`. Si la petición se aborta, no rellenes `error` con el aviso de bandeja.

<details>
<summary>Ver solución</summary>

En `cargarEntregables`, acepta la señal:

```js
export async function cargarEntregables(signal) {
  const respuesta = await fetch("/entregables.json", { signal })
  if (!respuesta.ok) throw new Error(String(respuesta.status))
  return respuesta.json()
}
```

En el efecto:

```js
useEffect(() => {
  const control = new AbortController()
  async function cargar() {
    try {
      const datos = await cargarEntregables(control.signal)
      setItems(datos)
    } catch (excepcion) {
      if (excepcion.name === "AbortError") return
      setError("No se pudo cargar la bandeja.")
    } finally {
      if (!control.signal.aborted) setCargando(false)
    }
  }
  cargar()
  return () => control.abort()
}, [])
```

Al ir a `/?lenta=1` a media carga, la petición se aborta y no aparece el aviso de error en la otra pantalla.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Pantalla en blanco: `useEntregables is not defined` | Import con llaves olvidadas, o al revés | `import { useEntregables } from "./hooks/useEntregables.js"` |
| El título vuelve al del HTML y no se actualiza | El efecto del título se quedó en `App` y también en el hook, o se perdió | Un solo efecto, dentro del hook |
| Doble petición en desarrollo | `StrictMode` monta, limpia y monta otra vez | Es el comportamiento de desarrollo. En un build (`npm run build` y `npm run preview`) la petición va una vez |
