# J06-03 — React DevTools

[← Página anterior](J06-02-devtools.md) · [Siguiente página →](J06-04-lighthouse.md)

React Developer Tools es una extensión. En F12 añade dos pestañas con el logo de React: Components y Profiler. No son Elements ni Rendimiento. Rendimiento no lista `Tarjeta`.

Hace falta el build de desarrollo. `npm run dev` lo es. Si solo tienes la página publicada, la extensión puede avisar de que React va en producción y el Profiler no graba. Esta página no cambia de servidor: el uso se explica sobre el dev, y el límite del publicado se dice para no atribuir un clic a un componente cuando no hubo grabación.

## Components

**Qué se puede hacer.** Ver el árbol que React tiene ahora: el padre, los hijos y las props de la ficha que elijas.

**Cómo se hace.** Pestaña Components. En el árbol, `App` y, debajo, `Tarjeta`. Al pulsar una `Tarjeta`, el panel de la derecha muestra las props. En esta bandeja son `item` (con un id, por ejemplo `E-101`) y `alMarcar`.

**Para qué sirve.** Saber qué dato le llega a la ficha sin leer el código en ese momento. Si `alMarcar` está y `item` trae el id, el clic de esa ficha tiene a quién avisar y sobre qué entregable. Eso se le puede contar al autor tal cual: la ficha recibe el objeto y la función.

En la página publicada los nombres pueden salir acortados. Si no lees `Tarjeta`, no inventas el nombre.

## Profiler

**Qué se puede hacer.** Grabar un gesto y ver qué componente se ejecutó en ese commit, y un tiempo de render.

**Cómo se hace.** Pestaña Profiler. Hay dos círculos. El de grabar deja la página quieta y registra lo que hagas después. El otro recarga y graba el primer pintado: no es el gesto. Para una letra: círculo, clic en «Buscar», escribes `n`, paras, y pulsas la barra del commit. Si hay varias barras, la última es el tecleo. El gráfico lista `App` y `Tarjeta` cuando el `App` del repo no lleva `memo`.

Para el clic, se recarga si E-101 ya dice «Hecho», hasta ver «Anotar E-101» en «Informe de accesibilidad». E-103 y E-105 también dicen «Anotar»; el botón es el que incluye `E-101`. Círculo, clic, parar, barra. En pantalla el botón pasa a «Hecho E-101» y la pastilla a `revisado`. En el gráfico salen los componentes de ese commit. Red no hace falta: el clic no pide el documento.

**Para qué sirve.** Decirle al autor qué se ejecutó, no solo que la pantalla cambió. Una letra en «Buscar» y el clic en E-101 son dos commits. Con el código del repo, sin `memo`, la letra arrastra a las fichas que siguen en pantalla. El informe copia los nombres que salieron en la barra, no los que uno esperaba.

Esas grabaciones exigen el entorno de desarrollo. Con solo la página publicada el Profiler no deja esa barra, y el informe no atribuye el gesto a `Tarjeta`.
