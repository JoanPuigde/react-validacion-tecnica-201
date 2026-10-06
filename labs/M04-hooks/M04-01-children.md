# M04-01 — children

[← Página anterior](README.md) · [Siguiente página →](M04-02-fragmento.md)

> Un paso. Un componente pinta lo que le pongas dentro.

### Objetivo

Envolver la lista en `Marco` y ver el título que le pasas, más lo que va entre sus etiquetas.

### Prerrequisitos

- [M03-05](../M03-estado-y-flujo/M03-05-reglas.md): la lista y el filtro están en `App`, sin hooks después de un `return`.

### 1 — El marco

**Qué agregamos:** `bandeja/src/componentes/Marco.tsx`.

```tsx
import type { ReactNode } from "react"

interface MarcoProps {
  titulo: string
  children: ReactNode
}

export default function Marco({ titulo, children }: MarcoProps) {
  return (
    <section>
      <h2>{titulo}</h2>
      {children}
    </section>
  )
}
```

En `App.tsx`, envuelve el aviso de vacío y la `<ul>`:

```tsx
import Marco from "./componentes/Marco"

<Marco titulo="Lista">
  {visibles.length === 0 ? <p>Ningún entregable coincide.</p> : null}
  <ul className="lista">{/* el map que ya tienes */}</ul>
</Marco>
```

**Con esto conseguimos:** `children` es lo que escribes entre `<Marco>` y `</Marco>`. El tipo es `ReactNode`: elementos, texto o `null`. No es `any`.

**Validar:** sobre las fichas aparece el encabezado «Lista». Escribe `zzzz`.

→ «Ningún entregable coincide.» queda dentro de esa zona, bajo el encabezado «Lista». Vacía la caja.

## Comprueba tu entendimiento

**Sin children no hay lista**
Cierra `<Marco titulo="Lista" />` en autocierre, sin meter la `ul`.
→ Se ve «Lista» y ninguna ficha. Vuelve a poner la lista entre la apertura y el cierre.

## Reto

### 1 — children opcional

Marca `children?` en la interfaz y no pases hijos.

<details>
<summary>Ver solución</summary>

Compila, y la sección solo muestra «Lista». Para este curso los hijos son obligatorios: quita el `?` y deja la lista dentro.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `children` no se usa | El return no incluye `{children}` | Píntalo bajo el `<h2>` |
| El editor pide `titulo` | La etiqueta es `<Marco>` a secas | `<Marco titulo="Lista">` |
