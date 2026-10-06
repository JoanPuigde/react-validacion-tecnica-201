# Estado y valor derivado

[← Página anterior](README.md) · [Siguiente página →](02-flujo.md)

Una variable normal dentro de `App` se pierde en el siguiente pintado y, aunque se cambie, React no vuelve a pintar. El estado es un valor que React recuerda. Al pedir el siguiente con la función de `useState`, React vuelve a llamar al componente.

```tsx
const [texto, setTexto] = useState("")
```

`texto` es el valor de ahora. El tipo sale del inicial: `""` hace que sea `string`. `setTexto` pide el siguiente. No se muta un array a mano (`items.push(...)`): se entrega un array nuevo. Si no, React no ve el cambio.

La caja queda atada a ese estado. `value` muestra `texto`. `onChange` llama a `setTexto` con `evento.target.value`. El evento del input llega tipado por la prop. No hace falta `any`.

Lo que se puede calcular no se guarda. `visibles` es la lista filtrada a partir de `items` y de `texto`. Es un valor derivado. Meterlo en otro `useState` deja dos verdades: la caja cambia y las fichas no, porque nadie actualiza ese segundo estado.

```tsx
const visibles = items.filter((item) => {
  const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
  return blob.includes(texto.toLowerCase())
})
```

El array original no se vacía al filtrar. Vacío de coincidencias es `visibles.length === 0`, y la frase es «Ningún entregable coincide.».

| | Presentación | Estado |
|--|----------------|--------|
| Dónde vive | `Tarjeta.tsx` | `App.tsx` en este módulo |
| Qué sabe | Cómo se ve una ficha | Cuál es la lista y qué hay escrito en el filtro |
| Qué no hace | Decidir si el entregable sigue pendiente | Elegir colores o márgenes |

## Demostración guiada

Punto de partida: `App.tsx` importa `entregables` de `datos.ts` y los recorre con `map`. Seis fichas. El botón anota en la consola. No hay input.

### 1 — La caja que React recuerda

Dentro de `App`, antes del `return`, `const [texto, setTexto] = useState("")`. El import es `import { useState } from "react"`. Encima de la `<ul>`:

```tsx
<label htmlFor="filtro">Buscar</label>
<input
  id="filtro"
  value={texto}
  onChange={(evento) => setTexto(evento.target.value)}
/>
```

Se escribe `Este`. Las seis fichas siguen: este paso no filtra. La caja muestra `Este`. Borrar con el teclado la deja vacía. El `map` todavía recorre `entregables`.

### 2 — El let no pinta

Se sustituye el estado, solo para verlo, por `let copia = ""` y el input pasa a `value={copia}` con `onChange` que hace `copia = evento.target.value`. Al teclear, la caja no acumula letras: React no vuelve a llamar a `App`. Se restaura `useState`, `value={texto}` y `setTexto`. La caja vuelve a guardar lo escrito.

### 3 — Lo visible se calcula

Justo después del `useState`:

```tsx
const visibles = entregables.filter((item) => {
  const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
  return blob.includes(texto.toLowerCase())
})
```

El `map` pasa a recorrer `visibles`. Encima de la lista, `{visibles.length === 0 ? <p>Ningún entregable coincide.</p> : null}`.

`Este` deja una ficha: «Inventario de componentes» (E-104, proveedor Este). Borrar el texto devuelve las seis. `zzzz` deja la frase y ninguna ficha. `datos.ts` no se ha tocado: siguen seis objetos. `Norte` deja E-101 y E-103.

Dónde queda: la caja controlada y la lista filtrada. El botón sigue escribiendo en la consola. La pastilla no cambia. Eso es la página de flujo.

## Práctica

[M03-01 — useState](../M03-estado-y-flujo/M03-01-usestate.md) y [M03-02 — El derivado](../M03-estado-y-flujo/M03-02-derivado.md).
