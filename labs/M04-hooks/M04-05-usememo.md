# M04-05 — useMemo

[← Página anterior](M04-04-contexto.md) · [Siguiente página →](M04-06-usereducer.md)

> Práctica de [Qué mirar](../M04-rendimiento/01-que-mirar.md).

### Objetivo

Envolver el filtro en `useMemo` y ver qué pasa al quitar `texto` de las dependencias.

### Prerrequisitos

- [M04-04](M04-04-contexto.md): `visibles` se calcula en cada pintado a partir de `items` y `texto`. Las fichas muestran el revisor.

### En qué consiste

El mismo filtro, con dependencias. El experimento miente en el array y luego lo corrige. No se busca que la página vaya más rápida.

### 1 — Memorizar el cálculo

**Dónde:** `App.tsx`. Sustituye el `const visibles = items.filter(...)`.

**Qué haces:**

1. Añade `useMemo` al import.
2. Envuelve el filtro.
3. Deja las dependencias en `[items, texto]`.
4. Guarda y escribe `Este`.

```tsx
import { useEffect, useMemo, useRef, useState } from "react"

const visibles = useMemo(
  () =>
    items.filter((item) => {
      const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
      return blob.includes(texto.toLowerCase())
    }),
  [items, texto],
)
```

**Experimento:** escribe `Este`, borra, escribe `zzzz` y vacía.

→ Con `Este`, el inventario. Al borrar, seis. Con `zzzz`, «Ningún entregable coincide.». El resultado es el mismo que con el `const` de antes.

**Validación:**

- Problems vacío. Si el editor avisa de una dependencia que falta, el array no es `[items, texto]`.
- `visibles` se usa en el aviso y en el `map`.

### 2 — Quitar una dependencia y devolverla

**Dónde:** el array del `useMemo`, solo un momento.

**Qué haces:**

1. Déjalo en `[items]`.
2. Guarda, recarga y escribe en la caja.
3. Anota si las fichas se mueven.
4. Vuelve a `[items, texto]`.
5. Recarga y escribe `Este`.

**Experimento:** con `[items]`, la caja muestra las letras y las fichas no se filtran. El aviso del editor, si está activo, señala que `texto` se usa y no está en el array.

→ Al restaurar `[items, texto]`, `Este` deja otra vez una sola ficha.

Segundo experimento: deja `[texto]` y quita `items`. Filtra `Norte` y marca una ficha visible.

→ La pastilla puede no cambiar, porque `items` ya no despierta el cálculo. Restaura las dos dependencias y marca otra vez: la pastilla pasa a `revisado`.

**Validación:**

- El array final es `[items, texto]`.
- `Este` deja el inventario.
- Marcar una ficha visible cambia su pastilla.
- El input del revisor sigue en «Ana» o en lo que hayas escrito.

## Comprueba tu entendimiento

**useMemo no filtra solo**
El `return` del callback sigue siendo el `filter`.
→ Si borras el `filter` y devuelves `items` siempre, `Este` deja de funcionar aunque las dependencias estén bien. El cálculo y el array son las dos piezas.

## Reto

### 1 — Memorizar el número de pendientes

`pendientes` puede salir de otro `useMemo` que dependa de `[items]`. El efecto del título sigue en `[pendientes]`.

<details>
<summary>Ver solución</summary>

```tsx
const pendientes = useMemo(
  () => items.filter((item) => item.estado === "pendiente").length,
  [items],
)
```

Marca una ficha: la pestaña baja igual que antes. Con seis elementos no se nota velocidad. El sitio donde duele olvidar una dependencia es el filtro del paso 2.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El filtro no responde al teclear | Falta `texto` en el array | `[items, texto]` |
| La pastilla no cambia al marcar | Falta `items` en el array | Las dos dependencias |
| `useMemo is not defined` | El import no lo incluye | Añádelo junto a `useState` |
