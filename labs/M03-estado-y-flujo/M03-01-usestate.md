# M03-01 — useState

[← Página anterior](README.md) · [Siguiente página →](M03-02-derivado.md)

> Un paso. El texto de la caja vive en el estado y la caja lo muestra.

### Objetivo

Tener un input cuyo valor es `texto` y cuyo cambio llama a `setTexto`.

### Prerrequisitos

- [M02-05](../M02-props-lista-evento/M02-05-evento.md): `App` hace el `map` de `entregables`.

### 1 — El estado y la caja

**Qué agregamos:** en `App.tsx`, el import y el estado al principio de la función, antes del `return`.

```tsx
import { useState } from "react"

const [texto, setTexto] = useState("")
```

Encima de la lista:

```tsx
<label htmlFor="filtro">Buscar</label>
<input
  id="filtro"
  value={texto}
  onChange={(evento) => setTexto(evento.target.value)}
/>
```

**Con esto conseguimos:** `texto` es `string` porque el estado inicial es `""`. `evento` es `ChangeEvent<HTMLInputElement>` sin anotarlo: lo infiere `onChange`. La lista todavía no mira `texto`.

**Validar:** escribe `Este` en la caja. Las seis fichas siguen. Borra la caja con el teclado: queda vacía. Si la caja no deja de borrar o no acepta letras, `value` y `onChange` no están los dos.

## Comprueba tu entendimiento

**No es una variable suelta**
Debajo de `useState`, declara `let copia = ""` y enlaza el input a `copia` con `value={copia}` y un `onChange` que haga `copia = evento.target.value`. Prueba a escribir. Restaura `texto` y `setTexto`.
→ Con `let`, la caja no acumula lo escrito: React no vuelve a pintar. Con `useState`, cada letra se ve.

## Reto

### 1 — Un estado numérico que no encaja en el input

Crea `const [veces, setVeces] = useState(0)` y pon `value={veces}` en el input.

<details>
<summary>Ver solución</summary>

El editor marca `value`: espera `string` y `veces` es `number`. No lo tapes con `any`. Borra `veces` si no lo usas, y deja el input en `texto`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La caja no se edita | Falta `onChange` o no llama a `setTexto` | `onChange={(evento) => setTexto(evento.target.value)}` |
| `texto` no se usa | El input no tiene `value={texto}` | Enlaza `value` al estado |
