# J06-02 — Chrome DevTools

[← Página anterior](J06-01-mapa.md) · [Siguiente página →](J06-03-react.md)

F12 abre las herramientas del navegador. Red y Rendimiento (Performance) no conocen los componentes de React. Dicen qué se pidió y en qué se fue el tiempo.

Sirven con el entorno de desarrollo y también si solo tienes la página publicada. Aquí la bandeja sigue en `npm run dev`, así que los archivos que verás son los módulos de Vite.

## Red

**Qué se puede hacer.** Ver cada petición de una recarga o de un gesto: el HTML, los módulos, y si hubo una llamada de datos.

**Cómo se hace.** Pestaña Red. El icono de prohibido vacía la lista, para no mezclar peticiones viejas. La barra de filtros separa por tipo. `Doc` deja solo el documento HTML. `JS` deja los scripts. `Fetch/XHR` deja las peticiones de datos. Sin filtro, Vite llena la tabla de `.js` y `.tsx`, y es fácil contarlos como si fueran otra página.

Recargas con F5 y miras la fila `document`: tipo, estado 200, nombre de la dirección. Escribes en «Buscar», por ejemplo `Norte`, sin vaciar la lista. Si la fila `document` sigue siendo una, el filtro de la bandeja no ha vuelto a pedir el HTML. `Fetch/XHR` vacío significa que esa copia no pide `entregables.json` al teclear: la lista ya estaba en el fuente.

**Para qué sirve.** Separar «la página se volvió a bajar» de «React pintó otra vez con lo que ya tenía». Al autor se le puede decir: al recargar hay un document; al escribir `Norte` no hay otro, y no aparece una petición de datos. `Norte` deja en pantalla E-101 y E-103. Eso es el gesto, para que pueda repetirlo.

En una URL publicada se hace el mismo recuento. El script ya no se llama `Tarjeta.tsx`. El dato que sobrevive es si el HTML y el JSON se repiten al teclear.

## Rendimiento

**Qué se puede hacer.** Grabar unos segundos y ver si el tiempo de ese gesto se fue en script, en pintura o en red.

**Cómo se hace.** Pestaña Rendimiento, también llamada Performance. El círculo graba con la página ya abierta. El otro control recarga y graba el arranque: eso es otra pregunta. Para el tecleo, círculo, escribes `Norte`, lo borras, y paras con el mismo círculo. En la línea de tiempo se busca ese intervalo. Un tramo de script es código ejecutándose. Con seis fichas el tramo es corto. Al abrirlo, el archivo es un módulo del dev.

Si la grabación sale vacía, el círculo no estaba en marcha mientras escribías.

**Para qué sirve.** Decir si el gesto costó código o costó red. En esta bandeja, escribir y borrar `Norte` deja un tramo de script corto y no una descarga nueva. Esa frase no nombra `Tarjeta`. El nombre del componente es la página de React DevTools.

En una URL publicada el círculo se usa igual. El tramo de script apunta al archivo del paquete, no al `.tsx`.
