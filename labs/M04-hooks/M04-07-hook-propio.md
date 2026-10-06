# M04-07 — El hook propio

[← Página anterior](M04-06-usereducer.md) · [Siguiente página →](../M05-datos/README.md)

> Un paso. La lista, el reductor y el efecto del título salen de `App`. El filtro se queda.

### Objetivo

Llamar a `useEntregables()` y seguir filtrando y marcando igual.

### Prerrequisitos

- [M04-06](M04-06-usereducer.md): `useReducer`, `marcar` y el efecto de `pendientes` están en `App.tsx`.

### 1 — Mover, no reescribir

**Qué agregamos:** `bandeja/src/hooks/useEntregables.ts`. Lleva allí `Accion`, `reducir`, el `useReducer`, `marcar`, `pendientes` y el `useEffect` del título. Empieza con `entregables` de `datos.ts`, como ahora.

```tsx
export function useEntregables() {
  const [items, dispatch] = useReducer(reducir, entregables)
  // pendientes, efecto y marcar, los mismos que ya tenías
  return { items, marcar }
}
```

En `App.tsx` borra eso y deja:

```tsx
const { items, marcar } = useEntregables()
```

`texto`, `visibles`, la ref y el contexto siguen en `App`.

**Con esto conseguimos:** `App` pinta. El hook guarda la lista. Un hook propio también cumple las reglas: sus `useReducer` y `useEffect` van al principio de `useEntregables`, no dentro de un `if`.

**Validar:** recarga. La pestaña dice «Pendientes: 3». Escribe `Oeste`: queda el plan de pruebas. Márcalo.

→ La pastilla pasa a `revisado` y la pestaña a «Pendientes: 2». En `App.tsx` ya no está la palabra `useReducer`.

## Comprueba tu entendimiento

**El filtro no se fue con el hook**
`visibles` sigue declarado en `App` y depende de `items` y `texto`.
→ El buscador sigue en la página. El hook no recibe `texto`.

## Reto

### 1 — Devolver de más

Haz que el hook devuelva también `dispatch`. No lo uses en `App`.

<details>
<summary>Ver solución</summary>

`noUnusedLocals` marca `dispatch` en `App` si lo desestructuras y no lo llamas. No lo desestructuras. El único modo de cambiar la lista desde la pantalla es `marcar`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La pestaña deja de actualizarse | El efecto se quedó en `App` y `pendientes` ya no existe allí | El efecto vive dentro del hook, con `[pendientes]` |
| Dos listas | `useReducer` sigue en `App` y también en el hook | Un solo reductor, el del hook |
