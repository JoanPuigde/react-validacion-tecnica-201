# M04-07 — El hook propio

[← Página anterior](M04-06-usereducer.md) · [Siguiente página →](../M05-datos/M05-01-fetch.md)

> Práctica de [Estructura](../M03-apis-y-arquitectura/02-estructura.md).

### Objetivo

Sacar la lista, el reductor y el efecto del título a `useEntregables`, y dejar el filtro en `App`.

### Prerrequisitos

- [M04-06](M04-06-usereducer.md): `useReducer`, `marcar` y el efecto de `pendientes` están en `App.tsx`. El botón sigue marcando.

### En qué consiste

Mover, no reescribir. El experimento deja el reductor en los dos sitios para ver dos listas, y luego deja uno solo.

### 1 — El archivo del hook

**Dónde:** archivo nuevo `bandeja/src/hooks/useEntregables.ts`. Copia allí `Accion`, `reducir`, el `useReducer`, `marcar`, `pendientes` y el `useEffect` del título. `App.tsx` todavía no se borra: primero tiene que existir el hook.

**Qué haces:**

1. Crea la función y mueve ese código.
2. Empieza con `entregables` de `datos.ts`.
3. Devuelve `{ items, marcar }`.
4. Guarda. Si `App` sigue con su copia, la página todavía usa la copia vieja.

```tsx
export function useEntregables() {
  const [items, dispatch] = useReducer(reducir, entregables)
  const pendientes = items.filter((item) => item.estado === "pendiente").length

  useEffect(() => {
    document.title = `Pendientes: ${pendientes}`
  }, [pendientes])

  function marcar(id: string): void {
    dispatch({ type: "marcar", id })
  }

  return { items, marcar }
}
```

`Accion` y `reducir` viven en este archivo, fuera de la función. Los hooks van al principio de `useEntregables`, antes de cualquier `return`.

**Experimento:** mete el `useReducer` debajo de un `if (false) return { items: [], marcar }`. Guarda.

→ Problems marca el hook en una rama. Sácalo del `if` y borra ese `return`. Un hook propio cumple las mismas reglas que `App`.

**Validación:**

- El archivo guarda.
- La página, si aún no importas el hook, se comporta como en el laboratorio anterior.

### 2 — Una sola lista

**Dónde:** `App.tsx`.

**Qué haces:**

1. Importa `useEntregables`.
2. Sustituye el reductor, `marcar`, `pendientes` y el efecto del título por `const { items, marcar } = useEntregables()`.
3. Borra `Accion` y `reducir` de `App` si se quedaron allí.
4. Deja en `App` el `texto`, `visibles`, la ref, el revisor y el contexto.
5. Guarda y recarga.

```tsx
const { items, marcar } = useEntregables()
```

**Experimento:** no borres el `useReducer` de `App` y llama también al hook. Si desestructuras dos veces el nombre `items`, el archivo no guarda. Cuando lo arregles dejando solo la llamada al hook, recarga.

→ Una sola fuente. La pestaña dice «Pendientes: 3». Escribe `Oeste`: queda «Plan de pruebas». Márcalo. La pastilla pasa a `revisado` y la pestaña a «Pendientes: 2». Busca la palabra `useReducer` en `App.tsx`: no está.

**Validación:**

- Problems vacío.
- `App.tsx` no contiene `useReducer` ni `document.title`.
- El buscador sigue en la página. El hook no recibe `texto`.
- «Ir al buscador» y el input «Revisor» siguen.

## Comprueba tu entendimiento

**Qué se quedó en App**
`visibles` sigue declarado en `App` y depende de `items` y `texto`.
→ El filtro no se fue con el hook. Si `Este` deja de filtrar, `visibles` está usando otra lista o perdió `texto` en las dependencias.

## Reto

### 1 — Devolver de más

Haz que el hook devuelva también `dispatch`. Desestructúralo en `App` y no lo uses.

<details>
<summary>Ver solución</summary>

`noUnusedLocals` marca `dispatch` en `App`. No lo desestructuras. El único modo de cambiar la lista desde la pantalla es `marcar`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La pestaña deja de actualizarse | El efecto se quedó en `App` y `pendientes` ya no existe allí | El efecto vive dentro del hook, con `[pendientes]` |
| Dos listas o nombres repetidos | `useReducer` sigue en `App` y también en el hook | Un solo reductor, el del hook |
| `texto` no llega al hook y parece un fallo | El filtro es de `App` | `useEntregables` no recibe `texto`; `visibles` sí lo usa |
