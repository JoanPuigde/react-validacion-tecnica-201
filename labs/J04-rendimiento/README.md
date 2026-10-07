# Jornada 4 — Rendimiento y herramientas

[← Página anterior](../J03-integracion/J03-11-antipatrones.md) · [Siguiente página →](J04-01-impacto.md)

La bandeja de seis fichas no está lenta. `memo` y `useMemo` ya se vieron al principio de la jornada 3, en la ficha y en el valor del contexto. Esta jornada sirve para leer una entrega cuando alguien diga que va mal: qué se volvió a ejecutar, si el tiempo se fue en script o en red, y si un `memo` está puesto sin una medición.

## Qué impacta

React pinta en dos momentos. El render llama a las funciones y calcula el árbol. El commit aplica ese árbol al documento. Una función lenta dentro del componente alarga el render.

Si el estado vive en el padre, un `setTexto` vuelve a ejecutar al padre y, con él, a los hijos, salvo que una comparación de props lo evite.

### Demostración

1. `console.count(item.id)` en la primera línea de `Tarjeta`. Se limpia la consola.
2. Una letra en «Buscar» hace subir el contador de las fichas que siguen en pantalla.
3. El contador no dice que la página vaya lenta. Dice cuántas veces se llamó a la función.
4. Se deja el contador para el punto siguiente. No se envuelve nada todavía.

→ Laboratorio: [J04-01 — Qué impacta](J04-01-impacto.md).

## Re-renderizados innecesarios

`memo` se salta el render si las props son iguales por comparación superficial. Esa comparación se rompe si la prop es una función nueva en cada pintado: `alMarcar={marcar}` cuando `marcar` nace en el cuerpo del padre.

### Demostración

1. `Tarjeta` se exporta con `memo`. Se limpia la consola y se teclea una letra. El contador sigue.
2. `marcar` se envuelve en `useCallback` con `[]`, porque solo usa `setItems`.
3. Una letra deja de contar en las fichas cuyo `item` no cambió.
4. Marcar E-101 cuenta esa ficha: su objeto es nuevo. Las demás no tienen por qué subir.

→ Laboratorio: [J04-02 — Re-renderizados](J04-02-rerender.md).

## Gestión del estado

`useMemo` fija el resultado de un cálculo. No acelera nada por sí solo. Sirve cuando alguien compara esa referencia, o cuando el cálculo es caro. Olvidar `texto` en las dependencias del filtro hace que la caja cambie y las fichas no.

Entregar un array nuevo en `marcar` es lo que permite el repintado. Mutar el mismo array es lo contrario de una gestión eficiente: a veces no hay pintado.

### Demostración

1. `visibles` pasa a `useMemo` con `[items, texto]`. `Norte` sigue filtrando.
2. El array se deja en `[items]`. La caja muestra letras y las fichas no se mueven.
3. Se restituye `[items, texto]`.
4. En seis fichas el `useMemo` no se nota al usarlas. Se nota la dependencia rota.

→ Laboratorio: [J04-03 — Estado y referencias](J04-03-estado.md).

## Lazy loading y code splitting

`lazy` parte el paquete: un trozo que no hace falta en la primera pintura llega cuando se muestra. `Suspense` enseña un respaldo mientras llega. En la bandeja no hay un panel grande. El trozo pequeño basta para reconocer el mecanismo.

### Demostración

1. Se crea `bandeja/src/componentes/Pie.tsx` con un párrafo «Lista de entregables.».
2. `App` lo carga con `lazy(() => import("./componentes/Pie"))`.
3. El uso va dentro de `<Suspense fallback={<p>Cargando el pie…</p>}>`.
4. El pie aparece bajo la lista. El respaldo puede no llegar a verse. En Network, el trozo del pie es otro archivo, no el de `App`.

→ Laboratorio: [J04-04 — Lazy loading](J04-04-lazy.md).

## Chrome DevTools

Network dice si cada letra pide el documento o el JSON. Performance dice si el tiempo se fue en script, en pintura o en red.

### Demostración

1. Network, al recargar: el documento una vez. Si la lista ya viene de `/entregables.json`, una petición a ese archivo.
2. Se teclea en «Buscar». No se repite el documento. Si hay JSON, tampoco se repite.
3. Se graba una pasada corta de Performance mientras se escribe `Norte` y se borra.
4. En el resumen se mira si hay script. En seis fichas el tramo es corto. La pregunta queda hecha igual.

→ Laboratorio: [J04-05 — Chrome DevTools](J04-05-devtools.md).

## React Profiler

El Profiler no está en el navegador a secas. Hace falta la extensión React DevTools. Pregunta qué componente se ejecutó y cuánto tardó el render. No sustituye a Network.

### Demostración

1. Con la extensión, se abre la pestaña Profiler.
2. Se graba, se escribe una letra y se para.
3. `App` aparece en la grabación. `Tarjeta` aparece en las fichas que se volvieron a ejecutar.
4. Si `memo` y `useCallback` ya están, las fichas cuyo `item` no cambió no tienen por qué salir en esa letra.

→ Laboratorio: [J04-06 — Profiler](J04-06-profiler.md).

## Lighthouse

Lighthouse hace una pasada de carga: peso, bloqueo y otras reglas. En seis fichas la nota sale holgada. El contador de la consola decía otra cosa. Las dos lecturas se quedan: la nota no borra el contador, y el contador no es la nota.

### Demostración

1. Pestaña Lighthouse, categoría Rendimiento, se analiza la carga del puerto 5173.
2. Se lee un número de la pasada. No se cambia código para subir la nota.
3. Se borra `console.count` de `Tarjeta` si seguía. `memo` y `useCallback` pueden quedarse.
4. La bandeja se usa igual que antes del contador.

→ Laboratorio: [J04-07 — Lighthouse](J04-07-lighthouse.md).
