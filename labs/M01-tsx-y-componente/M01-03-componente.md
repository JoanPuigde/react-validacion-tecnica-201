# M01-03 — El componente

[← Página anterior](M01-02-interfaz.md) · [Siguiente página →](M01-04-expresiones.md)

> Práctica de [TSX](../M01-fundamentos/02-tsx.md).

### Objetivo

Mover el objeto y su párrafo a una función `Tarjeta`, y dejar `App` solo como quien la usa.

### Prerrequisitos

- [M01-02](M01-02-interfaz.md): `entrega` está en `App.tsx` y el párrafo muestra «Informe de accesibilidad». Problems está vacío.

### En qué consiste

El dato cambia de archivo. La página, al final, se ve igual. El experimento comprueba que el objeto ya no puede quedarse en los dos sitios.

### 1 — Crear la función

**Dónde:** archivo nuevo `bandeja/src/componentes/Tarjeta.tsx`. `App.tsx` todavía no se toca.

**Qué haces:**

1. Crea la carpeta `src/componentes` y el archivo.
2. Escribe la función y guarda.

```tsx
import type { Entregable } from "../modelo"

const entrega: Entregable = {
  id: "E-101",
  titulo: "Informe de accesibilidad",
  proveedor: "Norte",
  estado: "pendiente",
}

export default function Tarjeta() {
  return (
    <article>
      <p>{entrega.titulo}</p>
    </article>
  )
}
```

La ruta del import sube un nivel (`../modelo`) porque el archivo está dentro de `componentes/`.

**Experimento:** cambia ese import a `./modelo` y guarda.

→ Problems o la terminal de Vite dicen que no resuelven el módulo. Restáuralo a `../modelo`.

**Validación:**

- `Tarjeta.tsx` no tiene subrayados.
- La página no ha cambiado: `App` todavía no usa el componente.
- El objeto sigue también en `App.tsx`. Es temporal. El paso 2 deja una sola copia.

### 2 — Usarla y borrar la copia de App

**Dónde:** `bandeja/src/App.tsx`.

**Qué haces:**

1. Borra el import de `Entregable` y la constante `entrega`.
2. Importa el componente.
3. Sustituye el `<p>` por `<Tarjeta />`.
4. Guarda los dos archivos.

```tsx
import Tarjeta from "./componentes/Tarjeta"

export default function App() {
  return (
    <main>
      <h1>Bandeja de entregables</h1>
      <Tarjeta />
    </main>
  )
}
```

**Experimento:** deja `entrega` declarada en `App.tsx` y no la uses.

→ Problems marca `entrega` como no usada. Bórrala de `App`. La que manda es la de `Tarjeta.tsx`.

**Validación:**

- El navegador sigue mostrando «Informe de accesibilidad» bajo el título, ahora dentro de un recuadro.
- En `App.tsx` no aparece la palabra `Entregable` ni `entrega`.
- En la terminal de Vite no hay un error de import. Si la página queda en blanco, la ruta del import no es `./componentes/Tarjeta`.

## Comprueba tu entendimiento

**El título grande no se muda**
El `<h1>` sigue en `App`. `Tarjeta` solo tiene el párrafo.
→ Hay un título de página y, debajo, el título del entregable. Si los dos dicen «Bandeja de entregables», el párrafo de `Tarjeta` no está leyendo `entrega.titulo`.

## Reto

### 1 — Cambiar el dato en el sitio correcto

En `Tarjeta.tsx`, pasa `titulo` a `Manual de operación`. Mira la página. Devuelve `Informe de accesibilidad`.

<details>
<summary>Ver solución</summary>

La página cambia porque el objeto vive en `Tarjeta`. Cambiar un objeto que ya no existe en `App` no haría nada. Al terminar, el título del entregable vuelve a ser «Informe de accesibilidad».

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Pantalla en blanco | Import mal escrito | `import Tarjeta from "./componentes/Tarjeta"` |
| `entrega is not defined` en `App` | Borraste la constante y el JSX aún la usa | `App` solo renderiza `<Tarjeta />` |
| Dos párrafos iguales | No borraste el `<p>` antiguo | Dentro de `<main>` quedan el `h1` y `<Tarjeta />` |
