# M04-02 — El fragmento

[← Página anterior](M04-01-children.md) · [Siguiente página →](M04-03-useref.md)

> Un paso. El marco deja de inventar un `<section>` que no necesitamos.

### Objetivo

Devolver el título y los hijos como hermanos, sin nodo de más.

### Prerrequisitos

- [M04-01](M04-01-children.md): `Marco` envuelve la lista en un `<section>`.

### 1 — Sustituir el section

**Qué agregamos:** solo el return de `Marco.tsx`.

```tsx
return (
  <>
    <h2>{titulo}</h2>
    {children}
  </>
)
```

**Con esto conseguimos:** `<> </>` agrupa sin crear un elemento en el documento. El encabezado y la lista pasan a ser hijos directos de `<main>`.

**Validar:** en las herramientas del navegador, inspecciona «Lista». El padre del `<h2>` es `<main>`, no un `<section>`. Las fichas siguen filtrándose.

## Comprueba tu entendimiento

**Sigue haciendo falta un padre en el return**
Quita `<>` y `</>` y deja el `<h2>` y `{children}` como dos hermanos sueltos.
→ El archivo no compila: un return de JSX tiene un solo nodo raíz. Restaura el fragmento.

## Reto

### 1 — La forma larga

Escribe el fragmento como `<Fragment>` importándolo de `react`.

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

Inspecciona otra vez: tampoco hay un nodo extra. Puedes dejar la forma corta `<>`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Error de JSX adyacente | Dos elementos sueltos en el return | Envuélvelos en `<>...</>` |
