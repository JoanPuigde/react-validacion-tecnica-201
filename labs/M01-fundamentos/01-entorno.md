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

En la terminal del Codespace, dentro de `bandeja/`, `npm run dev` imprime la URL local. El editor avisa del puerto 5173. En el navegador se lee el título «Bandeja de entregables».

En otra terminal, `npm run build` termina sin error de TypeScript. `dist/` es el resultado de ese empaquetado. No se abre con `dev`: es lo que se publicaría. Para seguir leyendo la guía, el proceso que importa es el de `dev`, que sigue recargando al guardar.

> [!NOTE]
> Si `node_modules` no está, `npm ci` dentro de `bandeja/` lo reconstruye a partir del lockfile. Es el mismo paso que hace el contenedor al crearse.

## Práctica

Cuando toque asimilarlo con las manos: [M01-01 — Entorno](../M01-tsx-y-componente/M01-01-entorno.md). Ahí se arranca Vite y se lanza el build.
