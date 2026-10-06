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

Punto de partida: el final del [efecto](../M02-estado-y-hooks/03-efecto.md). `useState`, `marcar` y el `useEffect` del título están en `App.tsx`. La lista sale de `datos.ts`. Todavía no hay `fetch`. Los laboratorios de esta página están en `labs/M04-hooks/` y van antes que los de la petición: M05-01 necesita el hook que se crea aquí.

### 1 — El foco

En [M04-03](../M04-hooks/M04-03-useref.md) un `useRef<HTMLInputElement>(null)` apunta al input `#filtro`. Un botón «Ir al buscador» llama a `campo.current?.focus()`. Se pulsa fuera de la caja y luego el botón. El cursor entra en «Buscar». Escribir `Este` sin volver a pinchar la caja deja el inventario. Quitar el `?.` marca Problems: `current` puede ser `null`. Se restaura.

### 2 — Un dato que no baja por props

En [M04-04](../M04-hooks/M04-04-contexto.md) el nombre del revisor vive en un contexto. `Tarjeta` lo lee. No se añade `revisor` a `TarjetaProps`. Cambiar el nombre en la caja de revisor cambia el texto de las fichas. El filtro no se entera: no lee ese valor.

### 3 — Marcar pasa a ser una acción

En [M04-06](../M04-hooks/M04-06-usereducer.md) `useState(entregables)` se sustituye por `useReducer`. La acción es `{ type: "marcar", id }`. El botón sigue diciendo «Hecho» solo en la ficha pulsada. E-103, si no se pulsa, sigue pendiente.

### 4 — Sale de App

En [M04-07](../M04-hooks/M04-07-hook-propio.md) se crea `bandeja/src/hooks/useEntregables.ts`. Se mudan ahí el reductor, `marcar`, `pendientes` y el efecto del título. Empieza con `entregables` de `datos.ts` y devuelve `{ items, marcar }`. `App` se queda el filtro y el `map`.

Si el reductor se deja en los dos archivos, hay dos listas y marcar no coincide con lo pintado. Se borra la copia de `App`. Recargar muestra las seis, el filtro y «Pendientes: 3». En `App.tsx` no aparece `useReducer`. En `Tarjeta.tsx` no aparece `fetch`: la petición todavía no existe.

Dónde queda: `useEntregables` importa `datos.ts`. La página de la petición sustituye ese import por `/entregables.json`.

## Práctica

[M04-06 — useReducer](../M04-hooks/M04-06-usereducer.md) y [M04-07 — El hook propio](../M04-hooks/M04-07-hook-propio.md). El contexto, si hace falta leer un dato sin pasarlo por todas las props, está en [M04-04 — El contexto](../M04-hooks/M04-04-contexto.md). La referencia al input, en [M04-03 — useRef](../M04-hooks/M04-03-useref.md).
