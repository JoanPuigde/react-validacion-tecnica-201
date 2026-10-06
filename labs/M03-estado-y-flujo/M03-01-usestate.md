# M03-01 — useState

[← Página anterior](README.md) · [Siguiente página →](M03-02-derivado.md)

> Práctica de [Estado y valor derivado](../M02-estado-y-hooks/01-estado.md).

### Objetivo

Tener una caja cuyo texto es estado, y ver que una variable normal no sirve para lo mismo.

### Prerrequisitos

- [M02-05](../M02-props-lista-evento/M02-05-evento.md): `App` recorre `entregables` con `map`. El botón anota en la consola. `npm run dev` sigue en marcha.

### En qué consiste

El estado y el input, sin filtrar todavía. El experimento sustituye el estado por un `let` y lo deshace.

### 1 — Estado, etiqueta y caja

**Dónde:** `App.tsx`. El `useState` va dentro de la función, antes del `return`. El input va encima de la `<ul>`.

**Qué haces:**

1. Importa `useState` desde `react`.
2. Declara el estado en la primera línea del cuerpo de `App`.
3. Añade label e input.
4. Guarda y escribe en la caja.

```tsx
import { useState } from "react"

const [texto, setTexto] = useState("")
```

```tsx
<label htmlFor="filtro">Buscar</label>
<input
  id="filtro"
  value={texto}
  onChange={(evento) => setTexto(evento.target.value)}
/>
```

**Experimento:** escribe `Este`. Las seis fichas siguen: este paso no filtra. Borra con el teclado. La caja queda vacía.

Ahora sustituye el enlace de la caja, solo para probar:

```tsx
let copia = ""
```

`value={copia}` y `onChange={(evento) => { copia = evento.target.value }}`. Escribe una letra.

→ La caja no acumula lo escrito, o se vacía al pintar. React no se entera de un `let`. Restaura `value={texto}` y `setTexto(evento.target.value)`. Borra `copia` si el editor la marca.

Segundo experimento: crea `const [veces, setVeces] = useState(0)` y pon `value={veces}`.

→ Problems: `value` espera `string` y `veces` es `number`. No lo tapes con `any`. Borra `veces` y deja la caja en `texto`.

**Validación:**

- Escribes `Este`, lo lees en la caja y lo borras.
- Las seis fichas no cambian.
- `id="filtro"` está en el input. El label dice `htmlFor="filtro"`.
- Problems vacío. No queda `copia` ni `veces`.

## Comprueba tu entendimiento

**Los dos cables**
Quita solo el `onChange` y deja `value={texto}`. Intenta escribir. Restaura el `onChange`.

→ Con `value` y sin `onChange`, la caja no acepta letras: el estado manda y nadie lo actualiza. Con los dos, cada letra se ve.

## Reto

### 1 — Un valor inicial visible

Cambia `useState("")` por `useState("Norte")`. Recarga.

<details>
<summary>Ver solución</summary>

La caja abre con `Norte`. Las fichas siguen siendo seis. Devuelve `useState("")` para que el siguiente laboratorio empiece con la lista completa.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La caja no se edita | Falta `onChange` o no llama a `setTexto` | `setTexto(evento.target.value)` |
| `texto` no se usa | El input no tiene `value={texto}` | Enlaza `value` al estado |
| El hook está marcado | `useState` quedó después de un `return` | Va al principio de `App` |
