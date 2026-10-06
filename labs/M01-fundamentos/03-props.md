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

Punto de partida: existe `bandeja/src/componentes/Tarjeta.tsx`. El objeto `entrega` (E-101, «Informe de accesibilidad», Norte, `pendiente`) está escrito dentro de ese archivo. `App.tsx` solo tiene `<Tarjeta />`. La pastilla lee `entrega.estado`. Si ese archivo no está, el paso 4 de [TSX](02-tsx.md) lo crea.

### 1 — La prop obligatoria

En `Tarjeta.tsx` se declara `TarjetaProps` con `item: Entregable`. La función pasa a `function Tarjeta({ item }: TarjetaProps)`. Cada `entrega.` del JSX pasa a `item.`. Se borra la constante `entrega` de este archivo. Todavía no se pasa nada desde `App`.

Problems marca `<Tarjeta />` en `App.tsx`: falta `item`. El aviso está en quien usa el componente, no dentro de `Tarjeta`. No se tapa con `item?` ni con `any`.

### 2 — El padre entrega el objeto

En `App.tsx` vuelve el import de `Entregable` y la constante `entrega` de E-101. La etiqueta queda `<Tarjeta item={entrega} />`. Problems se apaga. La ficha sigue en «Informe de accesibilidad».

En `Tarjeta.tsx` ya no aparece el nombre `entrega`. Cambiar `titulo` en el objeto de `App` cambia la ficha. El componente no importa `datos` ni conoce este entregable: pinta el que le llegan.

### 3 — El botón opcional

En `TarjetaProps`, `textoBoton` es opcional (`textoBoton?: string`). En la desestructuración, el defecto es `"Anotar"`. El botón pinta `{textoBoton} {item.id}`. Sin el atributo, se lee «Anotar E-101». Con `textoBoton="Registrar"` en `App`, solo cambia esa palabra. Quitar el atributo devuelve «Anotar».

### 4 — Una frase que a veces no está

Dentro de la ficha, `{item.estado === "pendiente" ? <p>Falta revisión</p> : null}`. Con E-101 se lee la frase. Cambiar el objeto a `"revisado"` la quita y la pastilla pasa a verde. Se deja otra vez `"pendiente"`.

### 5 — Seis fichas, un componente

Se crea `bandeja/src/datos.ts` con `entregables: Entregable[]`:

| id | título | proveedor | estado |
|----|--------|-----------|--------|
| E-101 | Informe de accesibilidad | Norte | pendiente |
| E-102 | Pruebas de carga | Sur | revisado |
| E-103 | Manual de operación | Norte | pendiente |
| E-104 | Inventario de componentes | Este | rechazado |
| E-105 | Plan de pruebas | Oeste | pendiente |
| E-106 | Acta de entrega | Sur | revisado |

En `App`, el objeto suelto se sustituye por el import de `entregables` y un `map`. `key={item.id}` va en el `<li>`, no dentro de `Tarjeta`.

```tsx
{entregables.map((item) => (
  <li key={item.id}>
    <Tarjeta item={item} />
  </li>
))}
```

Aparecen las seis. «Falta revisión» está en E-101, E-103 y E-105. No está en E-102, E-104 ni E-106. La consola no avisa de `key`.

Poner `estado: "listo"` en E-104 marca Problems en `datos.ts`, no en la página. Se restaura `"rechazado"`. Duplicar E-101 con el mismo id avisa en la consola. Se borra el duplicado. Cambiar `key={item.id}` por el índice del `map` no se ve con la lista quieta; el aviso de la consola, al repetir un id, es la señal de que la clave es el id.

Dónde queda: seis fichas. `Tarjeta` solo conoce `item`. El array está en `datos.ts`. El botón dice «Anotar» y todavía no hace nada. Eso es la página de eventos.

## Práctica

[M02-01 — La prop](../M02-props-lista-evento/M02-01-props.md), [M02-02 — El valor por defecto](../M02-props-lista-evento/M02-02-defecto.md), [M02-03 — La condición](../M02-props-lista-evento/M02-03-condicional.md) y [M02-04 — La lista](../M02-props-lista-evento/M02-04-lista.md).
