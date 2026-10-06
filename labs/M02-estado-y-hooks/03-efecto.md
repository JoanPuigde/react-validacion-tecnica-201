# useEffect y las reglas

[← Página anterior](02-flujo.md) · [Siguiente página →](../M03-apis-y-arquitectura/README.md)

`useEffect` corre después de pintar, y otra vez cuando cambian las dependencias que se declaran. Sirve para hablar con algo de fuera de React: el título de la pestaña, un temporizador, una petición. No sirve para calcular datos que ya se pueden calcular mientras se pinta. `visibles` sigue siendo un `const`.

```tsx
const pendientes = items.filter((item) => item.estado === "pendiente").length

useEffect(() => {
  document.title = `Pendientes: ${pendientes}`
}, [pendientes])
```

El array es el contrato. Vacío (`[]`) significa «solo al montar». Si `pendientes` cambia y no está en el array, el título se queda con el primer número. Filtrar no cambia ese número. Marcar un pendiente, sí.

La función que se devuelve del efecto es la limpieza. React la llama antes de repetir el efecto y al desmontar. En una petición, esa limpieza evita guardar la respuesta si el componente ya no está.

> [!WARNING]
> Un efecto sin array corre en cada pintado. Un efecto con `[]` que lee un estado se queda con el valor del primer pintado.

Los hooks se llaman en el mismo orden en cada pintado, al principio de la función, nunca debajo de un `return` condicional, ni dentro de un `if`, ni dentro del `map`. Si un `useState` aparece solo cuando el texto pasa de dos letras, React ve menos hooks que en el pintado anterior y la pantalla rompe. El arreglo es devolver ese hook arriba y borrar el atajo.

## Demostración guiada

Punto de partida: `items` en `useState`, el filtro sobre `items`, `marcar` cambia una ficha. Al recargar, pendientes de verdad: E-101, E-103 y E-105. La pestaña muestra el título que trae `index.html`, no un número.

### 1 — El número va a la pestaña

El import pasa a `import { useEffect, useState } from "react"`. `pendientes` se calcula de `items`, no de `visibles`:

```tsx
const pendientes = items.filter((item) => item.estado === "pendiente").length

useEffect(() => {
  document.title = `Pendientes: ${pendientes}`
}, [pendientes])
```

La pestaña del navegador dice «Pendientes: 3». El `<h1>` no se mueve. Escribir `Sur` deja dos fichas (E-102 y E-106, las dos ya revisadas) y la pestaña sigue en 3: filtrar no cambia `pendientes`. Marcar E-101 la baja a 2. Recargar vuelve a 3.

### 2 — El array vacío se queda con el primer número

Se cambia la dependencia a `[]`. Se recarga: «Pendientes: 3». Marcar E-101 cambia la pastilla y la pestaña se queda en 3. Se restituye `[pendientes]`. Marcar baja el título junto con la pastilla.

Un efecto sin array (se borra el segundo argumento) corre en cada letra del buscador. Con la lista corta no se nota en el título, porque el número no cambió. Se deja `[pendientes]`.

### 3 — Un hook debajo de un return

Justo antes del `return` que pinta la página, solo para ver el fallo. `setExtra` puede quedar marcado como no usado: forma parte del experimento.

```tsx
if (texto.length > 2) {
  return <p>Demasiado texto {extra}</p>
}

const [extra, setExtra] = useState(0)
```

Se escribe despacio en la caja: `E`, luego `Es`. La bandeja sigue. La tercera letra (`Est`) falla: la consola dice que se renderizaron menos hooks que en el pintado anterior, o Problems marca el hook después del `return`.

Se borra el `if` y se borran `extra` y `setExtra`. `texto`, `items` y el efecto siguen al principio de `App`, antes de cualquier `return`. Se recarga. Escribir `Este` deja el inventario, sin error de hooks, y la pestaña vuelve a «Pendientes: 3».

Dentro del `map`, antes del `<li>`, un `useState(item.id)` también lo rechaza el editor: el hook no puede estar en un callback. Se borra esa línea.

Dónde queda: buscador, pastilla que cambia, pestaña «Pendientes: 3» al recargar. La lista sigue naciendo de `datos.ts`. La petición, en el módulo siguiente, sustituye ese origen.

## Práctica

[M03-04 — useEffect](../M03-estado-y-flujo/M03-04-useeffect.md) y [M03-05 — Las reglas](../M03-estado-y-flujo/M03-05-reglas.md).
