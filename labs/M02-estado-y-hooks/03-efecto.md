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

La pestaña pasa a «Pendientes: 3». Escribir `Sur` deja dos fichas y la pestaña sigue en 3. Marcar E-101 la baja a 2. Con el array de dependencias vacío, se queda en 3 aunque la pastilla cambie. Al restituir `[pendientes]`, el título acompaña a la pastilla.

Un `if` que hace `return` antes de un `useState` nuevo aguanta las dos primeras letras y falla en la tercera. Al quitar ese `if`, el filtro vuelve a responder y la consola deja de hablar de hooks.

## Práctica

[M03-04 — useEffect](../M03-estado-y-flujo/M03-04-useeffect.md) y [M03-05 — Las reglas](../M03-estado-y-flujo/M03-05-reglas.md).
