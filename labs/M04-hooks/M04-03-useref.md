# M04-03 — useRef

[← Página anterior](M04-02-fragmento.md) · [Siguiente página →](M04-04-contexto.md)

> Práctica de [useEffect y las reglas](../M02-estado-y-hooks/03-efecto.md).

### Objetivo

Pulsar «Ir al buscador» y dejar el cursor en `#filtro`, sin guardar el nodo en un estado.

### Prerrequisitos

- [M04-02](M04-02-fragmento.md): el input `#filtro` sigue controlado por `texto`. `Marco` ya no pinta un `<section>`.

### En qué consiste

Una ref tipada y un botón. El experimento quita el `?.`, prueba el foco y comprueba que el filtro sigue siendo el mismo input.

### 1 — La referencia

**Dónde:** `App.tsx`. El `useRef` va con el resto de hooks, antes del `return`. El `ref` va en el input que ya tiene `id="filtro"`.

**Qué haces:**

1. Añade `useRef` al import.
2. Declara `campo`.
3. Añade `ref={campo}` al input. No cambies `value` ni `onChange`.
4. Guarda. No añadas el botón todavía.

```tsx
import { useEffect, useRef, useState } from "react"

const campo = useRef<HTMLInputElement>(null)
```

**Experimento:** escribe `useRef(null)` sin el genérico y guarda.

→ El editor se queja al usar luego `.focus()`, o trata `current` de un modo que no es un input. Restaura `useRef<HTMLInputElement>(null)`. La página no cambia: una ref no pinta nada por sí sola.

**Validación:**

- El input sigue con `id="filtro"`, `value={texto}` y `onChange`.
- Problems vacío.
- Escribir en la caja sigue filtrando.

### 2 — El botón

**Dónde:** `App.tsx`, la función junto a los hooks y el botón junto al input.

**Qué haces:**

1. Declara `irAlCampo`.
2. Añade el botón.
3. Guarda.
4. Pulsa fuera de la caja y luego el botón.

```tsx
function irAlCampo(): void {
  campo.current?.focus()
}
```

```tsx
<button type="button" onClick={irAlCampo}>
  Ir al buscador
</button>
```

**Experimento:** quita el `?.` y escribe `campo.current.focus()`. Lee Problems. Restaura `campo.current?.focus()`.

→ Problems avisa de que `current` puede ser `null`. Con `?.`, el archivo guarda.

Segundo experimento: pulsa «Ir al buscador» y escribe `Este` sin volver a pinchar la caja.

→ El cursor ya estaba en «Buscar» y queda una ficha, el inventario. Es el mismo input. Si el foco no entra, `ref={campo}` está en otro elemento.

**Validación:**

- El botón dice «Ir al buscador».
- Tras pulsarlo, el cursor está en `#filtro`.
- Una letra sigue filtrando.
- Problems vacío. No hay `any`.

## Comprueba tu entendimiento

**La ref no es el estado del texto**
`value` sigue siendo `{texto}`.
→ Borrar la ref no vacía la caja. Quitar `value={texto}` sí rompe el control del input. La ref solo apunta al nodo.

## Reto

### 1 — Leer el valor desde la ref

En `irAlCampo`, haz `console.log(campo.current?.value)` además del foco. Escribe `Este` y pulsa el botón. Quita el `console.log` al acabar.

<details>
<summary>Ver solución</summary>

La consola muestra `Este`, el mismo texto que `texto`. La ref lee el DOM. El estado sigue mandando en `value`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El botón no enfoca | `ref` está en otro input, o no llamas a `focus` | `ref={campo}` en `#filtro` y `campo.current?.focus()` |
| `current` no encaja con `focus` | Falta el genérico | `useRef<HTMLInputElement>(null)` |
| El filtro deja de ir | Cambiaste `value` al añadir `ref` | `value={texto}` se queda |
