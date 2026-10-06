# Estructura

[← Página anterior](01-peticion.md) · [Siguiente página →](../M04-rendimiento/README.md)

La ficha pinta. No pide datos. La petición y el estado de la lista pueden salir de `App` sin cambiar lo que se ve. El filtro se queda en la pantalla, porque es de esta vista.

| Carpeta | Responsabilidad |
|---------|-----------------|
| `src/api/` | Hablar con HTTP. No pinta. |
| `src/hooks/` | Guardar carga, error y datos. No conoce el CSS. |
| `src/componentes/` | Pintar props y `children`. No llama a `fetch`. |
| `src/App.tsx` | Componer. El texto del buscador y `visibles` viven aquí. |

Un hook propio es una función cuyo nombre empieza por `use`. Cumple las mismas reglas: sus hooks van al principio, no dentro de un `if`. `useEntregables` devuelve `items`, `cargando`, `error` y `marcar`. `App` no necesita el `dispatch`.

Si la lista crece en acciones (`marcar`, `cargar`), un `useReducer` deja esos cambios en un solo `switch`. Cada acción es un tipo. `{ type: "borrar" }` no compila si no está en el tipo `Accion`. El reductor no sustituye a la carpeta: es la forma del estado dentro del hook.

Antipatrones que invalidan la lectura de una entrega:

- `fetch` suelto en el cuerpo del componente, fuera de un efecto.
- Una ficha que importa la API y además decide el filtro.
- `visibles` guardado en un `useState` además de calcularlo.

> [!WARNING]
> Derivar `visibles` con `useEffect` y `setVisibles` añade un pintado de retraso y un sitio más donde el filtro puede mentir. Se calcula en el render.

## Demostración guiada

Después del movimiento, recargar sigue mostrando las seis fichas, el filtro y el título «Pendientes: N». En `Tarjeta.tsx` no aparece la palabra `fetch`. En `App.tsx` no aparece `useReducer`. Network, al teclear, no repite `entregables.json`.

`datos.ts` puede seguir en el proyecto. El hook ya no lo importa. La fuente es el JSON.

## Práctica

[M04-06 — useReducer](../M04-hooks/M04-06-usereducer.md) y [M04-07 — El hook propio](../M04-hooks/M04-07-hook-propio.md). El contexto, si hace falta leer un dato sin pasarlo por todas las props, está en [M04-04 — El contexto](../M04-hooks/M04-04-contexto.md). La referencia al input, en [M04-03 — useRef](../M04-hooks/M04-03-useref.md).
