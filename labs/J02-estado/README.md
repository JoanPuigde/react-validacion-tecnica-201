# Jornada 2 — Estado, hooks y flujo de datos

[← Página anterior](../J01-fundamentos/J01-07-eventos.md) · [Siguiente página →](J02-01-state.md)

La lista deja de ser un dibujo fijo. La caja, la pastilla y el título de la pestaña viven en memoria de React. La ficha avisa. El padre, o un hook, guarda.

## State

Una variable normal dentro de `App` se pierde en el siguiente pintado. Aunque se cambie, React no vuelve a llamar al componente. El estado es un valor que React recuerda. Al pedir el siguiente, React vuelve a ejecutar la función.

No se muta el array a mano (`items.push`). Se entrega un array nuevo. Si no, React puede no ver el cambio.

### Demostración

1. La bandeja muestra las seis fichas y la caja «Buscar». El texto de la caja sobrevive a borrar y a volver a escribir: es estado.
2. Se sustituye, solo para verlo, el `useState` de la caja por `let copia = ""` y el input por `value={copia}`. Al teclear, la caja no acumula letras.
3. Se restaura `useState`. La caja vuelve a guardar lo escrito.
4. En `marcar`, una mutación `item.estado = "revisado"` que devuelve el mismo array a veces no cambia la pastilla. El `map` que copia el objeto sí la cambia. Se deja el `map`.

→ Laboratorio: [J02-01 — State](J02-01-state.md).

## useState

`const [texto, setTexto] = useState("")`. `texto` es el valor de ahora. El tipo sale del inicial: `""` hace que sea `string`. `setTexto` pide el siguiente.

La caja queda atada. `value` muestra `texto`. `onChange` llama a `setTexto` con `evento.target.value`.

Lo que se puede calcular no se guarda. `visibles` es la lista filtrada a partir de `items` y de `texto`. Meterla en otro `useState` deja dos verdades.

### Demostración

1. `Este` en «Buscar» deja «Inventario de componentes». También puede quedar «Plan de pruebas»: «Oeste» contiene esas letras. Borrar el texto devuelve las seis.
2. `zzzz` muestra «Ningún entregable coincide.». `datos.ts` sigue con seis objetos.
3. `Norte` deja las fichas de ese proveedor.
4. El `map` recorre `visibles`, no el array original. El array original no se vacía.

→ Laboratorio: [J02-02 — useState](J02-02-usestate.md).

## useEffect

`useEffect` corre después de pintar, y otra vez cuando cambian las dependencias. Sirve para hablar con algo de fuera de React: el título de la pestaña, un temporizador, una petición. No sirve para calcular `visibles`. Eso sigue siendo un `const`.

El array es el contrato. `[]` significa «solo al montar». Si `pendientes` cambia y no está en el array, el título se queda con el primer número.

### Demostración

1. Se calcula `pendientes` con `items.filter`, no con `visibles`. El efecto hace `document.title = Pendientes: ${pendientes}` y depende de `[pendientes]`.
2. La pestaña pasa a «Pendientes: 3». El `<h1>` no se mueve.
3. `Sur` deja dos fichas y la pestaña sigue en 3. Filtrar no cambia el estado.
4. Marcar E-101 baja la pestaña a 2. Con el array `[]`, se queda en 3 aunque la pastilla cambie. Se restituye `[pendientes]`.

→ Laboratorio: [J02-03 — useEffect](J02-03-useeffect.md).

## Ciclo de vida

Montar es el primer pintado. Actualizar es cada pintado siguiente. Desmontar es cuando el componente deja de estar. La función que devuelve el efecto es la limpieza: React la llama antes de repetir el efecto y al desmontar.

Los hooks se llaman en el mismo orden, al principio de la función, nunca debajo de un `return` condicional ni dentro del `map`.

### Demostración

1. El efecto del título devuelve una función que escribe `limpieza` en la consola y pone el título en «Bandeja de entregables».
2. Al marcar, la consola escribe `limpieza` y enseguida el efecto vuelve a poner «Pendientes: N». La limpieza corrió antes de repetir el efecto.
3. Un `if (texto.length > 2) return` puesto antes de un `useState` nuevo aguanta `E` y `Es`, y falla en `Est`.
4. Se borra ese `if`. Los hooks quedan antes de cualquier `return`. El filtro vuelve a responder.

→ Laboratorio: [J02-04 — Ciclo de vida](J02-04-ciclo.md).

## Flujo de datos

El estado baja. El aviso sube. `Tarjeta` no llama a `setItems`. Recibe `alMarcar` y la llama con el id. El padre copia el objeto de ese id y deja el resto.

La pastilla lee `item.estado`. El botón dice «Hecho» cuando ese campo es `revisado`. Si el botón mirara otra cosa, la pastilla y el rótulo se separarían.

### Demostración

1. `App` pasa `alMarcar={marcar}` en el `map`. `Tarjeta` declara la prop como `(id: string) => void`.
2. «Anotar E-101» pone la pastilla en `revisado`, quita «Falta revisión» y el botón dice «Hecho E-101». E-103 sigue pendiente.
3. Se quita la comparación `item.id === id`. Un clic marca las seis. Se restituye la comparación. Un clic vuelve a tocar una sola ficha.
4. Con `Norte` en la caja, marcar E-101 lo deja en pantalla, ahora revisado. El filtro no mira el estado. Recargar devuelve la marca al valor inicial.

→ Laboratorio: [J02-05 — Flujo de datos](J02-05-flujo.md).

## Lógica y presentación

`Tarjeta` sabe cómo se ve una ficha. No sabe cuál es la lista ni si el título de la pestaña debe cambiar. Esa lógica sale de `App` a una función `useLista` que todavía lee `datos.ts`. La petición HTTP es la jornada siguiente.

### Demostración

1. Se crea `bandeja/src/hooks/useLista.ts`. Se mudan ahí `items`, `marcar` y el efecto del título. Devuelve `{ items, marcar }`.
2. `App` se queda `texto`, `visibles` y el JSX. Al recargar, las seis fichas, el filtro y «Pendientes: 3» siguen igual.
3. En `Tarjeta.tsx` no aparece `useState`. En `useLista.ts` no aparece `className`.
4. Si el estado se deja en los dos archivos, marcar y lo pintado se separan. Se borra la copia de `App`.

→ Laboratorio: [J02-06 — Lógica y presentación](J02-06-separacion.md).
