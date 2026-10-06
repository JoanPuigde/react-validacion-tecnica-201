# M01-03 — El componente

[← Página anterior](M01-02-interfaz.md) · [Siguiente página →](M01-04-expresiones.md)

> Un paso. El dato se pinta desde una función propia, no desde `App`.

### Objetivo

Crear `Tarjeta` como componente funcional y usarlo una vez.

### Prerrequisitos

- [M01-02](M01-02-interfaz.md): `entrega` existe en `App.tsx` y el párrafo muestra su título.

### 1 — Sacar la función

**Qué agregamos:** `bandeja/src/componentes/Tarjeta.tsx`. El objeto se muda aquí. En `App.tsx` borra `entrega` y el import de `modelo` si ya no se usa.

```tsx
import type { Entregable } from "../modelo"

const entrega: Entregable = {
  id: "E-101",
  titulo: "Informe de accesibilidad",
  proveedor: "Norte",
  estado: "pendiente",
}

export default function Tarjeta() {
  return <p>{entrega.titulo}</p>
}
```

En `App.tsx` solo queda el uso:

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

**Con esto conseguimos:** `App` compone. `Tarjeta` pinta. Sigue siendo una función, no una clase.

**Validar:** la página sigue diciendo «Informe de accesibilidad» bajo el título. En `App.tsx` no queda la palabra `Entregable`. Si `entrega` sigue en `App` y no se usa, el editor la marca: bórrala de ahí.

## Comprueba tu entendimiento

**El nombre del fichero y el de la función coinciden en el import**
El import es `./componentes/Tarjeta`, sin extensión.
→ Vite resuelve `Tarjeta.tsx`. Si la carpeta se llama distinto, el navegador muestra el error de import en la terminal.

## Reto

### 1 — Envolver la ficha

Dentro del return de `Tarjeta`, envuelve el párrafo en un `<article>`. No copies el `<h1>` de `App`.

<details>
<summary>Ver solución</summary>

```tsx
export default function Tarjeta() {
  return (
    <article>
      <p>{entrega.titulo}</p>
    </article>
  )
}
```

Aparece el recuadro de la ficha. El título grande sigue saliendo solo de `App`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `entrega is not defined` en `App` | Borraste la constante y el JSX todavía la usa | `App` solo renderiza `<Tarjeta />` |
| Pantalla en blanco y error de import | La ruta no lleva `componentes/` | `import Tarjeta from "./componentes/Tarjeta"` |
