# M01-03 — Componentes

[← Página anterior](M01-02-jsx-y-eventos.md) · [Siguiente página →](../M02-estado-y-hooks/README.md)

> Práctica del módulo. La teoría y la demo están en el [README del módulo](README.md).

### Objetivo

Sacar la ficha de `App.jsx` a un componente que recibe el entregable por props.

### Prerrequisitos

- [M01-02](M01-02-jsx-y-eventos.md) hecho: el botón «Anotar» está en cada ficha.

### En qué consiste

Creas `src/componentes/Tarjeta.jsx`, mueves el marcado y dejas `App` como lista que compone tarjetas.

### 1 — Crear el componente

**Acción:** crea la carpeta `bandeja/src/componentes/` y el archivo `Tarjeta.jsx` con este contenido:

```jsx
export default function Tarjeta({ item }) {
  return (
    <article>
      <h2>{item.titulo}</h2>
      <p>
        {item.id} · {item.proveedor}
      </p>
      <p className={`estado ${item.estado}`}>{item.estado}</p>
      <button type="button" onClick={() => console.log(item.id, item.proveedor)}>
        Anotar {item.id}
      </button>
    </article>
  )
}
```

**Por qué:** `item` es la prop. Quien use `Tarjeta` decide qué entregable es. La tarjeta no importa `datos.js`.

**Resultado esperado:** el archivo existe y el editor no marca la exportación en rojo. La bandeja todavía no cambia: `App` no usa el componente.

### 2 — Usarlo desde App

**Acción:** en `src/App.jsx`, importa la tarjeta y sustituye el contenido del `<li>` por el componente.

```jsx
import { entregables } from "./datos.js"
import ListaPesada from "./variantes/ListaPesada.jsx"
import Tarjeta from "./componentes/Tarjeta.jsx"
```

El `map` queda así:

```jsx
{entregables.map((item) => (
  <li key={item.id}>
    <Tarjeta item={item} />
  </li>
))}
```

Borra el `<h2>`, los `<p>` y el `<button>` que se han quedado sueltos dentro del `<li>`. Guarda.

**Por qué:** `key` se queda en el `<li>`, que es el elemento del `map`. `item={item}` entrega la prop que `Tarjeta` desempaqueta como `{ item }`.

**Resultado esperado:** la bandeja se ve igual que antes del cambio. El botón «Anotar E-101» sigue escribiendo `E-101 Norte` en la consola.

> [!TIP]
> Si al guardar la página queda en blanco, la terminal de Vite muestra el import que no resolvió. La ruta es `./componentes/Tarjeta.jsx`, con esa carpeta y esa mayúscula.

## Comprueba tu entendimiento

**La prop viaja del padre al hijo**
En `Tarjeta.jsx`, cambia de forma temporal el `<h2>` a `<h2>{item.proveedor}</h2>`, guarda, mira la página y deshaz el cambio.
→ Cada ficha muestra el proveedor como título (Norte, Sur, Este, Oeste). Al volver a `{item.titulo}`, regresan los nombres de los entregables.

## Reto

### 1 — Una prop para el texto del botón

Añade una prop `accion` y úsala como texto del botón, con un valor por defecto de «Anotar» si no te pasan nada. En `App`, pasa `accion="Registrar"` solo en la llamada.

<details>
<summary>Ver solución</summary>

En `Tarjeta.jsx`:

```jsx
export default function Tarjeta({ item, accion = "Anotar" }) {
```

y el botón:

```jsx
<button type="button" onClick={() => console.log(item.id, item.proveedor)}>
  {accion} {item.id}
</button>
```

En `App.jsx`:

```jsx
<Tarjeta item={item} accion="Registrar" />
```

Los botones pasan a decir «Registrar E-101». Si quitas `accion="Registrar"`, vuelven a decir «Anotar» por el valor por defecto del parámetro.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `Tarjeta is not defined` | Falta el `import` en `App.jsx` | Añade la línea `import Tarjeta from "./componentes/Tarjeta.jsx"` |
| Warning de `key` en la consola | `key` quedó dentro de `Tarjeta` y no en el `<li>` del `map` | Deja `key={item.id}` en el `<li>` |
| La ficha se ve sin borde de artículo | El `<article>` no sustituyó al `<li>` y hay cajas duplicadas | El borde puede ir en los dos. Revisa que no haya quedado el marcado viejo además de `<Tarjeta>` |
