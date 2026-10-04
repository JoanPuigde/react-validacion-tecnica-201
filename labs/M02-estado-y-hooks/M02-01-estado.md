# M02-01 — Estado

[← Página anterior](README.md) · [Siguiente página →](M02-02-efectos.md)

> Práctica del módulo. La teoría y la demo están en el [README del módulo](README.md).

### Objetivo

Filtrar las fichas por texto y hacer que cada tarjeta pueda marcarse, sin perder la lista original.

### Prerrequisitos

- [M01-03](../M01-fundamentos/M01-03-componentes.md): existe `src/componentes/Tarjeta.jsx` y `App` la usa.
- `npm run dev` sigue en marcha.

### En qué consiste

Sustituyes el import pintado tal cual por estado, una caja de búsqueda y una función `marcar` que viaja a la tarjeta por props.

### 1 — Darle estado a la lista y al filtro

**Acción:** deja `bandeja/src/App.jsx` así. `App` solo elige la pantalla. El estado va dentro de `Bandeja`, para que los hooks se llamen en todos los pintados de ese componente.

```jsx
import { useState } from "react"
import { entregables as iniciales } from "./datos.js"
import ListaPesada from "./variantes/ListaPesada.jsx"
import Tarjeta from "./componentes/Tarjeta.jsx"

export default function App() {
  const lenta = new URLSearchParams(window.location.search).has("lenta")
  if (lenta) return <ListaPesada />
  return <Bandeja />
}

function Bandeja() {
  const [items, setItems] = useState(iniciales)
  const [texto, setTexto] = useState("")

  const visibles = items.filter((item) => {
    const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
    return blob.includes(texto.toLowerCase())
  })

  function marcar(id) {
    setItems((lista) =>
      lista.map((item) => (item.id === id ? { ...item, marca: "revisado" } : item)),
    )
  }

  return (
    <main>
      <p className="kicker">Validación de proveedor</p>
      <h1>Bandeja de entregables</h1>
      <p className="lead">Revisión de lo que entrega el proveedor.</p>
      <label htmlFor="filtro">Buscar</label>
      <input
        id="filtro"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
      />
      {visibles.length === 0 ? <p>Ningún entregable coincide.</p> : null}
      <ul className="lista">
        {visibles.map((item) => (
          <li key={item.id}>
            <Tarjeta item={item} alMarcar={marcar} />
          </li>
        ))}
      </ul>
    </main>
  )
}
```

**Por qué:** `items` es la lista que manda. `visibles` se calcula. `setItems` con una función recibe la lista anterior y devuelve otra: el objeto de ese `id` es nuevo (`...item`) y el resto de objetos se reaprovechan.

**Resultado esperado:** aparece la caja «Buscar». Al escribir `Este`, solo queda «Inventario de componentes». Al borrar el texto, vuelven las seis fichas. Un texto como `zzzz` muestra «Ningún entregable coincide.»

### 2 — Mostrar la marca en la tarjeta

**Acción:** en `src/componentes/Tarjeta.jsx`, acepta `alMarcar` y cambia el botón.

```jsx
export default function Tarjeta({ item, alMarcar }) {
  return (
    <article>
      <h2>{item.titulo}</h2>
      <p>
        {item.id} · {item.proveedor}
      </p>
      <p className={`estado ${item.estado}`}>{item.estado}</p>
      <button type="button" onClick={() => alMarcar(item.id)}>
        {item.marca ? "Hecho" : "Marcar revisado"}
      </button>
    </article>
  )
}
```

Guarda los dos archivos.

**Por qué:** la tarjeta no conoce `setItems`. Avisa al padre con el id. El padre es el único que cambia la lista.

**Resultado esperado:** cada ficha tiene el botón «Marcar revisado». Al pulsarlo, ese botón pasa a decir «Hecho». La pastilla de estado sigue mostrando el valor de antes (`pendiente`, `revisado` o `rechazado`).

> [!TIP]
> Pulsa otra vez el mismo botón. Sigue diciendo «Hecho»: `marca` ya tiene valor y el texto no vuelve a «Marcar revisado».

## Comprueba tu entendimiento

**El filtro no borra datos**
Escribe `Norte`, cuenta las fichas y borra la caja.
→ Con `Norte` se ven dos fichas (E-101 y E-103). Al vaciar la caja vuelven las seis, y las que marcaste siguen en «Hecho».

## Reto

### 1 — Filtrar también por estado

Añade un segundo control, un `<select id="estado">`, con las opciones «todos», «pendiente», «revisado» y «rechazado». La lista visible tiene que cumplir el texto y el estado a la vez.

<details>
<summary>Ver solución</summary>

Un estado más: `const [estado, setEstado] = useState("todos")`.

En el filtro:

```jsx
const visibles = items.filter((item) => {
  const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
  const coincideTexto = blob.includes(texto.toLowerCase())
  const coincideEstado = estado === "todos" || item.estado === estado
  return coincideTexto && coincideEstado
})
```

El control:

```jsx
<label htmlFor="estado">Estado</label>
<select id="estado" value={estado} onChange={(evento) => setEstado(evento.target.value)}>
  <option value="todos">todos</option>
  <option value="pendiente">pendiente</option>
  <option value="revisado">revisado</option>
  <option value="rechazado">rechazado</option>
</select>
```

Elige «rechazado»: queda E-104. Elige «pendiente» y escribe `Oeste`: queda el plan de pruebas.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La caja no se puede editar | El `input` no tiene `value` y `onChange` a la vez, o `setTexto` no se llama | El `value` es `texto` y el `onChange` hace `setTexto(evento.target.value)` |
| Al marcar, todas las fichas dicen «Hecho» | `map` devolvió el mismo objeto cambiado para todas | Dentro del `map`, solo el `id` pulsado lleva `marca`; el resto se devuelve igual (`item`) |
| `alMarcar is not a function` | `Tarjeta` se usa sin la prop | En `App`, `<Tarjeta item={item} alMarcar={marcar} />` |
