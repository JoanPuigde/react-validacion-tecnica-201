# J06-05 — El informe

[← Página anterior](J06-04-lighthouse.md) · [Índice del curso →](../../README.md)

El informe es lo que el autor puede repetir sin haber estado delante. Cada frase lleva la herramienta y el gesto. No lleva un parche ni un «habría que poner `memo`».

Se escribe fuera de `bandeja/src`. Medido con `npm run dev` en `http://localhost:5173`.

Red: al recargar, cuántas filas `document` hay con el filtro `Doc`, y si escribir `Norte` añade otra. Si `Fetch/XHR` fue vacío o pidió el JSON una sola vez. Para qué: decir si filtrar vuelve a bajar la página.

Performance: al escribir y borrar `Norte`, si hubo un tramo de script y cómo se llamaba el archivo. Para qué: decir si el gesto costó código, y que el nombre aún no es el del componente.

React DevTools: las props de una `Tarjeta`, los componentes del commit de una letra, y los del commit de «Anotar E-101», con la pastilla en `revisado`. Para qué: decir qué se ejecutó. Esta parte exige el entorno de desarrollo. Con solo la página publicada el Profiler no graba y el clic no se atribuye a un componente.

Lighthouse: la puntuación de Rendimiento en escritorio y en móvil, de esta URL, etiquetada como dev. Para qué: describir la carga. No se pide subir la nota. Una pasada sobre una URL publicada sería otro número, con los mismos clics, y no se mezcla con estos.

Al final, una línea basta para el otro acceso: Red, Performance y Lighthouse se pueden usar igual en la página publicada; el Profiler, no.
