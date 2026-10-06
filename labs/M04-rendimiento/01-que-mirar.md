# Qué mirar

[← Página anterior](README.md) · [Siguiente página →](../M05-testing-y-validacion/README.md)

React pinta en dos momentos. **Render**: llama a las funciones y calcula el árbol. **Commit**: aplica ese árbol al documento. Una función lenta dentro del componente alarga el render.

Si el estado vive en el padre, un `setTexto` vuelve a ejecutar al padre. Cada hijo se vuelve a ejecutar también, salvo que una comparación de props lo evite. `memo` se salta el render si las props son iguales por comparación superficial.

Esa comparación se rompe con facilidad:

| Prop que parece igual | Por qué `memo` no se la salta |
|-----------------------|-------------------------------|
| `estilo={{ padding: 4 }}` | Objeto nuevo en cada render del padre |
| `alMarcar={() => ...}` | Función nueva en cada render del padre |
| El valor de un contexto creado como `{ revisor }` dentro del componente | Objeto nuevo, y el contexto despierta a quien lo lee |
| `item={item}` del mismo array | Esta sí se puede saltar: es la misma referencia |

`useCallback` y `useMemo` fijan la referencia de una función o de un valor. No aceleran nada por sí solos. Sirven cuando un hijo memorizado, o un contexto, compara esa referencia. Olvidar `texto` en el `useMemo` del filtro hace que la caja cambie y las fichas no.

`lazy` parte el paquete: un panel que no hace falta en la primera pintura llega cuando se muestra, y `Suspense` enseña un respaldo mientras llega. En la bandeja de seis fichas no hay un panel así. La idea basta para reconocerla en una entrega.

Tres herramientas, tres preguntas:

| Herramienta | Pregunta |
|-------------|----------|
| React Profiler, de la extensión React DevTools | Qué componente se ejecutó y cuánto tardó el render |
| Performance, en las herramientas del navegador | Si el tiempo se fue en script, en pintura o en red |
| Lighthouse | Una pasada de carga: peso, bloqueo y otras reglas |

> [!NOTE]
> El Profiler no está en el navegador a secas. Hace falta [React DevTools](https://react.dev/learn/react-developer-tools) en el Chrome donde se abre el puerto. Lighthouse y Performance vienen con el navegador.

> [!WARNING]
> Poner `memo` en las seis fichas no demuestra que hiciera falta. Primero se cuenta o se graba. Si el contador de una ficha sube al teclear en el buscador, la prop o el contexto están naciendo de nuevo. Si no sube, `memo` ya se la salta y no hay nada que celebrar en una lista corta.

## Demostración guiada

Punto de partida: el filtro y marcar funcionan. `Tarjeta` está en `bandeja/src/componentes/Tarjeta.tsx`. Hace falta la extensión React DevTools si se abre el Profiler. La consola del navegador basta para el contador.

[M04-05](../M04-hooks/M04-05-usememo.md) se hace con la lista todavía en `datos.ts`, antes del `fetch`. [M05-03](../M05-datos/M05-03-memo.md) y [M05-04](../M05-datos/M05-04-usecallback.md) se hacen cuando la lista ya llega por JSON.

### 1 — Una dependencia que miente

En [M04-05](../M04-hooks/M04-05-usememo.md) el filtro pasa a `useMemo` con `[items, texto]`. `Este` sigue dejando el inventario. Se deja el array en `[items]` y se recarga. La caja muestra las letras y las fichas no se filtran: `texto` cambió y el cálculo no se enteró. El editor, si avisa, señala que `texto` se usa y no está en el array. Se restituye `[items, texto]`. `Este` vuelve a dejar una ficha.

### 2 — Contar antes de envolver

Dentro de `Tarjeta`, la primera línea del componente: `console.count(item.id)`. Se abre la consola y se borra. Una letra en «Buscar» hace subir el contador de las fichas que siguen en pantalla. El padre se ha vuelto a ejecutar. `marcar`, si nace en el cuerpo de `App`, es otra función en ese pintado.

### 3 — memo no basta si la prop es nueva

`Tarjeta` se envuelve en `memo`. Se borra la consola y se teclea otra letra. El contador puede seguir subiendo: `alMarcar={() => ...}` o el valor del contexto `{ revisor }` son objetos nuevos. `memo` compara la referencia y no se la salta.

### 4 — La referencia que sí se queda

`marcar` se envuelve en `useCallback`. Si solo usa `dispatch`, las dependencias van vacías. El contador puede seguir, por el contexto. El valor del contexto se memoriza con `useMemo` y `[revisor]`. Se borra la consola. Una letra en «Buscar» ya no cuenta en las fichas que no cambiaron de `item`.

Escribir en la caja del revisor vuelve a contar: el nombre cambió y las fichas lo enseñan. Marcar una ficha cuenta solo esa: su `item` es otro objeto. El resto conserva la referencia.

### 5 — Se quita el contador

Se borra `console.count`. `memo` puede quedarse. En seis fichas no se nota al usarlas. Lo que queda es la lectura: el contador subía por una prop nueva, no porque la lista fuera larga.

Dónde queda: la bandeja se comporta igual que antes del contador. El caso de Cypress, en el módulo siguiente, no mira este contador. Mira el texto de la página.

## Práctica

[M04-05 — useMemo](../M04-hooks/M04-05-usememo.md), [M05-03 — memo](../M05-datos/M05-03-memo.md) y [M05-04 — useCallback](../M05-datos/M05-04-usecallback.md).
