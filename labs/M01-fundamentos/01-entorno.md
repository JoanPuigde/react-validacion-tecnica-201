# Entorno, Vite y build

[← Página anterior](README.md) · [Siguiente página →](02-tsx.md)

Tres piezas distintas, que no se mezclan:

| Pieza | Qué es aquí | Qué no es |
|-------|-------------|-----------|
| Node | El entorno que ejecuta las herramientas en la terminal | El servidor de la bandeja en producción |
| npm | Instala lo que declara `package.json` y lanza los scripts | Un framework de interfaz |
| Vite | Sirve la app en el puerto 5173 y empaqueta al hacer `build` | React |
| React | La librería que describe la interfaz y la actualiza | El empaquetador |

`package.json` declara dos scripts que se usan en la semana:

- `npm run dev` arranca Vite. Compila `src/main.tsx` y recarga el navegador al guardar. El puerto es 5173, fijo: si está ocupado, Vite se detiene en vez de elegir otro.
- `npm run build` pasa primero el comprobador de tipos (`tsc`) y después deja el paquete en `dist/`. Lo que no compila no se empaqueta.

El HTML de entrada es `index.html`. Su script apunta a `/src/main.tsx`. Vite es quien resuelve ese fichero, los import y el CSS.

## Demostración guiada

Punto de partida: el Codespace abierto en la raíz del repo. `bandeja/src/App.tsx` sigue con el título y el párrafo fijo. No se toca ningún fichero de `src/`.

### 1 — Arrancar

En una terminal, el directorio pasa a `bandeja/`. `npm run dev` imprime una URL local y el puerto 5173. El aviso del editor es ese mismo puerto. En el navegador se lee «Bandeja de entregables» y, debajo, «Revisión de lo que entrega el proveedor.»

Esa terminal se queda abierta. Vite recarga al guardar. Cerrarla apaga la página.

### 2 — Empaquetar

En otra terminal, también dentro de `bandeja/`, `npm run build` corre primero el comprobador de tipos y después escribe `dist/`. Termina sin error. `dist/` no se abre con el puerto 5173: es el paquete. La página del navegador sigue siendo la de `dev`.

### 3 — Si faltan dependencias

Si `npm run dev` dice que no encuentra un módulo, `npm ci` dentro de `bandeja/` reconstruye `node_modules` desde el lockfile. Es el mismo paso del contenedor al crearse. Después se vuelve a lanzar `dev`.

Dónde queda: el título en el 5173, `dev` en marcha, `App.tsx` sin tocar. La página siguiente escribe ahí el primer objeto.

## Práctica

Cuando toque asimilarlo con las manos: [M01-01 — Entorno](../M01-tsx-y-componente/M01-01-entorno.md). Ahí se arranca Vite y se lanza el build.
