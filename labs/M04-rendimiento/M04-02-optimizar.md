# M04-02 — Una optimización

[← Página anterior](M04-01-medir.md) · [Siguiente página →](../M05-testing-y-validacion/README.md)

> Práctica del módulo. La teoría y la demo están en el [README del módulo](README.md).

### Objetivo

Conseguir que una letra en el filtro no vuelva a ejecutar todas las filas, y que el informe no viaje en la primera descarga de la variante.

### Prerrequisitos

- [M04-01](M04-01-medir.md): has visto el commit con muchas `Fila`.
- El archivo es `bandeja/src/variantes/ListaPesada.jsx`.

### En qué consiste

Memorizas `Fila` y pasas `Informe` a `lazy`. Vuelves a grabar el Profiler para comparar.

### 1 — Memorizar la fila

**Acción:** en `ListaPesada.jsx`, importa `memo` junto a `useMemo` y `useState`. Cambia la declaración de `Fila` a un componente memorizado. El cuerpo se queda igual.

```jsx
import { memo, useMemo, useState } from "react"

const Fila = memo(function Fila({ item, alElegir }) {
  const ruido = coste()
  return (
    <li>
      <button type="button" onClick={() => alElegir(item.id)}>
        {item.titulo}
        <span className="ruido">{ruido.toFixed(0)}</span>
      </button>
    </li>
  )
})
```

`alElegir` en el `map` sigue siendo `setElegido`, el setter de `useState`, que React mantiene estable. No pases `() => setElegido(item.id)` desde el padre: esa función sería nueva cada vez y `memo` no podría saltarse el render.

**Por qué:** al escribir, cambian `texto` y el array `visibles`, pero cada `item` que sigue en la lista es el mismo objeto del `useMemo`. Con props iguales, `memo` no llama a `coste()`.

**Resultado esperado:** escribir en «Filtrar» responde antes. En el Profiler, un commit de una letra ya no ejecuta las `Fila` cuyo texto no cambió. Las que desaparecen del filtro se desmontan; eso sí sale en el árbol como filas que ya no están.

### 2 — Cargar el informe aparte

**Acción:** quita `import Informe from "./Informe.jsx"`. Añade:

```jsx
import { lazy, memo, Suspense, useMemo, useState } from "react"

const Informe = lazy(() => import("./Informe.jsx"))
```

Envuelve el uso:

```jsx
{informe ? (
  <Suspense fallback={<p>Cargando informe…</p>}>
    <Informe />
  </Suspense>
) : null}
```

Guarda.

**Por qué:** `lazy` parte el módulo. Hasta que `informe` es verdadero, el navegador no pide ese archivo.

**Resultado esperado:** al recargar `/?lenta=1`, la pestaña Network no pide `Informe` todavía. Al pulsar «Ver informe», aparece una petición del módulo y luego el título «Informe de la variante». Puede verse un instante «Cargando informe…».

## Comprueba tu entendimiento

**El setter estable importa**
En el `map`, cambia de forma temporal `alElegir={setElegido}` por `alElegir={() => setElegido(item.id)}`, graba una letra y deshaz el cambio.
→ Con la función nueva, el Profiler vuelve a ejecutar las filas. Al restaurar `setElegido`, deja de hacerlo.

## Reto

### 1 — No memorizar la bandeja de seis

Abre `Tarjeta.jsx` y valora si `memo` cambiaría la revisión de la bandeja normal. No lo añadas si no puedes señalar un estado del padre que la repinte con coste visible.

<details>
<summary>Ver solución</summary>

No hace falta. Son seis fichas, sin trabajo artificial en el render. `memo` sería ruido en la revisión. La variante lenta sí tenía un coste medido. La bandeja se queda sin `memo`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `memo` no reduce las filas en el Profiler | Una prop es un objeto o una función recién creada | Pasa `setElegido` tal cual y no construyas estilos dentro del `map` |
| Error de `Suspense` al pulsar «Ver informe» | `Informe` es `lazy` y no está bajo `Suspense` | Envuelve `<Informe />` como en el paso 2 |
| Sigue pidiéndose `Informe` al recargar | Quedó el `import` estático además del `lazy` | Un solo enlace: el `lazy(() => import(...))` |
