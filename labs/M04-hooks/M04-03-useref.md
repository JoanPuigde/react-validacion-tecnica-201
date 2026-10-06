# M04-03 — useRef

[← Página anterior](M04-02-fragmento.md) · [Siguiente página →](M04-04-contexto.md)

> Un paso. Una referencia al input, para enfocarlo sin guardar el nodo en el estado.

### Objetivo

Pulsar «Ir al buscador» y dejar el cursor en `#filtro`.

### Prerrequisitos

- [M04-02](M04-02-fragmento.md): el input `#filtro` sigue en `App`.

### 1 — La referencia y el botón

**Qué agregamos:** en `App.tsx`.

```tsx
import { useEffect, useRef, useState } from "react"

const campo = useRef<HTMLInputElement>(null)
```

En el input que ya tienes, añade la prop `ref={campo}`. No cambies `value` ni `onChange`.

```tsx
function irAlCampo(): void {
  campo.current?.focus()
}
```

Un botón junto al input:

```tsx
<button type="button" onClick={irAlCampo}>
  Ir al buscador
</button>
```

**Con esto conseguimos:** `campo.current` es el input o `null` antes de pintar. `useRef` no provoca un pintado nuevo al cambiar `.current`. El genérico `HTMLInputElement` evita `any`.

**Validar:** pulsa dentro de la página, fuera de la caja, y luego «Ir al buscador».

→ El cursor queda en «Buscar». Escribe una letra: el filtro responde, así que es el mismo input de siempre.

## Comprueba tu entendimiento

**current puede ser null**
Quita el `?.` y escribe `campo.current.focus()`.
→ El editor avisa de que `current` puede ser `null`. Restaura `campo.current?.focus()`.

## Reto

### 1 — Leer el valor desde la ref

En `irAlCampo`, haz `console.log(campo.current?.value)` además del foco. Escribe `Este` y pulsa el botón.

<details>
<summary>Ver solución</summary>

La consola muestra `Este`, el mismo texto que `texto`. La ref lee el DOM. El estado sigue siendo quien manda en `value`. Quita el `console.log` al terminar.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El botón no enfoca | `ref` está en otro input, o no llamas a `focus` | `ref={campo}` en `#filtro` y `campo.current?.focus()` |
| `useRef` sin tipo y `current` es `null` para siempre en el editor | Falta el genérico | `useRef<HTMLInputElement>(null)` |
