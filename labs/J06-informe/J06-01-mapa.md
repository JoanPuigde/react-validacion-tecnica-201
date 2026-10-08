# J06-01 — Qué herramienta

[← Página anterior](README.md) · [Siguiente página →](J06-02-devtools.md)

La bandeja se abre con `npm run dev`, en `http://localhost:5173`, y ahí se queda. Estas páginas no cambian `bandeja/src`. Explican qué panel existe, cómo se usa y qué dato te deja para contárselo a quien escribe el código.

Hay tres herramientas. Se practican todas con el entorno de desarrollo. No todas sirven igual si solo te pasan la página ya publicada, sin el fuente y sin Vite.

Chrome DevTools viene con el navegador. Para el rendimiento se usan dos pestañas: Red y Rendimiento (Performance). Las dos abren tanto en el dev como en una URL publicada. En el dev, Red enseña un módulo por archivo. En la página publicada, enseña el HTML y los archivos del paquete, con el nombre que tenga ese sitio, no `Tarjeta.tsx`. Performance graba igual en los dos casos. Cambia el nombre del script, no el modo de grabar.

React DevTools es una extensión. Components y Profiler sirven con el entorno de desarrollo, porque React va en build de desarrollo y el árbol conserva `App` y `Tarjeta`. Si solo tienes la página publicada, el Profiler no graba: ese build es de producción. Desde ahí no puedes decir qué componente se ejecutó.

Lighthouse también viene con el navegador. Mide la carga de la URL que esté abierta, sea el dev o una página publicada. El número es de esa URL. El de `localhost` con `npm run dev` no es el de un sitio ya publicado: el dev manda un módulo por archivo.

El informe nombra la herramienta y el gesto. Si el dato solo existe con el entorno de desarrollo, la frase lo dice. El autor sabe entonces qué podría repetir abriendo solo la página y qué necesita el fuente.
