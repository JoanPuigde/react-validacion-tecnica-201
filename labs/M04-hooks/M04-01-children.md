# M04-01 — children

[← Página anterior](README.md) · [Siguiente página →](M04-02-fragmento.md)

> Práctica de [children](../M01-fundamentos/05-children.md).

### Objetivo

Envolver la lista en `Marco` y comprobar que el título y lo de dentro viajan por sitios distintos.

### Prerrequisitos

- [M03-05](../M03-estado-y-flujo/M03-05-reglas.md): el filtro, la lista y los hooks están en `App`, antes de cualquier `return`.

### En qué consiste

Un componente con `titulo` y `children`. El experimento cierra la etiqueta sin hijos y la vuelve a abrir.

### 1 — El componente

**Dónde:** archivo nuevo `bandeja/src/componentes/Marco.tsx`. `App.tsx` no se toca todavía.

**Qué haces:**

1. Crea el archivo con la interfaz y la función.
2. Guarda.
3. Mira Problems. No esperes un cambio en la página.

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

**Experimento:** borra `{children}` del return y guarda.

→ Problems marca `children` como no usado. El archivo existe y la bandeja sigue igual: nadie importa `Marco`. Restaura `{children}` debajo del `<h2>`.

**Validación:**

- `children` es `ReactNode`, no `any`.
- Problems vacío en `Marco.tsx`.
- La página sigue sin el encabezado «Lista».

### 2 — Meter la lista dentro

**Dónde:** `App.tsx`. El aviso de vacío y la `<ul>` pasan a estar entre las dos etiquetas de `Marco`.

**Qué haces:**

1. Importa `Marco`.
2. Envuelve el aviso y la lista.
3. Guarda.
4. Escribe `zzzz` y luego vacía la caja.

```tsx
import Marco from "./componentes/Marco"

<Marco titulo="Lista">
  {visibles.length === 0 ? <p>Ningún entregable coincide.</p> : null}
  <ul className="lista">{/* el map que ya tienes */}</ul>
</Marco>
```

**Experimento:** cierra la etiqueta en autocierre, `<Marco titulo="Lista" />`, y deja la `<ul>` fuera. Guarda. Vuelve a meter la lista entre la apertura y el cierre.

→ En autocierre se lee «Lista» y las fichas quedan fuera del componente, o el editor se queja si dejaste la `ul` suelta en un sitio inválido. Con los hijos dentro, «Lista» queda encima de las fichas. Con `zzzz`, «Ningún entregable coincide.» queda debajo de «Lista».

Segundo experimento: quita el atributo `titulo`.

→ Problems pide `titulo`. Restáuralo a `"Lista"`.

**Validación:**

- Encima de las fichas se lee «Lista».
- Con `zzzz`, la frase de vacío está bajo ese encabezado. Al vaciar la caja, vuelven las seis fichas.
- `TarjetaProps` no ha cambiado. `Marco` no recibe `item`.

## Comprueba tu entendimiento

**Dos props, dos sitios**
Cambia `titulo="Lista"` por `titulo="Pendientes de hoy"` sin mover la `ul`.

→ Cambia el `<h2>`. Las fichas siguen. El título es la prop con nombre. Las fichas son `children`. Restaura `"Lista"`.

## Reto

### 1 — children opcional

Marca `children?` y usa el autocierre, sin hijos.

<details>
<summary>Ver solución</summary>

Compila y solo se ve «Lista». En este curso los hijos son obligatorios: quita el `?` y deja el aviso y la `<ul>` dentro de `Marco`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `children` no se usa | El return no incluye `{children}` | Píntalo bajo el `<h2>` |
| El editor pide `titulo` | La etiqueta es `<Marco>` a secas | `<Marco titulo="Lista">` |
| «Lista» no aparece | `App` no importa el componente | `import Marco from "./componentes/Marco"` |
