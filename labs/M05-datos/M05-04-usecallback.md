# M05-04 — useCallback

[← Página anterior](M05-03-memo.md) · [Siguiente página →](M05-05-caso.md)

> Práctica de [Qué mirar](../M04-rendimiento/01-que-mirar.md).

### Objetivo

Conseguir que una letra en el filtro no aumente el contador de una ficha que sigue en la lista.

### Prerrequisitos

- [M05-03](M05-03-memo.md): `console.count(item.id)` está dentro de `Tarjeta` y sube al teclear. `memo` envuelve el componente.

### En qué consiste

Dos estabilidades: la función y el objeto del contexto. El primer paso no basta. El experimento lo enseña antes de dar el segundo.

### 1 — Fijar marcar

**Dónde:** `useEntregables.ts`, donde está `function marcar`.

**Qué haces:**

1. Importa `useCallback`.
2. Sustituye la función por el callback.
3. Deja el array en `[]`.
4. Recarga, limpia la consola y escribe una letra en «Buscar».

```tsx
const marcar = useCallback((id: string) => {
  dispatch({ type: "marcar", id })
}, [])
```

**Experimento:** anota si los contadores siguen subiendo.

→ Pueden seguir. `alMarcar` ya es la misma función, pero `useContext` despierta la ficha si el valor del contexto es otro objeto. En `App`, `const sesion = { revisor }` nace en cada pintado. No borres `console.count`.

**Validación de este paso:**

- Problems vacío. `dispatch` no hace falta en el array: es estable.
- El botón sigue marcando. Pulsa una ficha pendiente y la pastilla cambia.
- Los contadores del filtro todavía no son la meta. Sigue el paso 2.

### 2 — Fijar la sesión

**Dónde:** `App.tsx`, el objeto que recibe el `Provider`.

**Qué haces:**

1. Sustituye `const sesion = { revisor }` por un `useMemo`.
2. El `Provider` sigue recibiendo `value={sesion}`.
3. Recarga, limpia la consola y escribe `E` en «Buscar».
4. Luego escribe en «Revisor».
5. Marca una ficha.
6. Quita `console.count`. Deja `memo`.

```tsx
const sesion = useMemo(() => ({ revisor }), [revisor])
```

**Experimento:** con los dos pasos hechos, escribe `E` en «Buscar» y mira los contadores de las fichas que siguen visibles.

→ No suben. Escribe en «Revisor»: ahí sí suben, porque el nombre cambió y las fichas tienen que pintar «Revisor: …». Marca una ficha: sube el contador de esa ficha, porque su `item` es otro objeto.

Segundo experimento: antes de quitar el `console.count`, añade `texto` al array de `useCallback` aunque `marcar` no lo use. Escribe en el filtro. Vacía el array y borra el count.

→ Con `[texto]`, `marcar` cambia en cada letra y los contadores vuelven. Con `[]`, paran. `texto` no pertenece a esa función.

**Validación:**

- `console.count` ya no está.
- `memo(Tarjeta)` se queda.
- `useCallback` de `marcar` depende de `[]`.
- `sesion` depende de `[revisor]`.
- `Este` sigue dejando solo el inventario.
- Problems vacío.

## Comprueba tu entendimiento

**El buscador no es un pintado de cada ficha**
Sin el `console.count`, escribe `Este`.
→ Solo queda el inventario. El filtro sigue siendo el `useMemo` de `visibles`. `memo` no sustituye al filtro: solo se salta el cuerpo de `Tarjeta` cuando sus props y el contexto no han cambiado.

## Reto

### 1 — Quitar solo el useMemo de la sesión

Deja `useCallback` y vuelve a `const sesion = { revisor }`. Pon otra vez `console.count` y escribe una letra. Restaura el `useMemo` y quita el count.

<details>
<summary>Ver solución</summary>

Los contadores vuelven a subir al teclear en «Buscar». La función fija no alcanza si el contexto entrega un objeto nuevo. Hacen falta los dos.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El contador sigue al teclear en Buscar | `sesion` no está en `useMemo`, o `marcar` no está en `useCallback` | Los dos pasos, y el `Provider` recibe ese `sesion` |
| `marcar` no marca | El callback no hace `dispatch` | `dispatch({ type: "marcar", id })` |
| El filtro se rompió | Metiste `texto` en el callback y lo dejaste | El array de `marcar` vuelve a `[]` |
