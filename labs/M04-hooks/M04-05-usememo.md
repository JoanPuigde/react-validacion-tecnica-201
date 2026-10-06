# M04-05 — useMemo

[← Página anterior](M04-04-contexto.md) · [Siguiente página →](M04-06-usereducer.md)

> Un paso. `visibles` se recalcula solo cuando cambian la lista o el texto. Si te dejas una dependencia, el filtro miente.

### Objetivo

Envolver el filtro en `useMemo` y ver qué pasa al quitar `texto` de las dependencias.

### Prerrequisitos

- [M04-04](M04-04-contexto.md): `visibles` es un `const` calculado en cada pintado.

### 1 — Memorizar el cálculo

**Qué agregamos:** sustituye el `const visibles = items.filter(...)` por esto.

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

**Con esto conseguimos:** el mismo array mientras `items` y `texto` no cambien. Con seis fichas no vas a notar velocidad. Lo que importa es el array de dependencias.

**Validar:** escribe `Este`. Sigue quedando solo el inventario. Borra y vuelven las seis.

### 2 — Quitar una dependencia y devolverla

**Qué agregamos:** deja el array en `[items]` un momento. Escribe en la caja.

**Con esto conseguimos:** ver el fallo. `texto` cambió y el cálculo no se repite. El editor, si tienes el aviso de dependencias, también lo señala.

**Validar:** la caja muestra lo que escribes y las fichas no se filtran. Vuelve a poner `[items, texto]`.

→ `Este` deja otra vez una sola ficha.

## Comprueba tu entendimiento

**Marcar sí cambia items**
Con las dos dependencias, filtra `Norte` y marca una ficha de las que se ven.
→ La pastilla cambia, porque `items` es dependencia y `visibles` se recalcula.

## Reto

### 1 — Memorizar el número de pendientes

`pendientes` puede salir de otro `useMemo` que dependa de `items`. El efecto sigue dependiendo de `[pendientes]`.

<details>
<summary>Ver solución</summary>

```tsx
const pendientes = useMemo(
  () => items.filter((item) => item.estado === "pendiente").length,
  [items],
)
```

Marca una ficha: la pestaña baja igual que antes. No aporta nada con seis elementos; el sitio donde sí duele olvidar una dependencia es el filtro del paso 2.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El filtro va retrasado o no va | Falta `texto` o `items` en el array | `[items, texto]` |
| `useMemo is not defined` | El import no lo incluye | Añádelo junto a `useState` |
