# Jornada 1 — Fundamentos de React

[← Página anterior](../../README.md) · [Siguiente página →](J01-01-react.md)

La bandeja es una lista de entregables de proveedor. El documento se descarga una vez. A partir de ahí, React pinta y actualiza la página.

## Introducción a React

Un componente es una función cuyo nombre empieza en mayúscula y que devuelve interfaz. `App` es el componente de entrada. React llama a esa función y aplica el resultado al nodo `#raiz` de `index.html`.

### Demostración

1. Se abre `bandeja/index.html`. El cuerpo tiene `<div id="raiz">` y un script que apunta a `/src/main.tsx`.
2. En `bandeja/src/main.tsx`, `createRoot` busca `#raiz` y pinta `<App />`.
3. En el navegador, con `npm run dev`, se lee el título «Bandeja de entregables». Ese texto sale de `bandeja/src/App.tsx`, no del HTML.
4. Se cambia el texto del `<h1>` y se guarda. La página se actualiza. Se restaura «Bandeja de entregables».

→ Laboratorio: [J01-01 — Introducción a React](J01-01-react.md).

## SPA y aplicación tradicional

En una aplicación tradicional, cada clic pide un documento nuevo. En esta, el navegador carga `index.html` una vez. Los cambios de la caja y de la pastilla los aplica React sobre el mismo documento.

### Demostración

1. Se abre la bandeja en el puerto 5173. En Network, se recarga y se mira el documento: una petición del HTML.
2. Se escribe en «Buscar». No sale otra petición del documento. Cambia la lista que ya estaba.
3. Se pulsa «Anotar» en una ficha pendiente. La dirección sigue siendo `/`. La pastilla cambia sin navegar.
4. Se recarga. El documento vuelve a pedirse y la pastilla marcada vuelve a su estado inicial: lo marcado vivía en memoria.

→ Laboratorio: [J01-02 — SPA](J01-02-spa.md).

## Entorno: Node, npm y Vite

| Pieza | Qué es aquí |
|-------|-------------|
| Node | Ejecuta las herramientas en la terminal |
| npm | Instala lo de `package.json` y lanza los scripts |
| Vite | Sirve la app en el puerto 5173 y empaqueta con `build` |
| React | Describe la interfaz |

`npm run dev` recarga al guardar. `npm run build` pasa el comprobador de tipos y deja el paquete en `dist/`. El puerto es fijo: si está ocupado, Vite se detiene.

### Demostración

1. Una terminal entra en `bandeja/`. `npm run dev` imprime la URL y el puerto 5173.
2. El navegador muestra «Bandeja de entregables».
3. En otra terminal, también en `bandeja/`, `npm run build` termina sin error. Aparece `dist/`.
4. La página del 5173 sigue siendo la de `dev`. `dist/` no se abre con ese puerto.

→ Laboratorio: [J01-03 — Entorno](J01-03-entorno.md).

## JSX

TSX parece HTML dentro de TypeScript. Lo que va entre llaves es una expresión: `{item.titulo}`. Fuera de las llaves, el texto se pinta tal cual. `class` de HTML es `className`. El dato se describe con una interfaz. `"listo"` no es un estado válido.

### Demostración

1. Se abre `bandeja/src/componentes/Tarjeta.tsx`. El título de la ficha es `{item.titulo}`.
2. Se quitan las llaves y se deja la palabra `item.titulo`. Al guardar, la ficha muestra esa palabra, no «Informe de accesibilidad». Se restituyen las llaves.
3. En `bandeja/src/datos.ts`, el estado de E-104 pasa a `"listo"`. Problems subraya la línea. El navegador puede seguir en el último pintado bueno. Se restaura `"rechazado"`.
4. En la pastilla, `className` lleva `` `estado ${item.estado}` ``. Con `pendiente` la pastilla es beige. `class` en vez de `className` lo marca el editor. Se deja `className`.

→ Laboratorio: [J01-04 — JSX](J01-04-jsx.md).

## Componentes

`Tarjeta` es una función en su propio archivo. `App` la usa y no sabe dibujar una ficha. El mismo componente pinta las seis porque el padre recorre un array. No hay clases: la función no extiende `Component`.

### Demostración

1. `bandeja/src/componentes/Tarjeta.tsx` exporta la función `Tarjeta`.
2. `App.tsx` importa ese archivo y lo pone dentro del `map`. No hay seis copias del marcado.
3. En `Tarjeta`, el `<p>` del título pasa un momento a `{item.proveedor}`. Las fichas muestran Norte, Sur, Este, Oeste. Se restaura `{item.titulo}`.
4. El import desde `Tarjeta` hacia el tipo es `../modelo`, porque el archivo está dentro de `componentes/`.

→ Laboratorio: [J01-05 — Componentes](J01-05-componentes.md).

## Props

Una prop es un argumento. `item` es obligatorio. `textoBoton` puede faltar: el defecto `"Anotar"` está en la desestructuración. La prop viaja de `App` a `Tarjeta`. La tarjeta no importa `datos.ts`.

`key` va en el `<li>` del `map`, y es `item.id`. El índice no sirve: al filtrar, la posición cambia.

### Demostración

1. En `Tarjeta.tsx`, la interfaz `TarjetaProps` tiene `item: Entregable` y `textoBoton?: string`.
2. Se quita `item={item}` en `App`. Problems marca la etiqueta. Se restituye.
3. En una ficha se pasa `textoBoton="Registrar"`. Solo esa palabra cambia. Al quitar el atributo, vuelve «Anotar».
4. «Falta revisión» está en E-101, E-103 y E-105. No está en E-102, E-104 ni E-106: la frase depende de `item.estado === "pendiente"`.

→ Laboratorio: [J01-06 — Props](J01-06-props.md).

## Eventos

`onClick` recibe una función. `onClick={alMarcar(item.id)}` la ejecutaría al pintar. La que espera al clic es `() => alMarcar(item.id)`. `type="button"` deja la intención explícita.

En este momento el clic cambia la pastilla porque `alMarcar` vive en el padre. El evento, como mecanismo, es solo el aviso.

### Demostración

1. Se abre la consola. Se recarga. No aparece ningún id por el simple hecho de pintar.
2. En `Tarjeta.tsx`, el `onClick` es `() => alMarcar(item.id)`.
3. Se cambia un momento a `onClick={alMarcar(item.id)}`. El editor o la ejecución se quejan: `alMarcar` devuelve nada y se está llamando al pintar. Se restituye la flecha.
4. Se pulsa «Anotar E-101». La pastilla pasa a `revisado` y el botón dice «Hecho E-101». E-103 sigue pendiente. Recargar devuelve E-101 a pendiente.

→ Laboratorio: [J01-07 — Eventos](J01-07-eventos.md).
