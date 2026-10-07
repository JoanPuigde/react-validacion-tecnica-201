# J03-11 — Antipatrones

[← Página anterior](J03-10-reutilizable.md) · [Siguiente página →](../J04-rendimiento/README.md)

> Laboratorio de [Antipatrones](README.md).

### Objetivo

Provocar tres fallos de arquitectura, leerlos y dejar el código como estaba.

### Código de partida

La lista llega por `useEntregables`. `marcar` copia el objeto con `{ ...item, estado: "revisado" }`. `visibles` es un `const` calculado en `App`. Si tu archivo no es ese, el hook está entero en [J03-08](J03-08-estructura.md).

### En qué consiste

Tres experimentos. Ninguno se queda.

### 1 — Mutar el mismo objeto

**Dónde:** `marcar`, dentro de `useEntregables.ts`.

**Qué haces:**

1. Sustituye el cuerpo por una mutación.
2. Recarga y pulsa «Anotar E-103».
3. Restaura el `map`.

```tsx
function marcar(id: string): void {
  setItems((lista) => {
    lista.forEach((item) => {
      if (item.id === id) item.estado = "revisado"
    })
    return lista
  })
}
```

**Experimento:** mira la pastilla de E-103.

→ Si no cambia, React ha recibido el mismo array. Restaura:

```tsx
function marcar(id: string): void {
  setItems((lista) =>
    lista.map((item) =>
      item.id === id ? { ...item, estado: "revisado" } : item,
    ),
  )
}
```

Pulsa otra vez. La pastilla pasa a `revisado`.

### 2 — Dos verdades para el filtro

**Dónde:** `App.tsx`, el cálculo de `visibles`.

**Qué haces:**

1. Guárdalo en un estado que solo se rellena una vez.
2. Escribe `Este`.
3. Vuelve al `const` calculado.

```tsx
const [visibles] = useState(items)
```

**Experimento:** la caja muestra `Este` y las fichas no se mueven, o se mueven solo en el primer pintado.

→ Hay dos datos: el texto y una lista que nadie actualiza. Borra ese `useState`. `visibles` vuelve a ser el `filter` de `items` y `texto`. `Este` deja «Inventario de componentes».

### 3 — any en el guarda

**Dónde:** `api/entregables.ts`, la línea `const datos: unknown`.

**Qué haces:**

1. Cámbiala a `any`.
2. En el JSON, E-104 pasa a `"listo"`.
3. Recarga.
4. Restaura `unknown` y `"rechazado"`.

→ Con `any`, el `every` deja de proteger y `"listo"` puede colar. Con `unknown`, la lista se rechaza. Al restaurar, vuelven las seis.

**Validación:**

- `marcar` copia el objeto.
- `visibles` no es un estado.
- No queda `any`.
- Problems vacío.

## Comprueba tu entendimiento

**El síntoma de cada uno**
Mutar no repinta, el estado duplicado no filtra, `any` no avisa.
→ Son tres sitios distintos: el hook, `App` y `api/entregables.ts`.

## Reto

### 1 — El efecto que copia el filtro

Calcula `visibles` con un `useEffect` que haga `setVisibles`. Escribe una letra. Quita ese efecto.

<details>
<summary>Ver solución</summary>

La lista va un pintado por detrás de la caja, o pide otra vuelta. El filtro se calcula mientras se pinta. El efecto y el estado sobrante se borran.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La pastilla no vuelve | La mutación sigue en `marcar` | Restaura el `map` con `{ ...item, estado: "revisado" }` |
| El filtro sigue muerto | Quedó `useState(items)` | `const visibles = items.filter(...)` |
| `"listo"` entra | `datos` sigue en `any` | `const datos: unknown` |
