# React para validación técnica, testing y rendimiento

[Siguiente página →](labs/M01-fundamentos/README.md)

La guía del curso. La aplicación de la semana es la [bandeja de entregables](bandeja/README.md), en Vite y TypeScript. Se lee en este orden. El [panel](panel/README.md) es otro proyecto: el laboratorio del stack. Los laboratorios no son el recorrido: están enlazados al final de cada página, para cuando toque practicar un concepto y asimilarlo con las manos.

El entorno es el dev container del repositorio. En GitHub: **Code → Create codespace on main**. Dentro de `bandeja/`, `npm run dev` abre el puerto **5173**. `npm run build` comprueba los tipos y empaqueta.

Componentes funcionales, ficheros `.tsx`, interfaces propias. Sin `any` y sin clases.

## Módulos

| # | Módulo | Guía |
|---|--------|------|
| M01 | Fundamentos | [Entorno, TSX, props, eventos y children](labs/M01-fundamentos/README.md) |
| M02 | Estado, hooks y flujo de datos | [useState, flujo y useEffect](labs/M02-estado-y-hooks/README.md) |
| M03 | APIs y arquitectura | [Petición, finales y estructura](labs/M03-apis-y-arquitectura/README.md) |
| M04 | Rendimiento | [Qué mirar antes de optimizar](labs/M04-rendimiento/README.md) |
| M05 | Testing y validación | [Un recorrido y el checklist](labs/M05-testing-y-validacion/README.md) |
| M06 | El stack | [Panel: sesión, datos, formulario e idioma](labs/M06-stack/README.md) |

## Orden de lectura

La columna de la izquierda es el módulo. La carpeta de la derecha es la práctica de esa página. El número de esa carpeta es el de sus laboratorios: `M02-props-lista-evento` practica props, que es el módulo 1. `M03-estado-y-flujo` practica estado, que es el módulo 2.

| Se está en | La práctica está en | La bandeja, al empezar |
|---|---|---|
| [Entorno](labs/M01-fundamentos/01-entorno.md) | [M01-01](labs/M01-tsx-y-componente/M01-01-entorno.md) | Título «Bandeja de entregables». Sin fichas. |
| [TSX](labs/M01-fundamentos/02-tsx.md) | [M01-02](labs/M01-tsx-y-componente/M01-02-interfaz.md) … [M01-05](labs/M01-tsx-y-componente/M01-05-clase.md) | El mismo título. Aquí se crea `bandeja/src/componentes/Tarjeta.tsx`. |
| [Props](labs/M01-fundamentos/03-props.md) y [Eventos](labs/M01-fundamentos/04-eventos.md) | [M02-01](labs/M02-props-lista-evento/M02-01-props.md) … [M02-05](labs/M02-props-lista-evento/M02-05-evento.md) | Una ficha. El objeto vive dentro de `Tarjeta.tsx`. |
| [Children](labs/M01-fundamentos/05-children.md) | [M04-01](labs/M04-hooks/M04-01-children.md) y [M04-02](labs/M04-hooks/M04-02-fragmento.md) | Seis fichas. Esos dos laboratorios se hacen cuando la lista ya filtra. |
| [Estado](labs/M02-estado-y-hooks/01-estado.md), [flujo](labs/M02-estado-y-hooks/02-flujo.md), [efecto](labs/M02-estado-y-hooks/03-efecto.md) | [M03-01](labs/M03-estado-y-flujo/M03-01-usestate.md) … [M03-05](labs/M03-estado-y-flujo/M03-05-reglas.md) | Seis fichas. El botón escribe el id en la consola. |
| [Estructura](labs/M03-apis-y-arquitectura/02-estructura.md) | [M04-03](labs/M04-hooks/M04-03-useref.md), [M04-04](labs/M04-hooks/M04-04-contexto.md), [M04-06](labs/M04-hooks/M04-06-usereducer.md), [M04-07](labs/M04-hooks/M04-07-hook-propio.md) | Buscador, pastilla y pestaña. La lista sigue en `datos.ts`. |
| [Petición](labs/M03-apis-y-arquitectura/01-peticion.md) | [M05-01](labs/M05-datos/M05-01-fetch.md) y [M05-02](labs/M05-datos/M05-02-finales.md) | Existe `useEntregables` y todavía importa `datos.ts`. `public/entregables.json` ya está en el repo. |
| [Rendimiento](labs/M04-rendimiento/01-que-mirar.md) | [M04-05](labs/M04-hooks/M04-05-usememo.md), luego [M05-03](labs/M05-datos/M05-03-memo.md) y [M05-04](labs/M05-datos/M05-04-usecallback.md) | Filtro y marcar funcionan. M04-05 va antes del `fetch`. M05-03 y M05-04, después. |
| [Recorrido](labs/M05-testing-y-validacion/01-recorrido.md) | [M05-05](labs/M05-datos/M05-05-caso.md) | El JSON carga la lista. El buscador es `#filtro`. El botón dice «Anotar». |
| [Stack](labs/M06-stack/README.md) | [M06-01](labs/M06-stack/M06-01-stack.md) | Otro proyecto: `panel/`, puerto 5174. La bandeja se queda en el 5173. |

Los laboratorios se abren en esta cadena, aunque el número de carpeta no coincida con el módulo: M01-01 … M01-05, M02-01 … M02-05, M03-01 … M03-05, M04-01 … M04-07, M05-01 … M05-05. M04-01 y M04-02 son children (módulo 1). M04-05 es rendimiento. M05-01 es la petición.

## Empieza aquí

→ **[M01 — Fundamentos](labs/M01-fundamentos/README.md)**
