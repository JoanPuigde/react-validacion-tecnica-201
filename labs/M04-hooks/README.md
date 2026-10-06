# M04 — Hooks

[← Página anterior](../M03-estado-y-flujo/M03-05-reglas.md) · [Siguiente página →](M04-01-children.md)

> [!NOTE]
> Cada laboratorio añade un hook o una prop de React. El anterior sigue en el archivo.

## Qué aprenderás

- `children`, un fragmento, `useRef`, un contexto, `useMemo`, `useReducer` y un hook propio.
- A comprobar una sola cosa en cada uno: el foco, el nombre del revisor, el filtro que se congela, la pastilla que cambia vía `dispatch`.

## Teoría

Un hook es una función cuyo nombre empieza por `use` y que solo se llama en el tope del componente o de otro hook. El hook propio de este módulo es el sitio donde acabará la lista. Hasta entonces, la lista sigue en `App` para que veas el cambio de sitio.

## Demostración guiada

La bandeja ya filtra y marca. Los laboratorios no cambian de pantalla: añaden un marco, el foco del buscador, el nombre de quien revisa y, al final, mueven la lista a `useEntregables`.

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M04-01 | [children](M04-01-children.md) | Envolver la lista |
| M04-02 | [El fragmento](M04-02-fragmento.md) | Quitar el envoltorio de más |
| M04-03 | [useRef](M04-03-useref.md) | Llevar el foco al buscador |
| M04-04 | [El contexto](M04-04-contexto.md) | El nombre del revisor, sin pasarlo por props |
| M04-05 | [useMemo](M04-05-usememo.md) | El filtro y sus dependencias |
| M04-06 | [useReducer](M04-06-usereducer.md) | `marcar` como acción |
| M04-07 | [El hook propio](M04-07-hook-propio.md) | Sacar la lista de `App` |

→ Empieza por **[M04-01 — children](M04-01-children.md)**.
