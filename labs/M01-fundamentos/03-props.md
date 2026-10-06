# Props

[← Página anterior](02-tsx.md) · [Siguiente página →](04-eventos.md)

Una prop es un argumento de la función. Quien usa el componente decide el valor. La tarjeta no importa la lista ni conoce el entregable concreto: lo recibe.

```tsx
interface TarjetaProps {
  item: Entregable
  textoBoton?: string
}

function Tarjeta({ item, textoBoton = "Anotar" }: TarjetaProps) {
  return <h2>{item.titulo}</h2>
}
```

`item` es obligatorio. `<Tarjeta />` sin esa prop no compila. `textoBoton` puede faltar: el `?` y el valor `"Anotar"` en la desestructuración cubren ese caso. El defecto no es un `any`.

La misma función pinta seis fichas si el padre recorre un array. `key` va en el elemento que devuelve el `map`, y es el id, que no cambia al reordenar. La posición no sirve: al filtrar, el índice de una ficha cambia y React dejaría de saber cuál es cuál.

```tsx
{entregables.map((item) => (
  <li key={item.id}>
    <Tarjeta item={item} />
  </li>
))}
```

`entregables` es `Entregable[]`. Un estado mal escrito falla en el array, no en la pantalla.

> [!NOTE]
> La prop viaja de arriba abajo. `Tarjeta` no pide el dato. Si el padre le pasa otro objeto, la ficha pinta ese otro objeto.

## Demostración guiada

`Tarjeta` deja de tener el entregable escrito dentro. `App` crea el objeto y lo pasa con `item={entrega}`. Quitar el atributo marca el fichero: falta `item`. Volver a pasarlo apaga el aviso y la ficha muestra «Informe de accesibilidad».

Un segundo objeto, con otro id y `estado: "rechazado"`, produce otra ficha sin copiar el componente. El botón dice «Anotar» mientras nadie pase `textoBoton`. Con `textoBoton="Registrar"` cambia solo el texto.

Al sustituir la ficha suelta por el `map` de `datos.ts`, aparecen las seis. «Falta revisión» puede ir condicionado a `item.estado === "pendiente"`: en E-102, que ya viene revisado, esa frase no está. La consola no avisa de `key`.

## Práctica

[M02-01 — La prop](../M02-props-lista-evento/M02-01-props.md), [M02-02 — El valor por defecto](../M02-props-lista-evento/M02-02-defecto.md), [M02-03 — La condición](../M02-props-lista-evento/M02-03-condicional.md) y [M02-04 — La lista](../M02-props-lista-evento/M02-04-lista.md).
