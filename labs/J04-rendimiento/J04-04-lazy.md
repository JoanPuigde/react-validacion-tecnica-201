# J04-04 — Lazy loading

[← Página anterior](J04-03-estado.md) · [Siguiente página →](J04-05-devtools.md)

> Laboratorio de [Lazy loading y code splitting](README.md).

### Objetivo

Cargar un componente en otro archivo del paquete, con un respaldo mientras llega.

### Código de partida

`App` pinta la lista. No importa de qué archivo salga `items`.

### 1 — El pie

**Dónde:** `bandeja/src/componentes/Pie.tsx` y `App.tsx`, debajo de la lista.

**Qué haces:**

1. Crea `Pie.tsx`.
2. Cárgalo con `lazy` y envuélvelo en `Suspense`.
3. Recarga. Abre Network y busca el archivo del pie.
4. Puedes dejar el pie.

```tsx
export default function Pie() {
  return <p>Lista de entregables.</p>
}
```

```tsx
import { lazy, Suspense } from "react"

const Pie = lazy(() => import("./componentes/Pie"))
```

```tsx
<Suspense fallback={<p>Cargando el pie…</p>}>
  <Pie />
</Suspense>
```

**Experimento:** escribe mal la ruta del import, `./componentes/NoEsta`. Recarga. Restaura `./componentes/Pie`.

→ Con la ruta mala, el respaldo se queda o la consola muestra el fallo del módulo. Con la ruta buena, se lee «Lista de entregables.» bajo la lista. El respaldo puede no llegar a verse: el archivo es pequeño.

**Validación:**

- `Pie` no está importado con un `import` normal además del `lazy`.
- La lista sigue filtrando.
- Problems vacío.

## Comprueba tu entendimiento

**Qué no acelera**
El pie no quita trabajo al filtro.
→ Parte el paquete. En esta pantalla no hay un panel pesado que justificar.

## Reto

### 1 — Sin Suspense

Quita `Suspense` y deja el `lazy`. Lee la consola. Vuelve a envolverlo.

<details>
<summary>Ver solución</summary>

React avisa de que falta un límite de `Suspense`. El pie vuelve a ir dentro.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `Pie is not defined` | Falta el `const Pie = lazy(...)` | El `lazy` está en `App`, no dentro del `return` |
| El respaldo no desaparece | La ruta del import no resuelve | `./componentes/Pie` |
