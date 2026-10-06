# Estado y valor derivado

[← Página anterior](README.md) · [Siguiente página →](02-flujo.md)

Una variable normal dentro de `App` se pierde en el siguiente pintado y, aunque se cambie, React no vuelve a pintar. El estado es un valor que React recuerda. Al pedir el siguiente con la función de `useState`, React vuelve a llamar al componente.

```tsx
const [texto, setTexto] = useState("")
```

`texto` es el valor de ahora. El tipo sale del inicial: `""` hace que sea `string`. `setTexto` pide el siguiente. No se muta un array a mano (`items.push(...)`): se entrega un array nuevo. Si no, React no ve el cambio.

La caja queda atada a ese estado. `value` muestra `texto`. `onChange` llama a `setTexto` con `evento.target.value`. El evento del input llega tipado por la prop. No hace falta `any`.

Lo que se puede calcular no se guarda. `visibles` es la lista filtrada a partir de `items` y de `texto`. Es un valor derivado. Meterlo en otro `useState` deja dos verdades: la caja cambia y las fichas no, porque nadie actualiza ese segundo estado.

```tsx
const visibles = items.filter((item) => {
  const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
  return blob.includes(texto.toLowerCase())
})
```

El array original no se vacía al filtrar. Vacío de coincidencias es `visibles.length === 0`, y la frase es «Ningún entregable coincide.».

| | Presentación | Estado |
|--|----------------|--------|
| Dónde vive | `Tarjeta.tsx` | `App.tsx` en este módulo |
| Qué sabe | Cómo se ve una ficha | Cuál es la lista y qué hay escrito en el filtro |
| Qué no hace | Decidir si el entregable sigue pendiente | Elegir colores o márgenes |

## Demostración guiada

La bandeja gana una caja «Buscar». Escribir `Este` deja solo «Inventario de componentes». Borrar el texto devuelve las seis fichas. `zzzz` muestra la frase de ninguna coincidencia y el array de `datos.ts` sigue teniendo seis objetos.

Una variable `let` enganchada al input no acumula letras: React no vuelve a pintar. `useState` sí.

## Práctica

[M03-01 — useState](../M03-estado-y-flujo/M03-01-usestate.md) y [M03-02 — El derivado](../M03-estado-y-flujo/M03-02-derivado.md).
