# M04-02 — El fragmento

[← Página anterior](M04-01-children.md) · [Siguiente página →](M04-03-useref.md)

> Práctica de [children](../M01-fundamentos/05-children.md).

### Objetivo

Devolver el título y los hijos como hermanos, sin un `<section>` de más.

### Prerrequisitos

- [M04-01](M04-01-children.md): `Marco` envuelve la lista en un `<section>` y el encabezado dice «Lista».

### En qué consiste

Sustituir el nodo. El experimento quita el fragmento para ver el error de JSX y lo restaura. Luego se inspecciona el padre del `<h2>`.

### 1 — Quitar el section

**Dónde:** el `return` de `bandeja/src/componentes/Marco.tsx`. La interfaz no cambia.

**Qué haces:**

1. Sustituye `<section>` y `</section>` por `<>` y `</>`.
2. Guarda.
3. Inspecciona el encabezado «Lista» en las herramientas del navegador.

```tsx
return (
  <>
    <h2>{titulo}</h2>
    {children}
  </>
)
```

**Experimento:** borra `<>` y `</>` y deja el `<h2>` y `{children}` como dos hermanos sueltos. Guarda. Lee Problems. Restaura el fragmento.

→ Problems habla de JSX adyacente: un `return` de JSX tiene un solo nodo raíz. Con el fragmento, el archivo vuelve a guardar y las fichas siguen.

Segundo experimento: en el inspector, mira el padre del `<h2>`.

→ El padre es `<main>` (o el nodo que envuelve el return de `App`), no un `<section>`. Escribe `Este`: sigue quedando una ficha. El fragmento no toca el filtro.

**Validación:**

- Se lee «Lista» y las seis fichas con la caja vacía.
- El padre del `<h2>` no es `<section>`.
- Problems vacío.

## Comprueba tu entendimiento

**El fragmento no es una prop**
`titulo` y `children` siguen en la interfaz.
→ Solo cambió el nodo que los agrupa. Si borraste `children` de la interfaz, restaura `children: ReactNode`.

## Reto

### 1 — La forma larga

Escribe el fragmento como `<Fragment>` importándolo de `react`. Inspecciona otra vez. Puedes dejar `<>`.

<details>
<summary>Ver solución</summary>

```tsx
import { Fragment, type ReactNode } from "react"

return (
  <Fragment>
    <h2>{titulo}</h2>
    {children}
  </Fragment>
)
```

Tampoco hay un nodo extra. La forma corta `<>` es la que se queda.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Error de JSX adyacente | Dos elementos sueltos en el return | Envuélvelos en `<>...</>` |
| Sigue habiendo `<section>` | El return viejo no se sustituyó | El return de `Marco` empieza por `<>` |
