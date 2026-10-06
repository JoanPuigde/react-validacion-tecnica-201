# M02 — Props, lista y evento

> Práctica de [props](../M01-fundamentos/03-props.md) y [eventos](../M01-fundamentos/04-eventos.md). La guía sigue en fundamentos. Esto es para hacerlo con las manos.

[← Página anterior](../M01-fundamentos/03-props.md) · [Siguiente página →](M02-01-props.md)

> [!NOTE]
> Se sigue en la misma `Tarjeta`. Cada laboratorio añade una prop, una condición, la lista o el clic.

## Qué aprenderás

- Recibir el entregable por props, con interfaz.
- Pintar solo a veces, y pintar una lista con `key`.
- Responder a un clic con una función tipada.

## Teoría

La prop entra como argumento. Quien usa el componente decide el valor. La tarjeta no importa la lista.

| Idea | Señal de que está hecha |
|------|-------------------------|
| Prop | `<Tarjeta />` sin `item` no compila |
| Condición | Una frase aparece solo si el estado es `pendiente` |
| Lista | Seis fichas, cada `key` es `item.id` |
| Evento | El clic escribe el id en la consola, no al cargar |

## Demostración guiada

Al empezar el módulo hay una sola ficha y el objeto vive dentro de `Tarjeta`. Al terminar, la ficha recibe el objeto, la lista sale de un array y el botón espera al clic.

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M02-01 | [La prop](M02-01-props.md) | Pasar `item` con interfaz |
| M02-02 | [El valor por defecto](M02-02-defecto.md) | Un texto de botón opcional |
| M02-03 | [La condición](M02-03-condicional.md) | Una frase solo si falta revisión |
| M02-04 | [La lista](M02-04-lista.md) | `map` y `key` |
| M02-05 | [El evento](M02-05-evento.md) | `onClick` tipado |

→ Empieza por **[M02-01 — La prop](M02-01-props.md)**.
