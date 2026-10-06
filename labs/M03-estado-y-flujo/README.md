# M03 — Estado y flujo

[← Página anterior](../M02-props-lista-evento/M02-05-evento.md) · [Siguiente página →](M03-01-usestate.md)

> [!NOTE]
> El array deja de ser una constante pintada tal cual. El estado vive en el padre. La tarjeta avisa.

## Qué aprenderás

- Guardar el texto del buscador con `useState`.
- Calcular la lista visible, sin un segundo estado.
- Subir el clic al padre y sincronizar el título de la pestaña.

## Teoría

Una variable normal no vuelve a pintar. `useState` sí. Lo que se puede calcular a partir del estado no se guarda otra vez.

El hijo no modifica la lista. Llama a una función que el padre le pasó, tipada como `(id: string) => void`.

## Demostración guiada

Al empezar, las seis fichas salen del array y el botón solo escribe en la consola. Al terminar, hay una caja de búsqueda, marcar cambia la pastilla y la pestaña dice cuántos siguen pendientes.

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M03-01 | [useState](M03-01-usestate.md) | Una caja controlada |
| M03-02 | [El derivado](M03-02-derivado.md) | Filtrar sin otro `useState` |
| M03-03 | [El flujo](M03-03-flujo.md) | El padre cambia `estado` |
| M03-04 | [useEffect](M03-04-useeffect.md) | El título de la pestaña |
| M03-05 | [Las reglas](M03-05-reglas.md) | Ver el error de un hook condicional y quitarlo |

→ Empieza por **[M03-01 — useState](M03-01-usestate.md)**.
