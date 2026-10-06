# M05-01 — La petición

[← Página anterior](README.md) · [Siguiente página →](M05-02-finales.md)

> Práctica de [La petición](../M03-apis-y-arquitectura/01-peticion.md).

### Objetivo

Cargar `/entregables.json` y aceptar la respuesta solo si cada elemento es un `Entregable`.

### Prerrequisitos

- [M04-07](../M04-hooks/M04-07-hook-propio.md): `useEntregables` empieza con el array de `datos.ts`. La pestaña dice «Pendientes: 3» al recargar.

### En qué consiste

Un guarda sobre `unknown` y una acción `"cargar"`. El experimento mete un estado que no existe en el JSON y mira la consola y la lista.

### 1 — El guarda

**Dónde:** archivo nuevo `bandeja/src/api/entregables.ts`. El hook no se toca en este paso.

**Qué haces:**

1. Crea las dos funciones y `cargarEntregables`.
2. Guarda.
3. Busca la palabra `any` en el archivo. No debe estar.

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

**Experimento:** cambia `const datos: unknown` por `const datos: any`. Mira Problems. Vuelve a `unknown`.

→ Con `any`, el `every` deja de exigir el guarda. El archivo del curso se queda en `unknown`. `Record<string, unknown>` no es `any`: cada campo se mira con `typeof`.

**Validación:**

- Problems vacío.
- La página sigue saliendo de `datos.ts`: este archivo todavía no se llama.
- No hay `any`.

### 2 — La acción y el efecto

**Dónde:** `useEntregables.ts`.

**Qué haces:**

1. Amplía `Accion` con `"cargar"`.
2. Añade el `case`.
3. El estado inicial del reductor pasa a `[]`.
4. Añade el efecto de carga con dependencias `[]`.
5. Quita el import de `datos.ts` si ya no se usa.
6. Recarga con la pestaña Network abierta.

```tsx
type Accion =
  | { type: "marcar"; id: string }
  | { type: "cargar"; items: Entregable[] }
```

```tsx
case "cargar":
  return accion.items
```

```tsx
const [items, dispatch] = useReducer(reducir, [])
```

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

**Experimento:** en `public/entregables.json`, cambia el `"estado"` de E-104 a `"listo"`. Recarga. Mira la consola y las fichas. Restaura `"rechazado"` y recarga.

→ Con `"listo"`, la lista no se pinta y la consola muestra el error del guarda. El archivo TypeScript sigue guardando: el fallo es de datos, no de compilación. Al restaurar, vuelven las seis fichas y Network muestra `entregables.json`.

Segundo experimento: pon el efecto en `[texto]` un momento, escribe una letra y mira Network. Devuelve `[]`.

→ Cada letra repetiría la petición. Con `[]`, escribir en «Buscar» no lanza otra.

**Validación:**

- Al recargar, Network tiene una petición a `entregables.json` y luego hay seis fichas.
- La pestaña acaba en «Pendientes: 3». Al principio puede decir 0, porque el estado inicial es `[]`.
- El hook ya no importa `datos.ts`.
- Problems vacío. El `catch` anota `unknown`, no `any`.

## Comprueba tu entendimiento

**Quién llena la lista**
El `useReducer` ya no recibe `entregables`.
→ Si la lista sale al instante y Network no pide el JSON, el estado inicial sigue siendo el array del fichero. Tiene que ser `[]` y quien la llena es `"cargar"`.

## Reto

### 1 — Un campo que no es string

En el JSON, pon `"id": 101` sin comillas en un objeto. Recarga. Restaura `"E-101"`.

<details>
<summary>Ver solución</summary>

`typeof candidato.id === "string"` falla, el `every` es falso y la consola muestra el error. La lista no aparece. Con el id otra vez entre comillas, vuelven las seis.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La lista sale al instante, sin petición | El reductor sigue en `useReducer(reducir, entregables)` | El estado inicial es `[]` y quien llena es `"cargar"` |
| Petición en cada letra | El efecto depende de `texto` o de `items` | El efecto de carga lleva `[]` |
| El JSON malo no se nota | El `catch` no hace `console.error` | El `catch` recibe `unknown` y lo escribe en la consola |
