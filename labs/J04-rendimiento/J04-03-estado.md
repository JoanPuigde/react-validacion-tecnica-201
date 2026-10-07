# J04-03 — Estado y referencias

[← Página anterior](J04-02-rerender.md) · [Siguiente página →](J04-04-lazy.md)

> Laboratorio de [Gestión del estado](README.md).

### Objetivo

Ver que un `useMemo` sin `texto` miente, y que el array nuevo de `marcar` es el que permite pintar.

### Código de partida

`visibles` es un `const` calculado con `items` y `texto`. `marcar` copia el objeto. Si el filtro no está, pega el `App` de [J02-02](../J02-estado/J02-02-usestate.md).

### 1 — La dependencia

**Dónde:** el cálculo de `visibles`.

**Qué haces:**

1. Envuélvelo en `useMemo` con `[items, texto]`. Escribe `Norte`.
2. Deja el array en `[items]`. Recarga y escribe.
3. Devuelve `[items, texto]`.

```tsx
const visibles = useMemo(
  () =>
    items.filter((item) => {
      const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
      return blob.includes(texto.toLowerCase())
    }),
  [items, texto],
)
```

**Experimento:** con `[items]`, la caja escribe y las fichas no se filtran. Si el editor avisa, señala que `texto` se usa y no está en el array.

→ Al restituir `texto`, `Norte` vuelve a filtrar. En seis fichas no hay una ganancia que contar. El `useMemo` sirvió para ver la dependencia rota.

**Validación:**

- Las dependencias son `[items, texto]`.
- `marcar` sigue creando un objeto nuevo.
- Problems vacío.

## Comprueba tu entendimiento

**Qué no acelera**
El filtro con `[items, texto]` se ve igual que el `const`.
→ No se celebra el `useMemo` en esta lista. Se sabe por qué estaba la dependencia.

## Reto

### 1 — Mutar otra vez

En `marcar`, devuelve el mismo array mutado. Pulsa una ficha. Restaura el `map`.

<details>
<summary>Ver solución</summary>

La pastilla puede no cambiar: la referencia del array es la misma. El `map` con `{ ...item }` entrega un objeto nuevo y la pastilla cambia.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El filtro no vuelve | El array se quedó en `[items]` | `[items, texto]` |
| `useMemo` no está definido | Falta en el import de `App` | Añádelo junto a `useState` |
