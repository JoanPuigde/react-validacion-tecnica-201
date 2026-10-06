# M05-01 — La petición

[← Página anterior](README.md) · [Siguiente página →](M05-02-finales.md)

> Un paso. El array inicial del hook deja de ser la fuente. La fuente es el JSON, si tiene la forma de `Entregable`.

### Objetivo

Cargar `/entregables.json` y hacer `dispatch` de una acción `"cargar"`.

### Prerrequisitos

- [M04-07](../M04-hooks/M04-07-hook-propio.md): `useEntregables` empieza con `entregables` de `datos.ts`.

### 1 — Comprobar la respuesta

**Qué agregamos:** `bandeja/src/api/entregables.ts`.

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

**Con esto conseguimos:** `datos` entra como `unknown`. Sale como `Entregable[]` solo si cada elemento pasa el guarda. `Record<string, unknown>` no es `any`: cada campo se mira con `typeof`.

**Validar:** el archivo guarda. `datos` es `unknown` hasta el `if`. No hay ningún `any`. El efecto de este paso se ve en el siguiente, cuando la página pide el JSON.

### 2 — La acción cargar

**Qué agregamos:** en el tipo `Accion` del hook.

```tsx
type Accion =
  | { type: "marcar"; id: string }
  | { type: "cargar"; items: Entregable[] }
```

En el `switch`:

```tsx
case "cargar":
  return accion.items
```

El reductor empieza en vacío, no en `entregables`:

```tsx
const [items, dispatch] = useReducer(reducir, [])
```

Un efecto nuevo, además del título:

```tsx
useEffect(() => {
  let vivo = true
  void cargarEntregables()
    .then((datos) => {
      if (vivo) dispatch({ type: "cargar", items: datos })
    })
    .catch((error: unknown) => {
      console.error(error)
    })
  return () => {
    vivo = false
  }
}, [])
```

Quita el import de `datos.ts` en el hook si ya no se usa.

**Con esto conseguimos:** la lista llega después del primer pintado. `vivo` evita un `dispatch` si el hook ya se fue.

**Validar:** recarga con la pestaña Network abierta. Hay una petición a `entregables.json` y luego las seis fichas. Escribe en «Buscar»: no sale otra petición. `datos.ts` puede seguir en el proyecto; el hook ya no lo importa.

## Comprueba tu entendimiento

**Un estado imposible no entra**
En `public/entregables.json`, cambia un `"estado"` a `"listo"` y recarga. Mira la consola. Restaura `"rechazado"`.
→ La lista no se pinta y la consola muestra el error del guarda. Al restaurar el JSON y recargar, vuelven las seis.

## Reto

### 1 — any en la respuesta

Sustituye `const datos: unknown` por `const datos: any` y mira el editor. Si el proyecto no marca `any`, bórralo igual y deja `unknown`.

<details>
<summary>Ver solución</summary>

`any` apaga el guarda: `datos.every` ni siquiera exigiría `esEntregable`. El fichero se queda con `unknown` y con `esEntregable`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La lista sale al instante, sin petición | El reductor sigue en `useReducer(reducir, entregables)` | El estado inicial es `[]` y quien llena es `"cargar"` |
| Petición en cada letra | El efecto depende de `texto` o de `items` | El efecto de carga lleva `[]` |
