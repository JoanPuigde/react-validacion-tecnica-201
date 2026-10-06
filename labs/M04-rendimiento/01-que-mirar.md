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

Con un `console.count(item.id)` dentro de `Tarjeta`, una letra en «Buscar» hace subir el contador de las fichas que siguen en pantalla. El padre se ha vuelto a ejecutar y `marcar` es una función nueva.

Al envolver `marcar` en `useCallback` con dependencias vacías —solo usa `dispatch`— el contador puede seguir, porque el valor del contexto es otro objeto en cada pintado. Al memorizar ese objeto con `useMemo` y `[revisor]`, la letra del buscador deja de contar. Escribir en «Revisor» vuelve a contar: el nombre sí cambió y las fichas tienen que enseñarlo. Marcar una ficha cuenta solo esa, porque su `item` es otro objeto.

El `console.count` se quita al verlo. `memo` puede quedarse. En seis fichas no se nota. La lectura sí: se sabe por qué estaba o por qué sobraba.

## Práctica

[M04-05 — useMemo](../M04-hooks/M04-05-usememo.md), [M05-03 — memo](../M05-datos/M05-03-memo.md) y [M05-04 — useCallback](../M05-datos/M05-04-usecallback.md).
