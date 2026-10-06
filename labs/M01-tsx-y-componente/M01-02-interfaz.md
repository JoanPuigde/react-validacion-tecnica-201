# M01-02 — La interfaz

[← Página anterior](M01-01-entorno.md) · [Siguiente página →](M01-03-componente.md)

> Un paso. El dato queda descrito y el editor avisa si no encaja.

### Objetivo

Declarar `Entregable` y usar un objeto de ese tipo en `App.tsx`.

### Prerrequisitos

- [M01-01](M01-01-entorno.md): la página está abierta y Vite sigue en marcha.

### 1 — Crear el contrato

**Qué agregamos:** el archivo `bandeja/src/modelo.ts`.

```tsx
export type EstadoEntregable = "pendiente" | "revisado" | "rechazado"

export interface Entregable {
  id: string
  titulo: string
  proveedor: string
  estado: EstadoEntregable
}
```

**Con esto conseguimos:** un nombre para el dato. `estado` solo admite esas tres cadenas.

**Validar:** el archivo guarda sin aviso. Todavía no cambia la página: nadie importa la interfaz.

### 2 — Usar un objeto y romperlo a propósito

**Qué agregamos:** en `src/App.tsx`, el import y una constante. Sustituye el return para pintar el título del objeto.

```tsx
import type { Entregable } from "./modelo"

const entrega: Entregable = {
  id: "E-101",
  titulo: "Informe de accesibilidad",
  proveedor: "Norte",
  estado: "pendiente",
}

export default function App() {
  return (
    <main>
      <h1>Bandeja de entregables</h1>
      <p>{entrega.titulo}</p>
    </main>
  )
}
```

**Con esto conseguimos:** el párrafo deja de ser la frase fija y pasa a ser el título del objeto.

**Validar:** la página dice «Informe de accesibilidad». Ahora cambia `estado: "pendiente"` por `estado: "listo"`, guarda y mira el editor.

→ TypeScript marca `estado`: `"listo"` no está en `EstadoEntregable`. La página puede seguir mostrando lo último que compiló. Devuelve `"pendiente"` antes de seguir. El aviso desaparece.

> [!WARNING]
> No uses `any` para callar el aviso. Si el error se va porque el campo pasa a `any`, el laboratorio no está hecho.

## Comprueba tu entendimiento

**Un campo de más no es el problema; uno mal tipado, sí**
Vuelve a dejar el objeto como al principio. Quita la línea `proveedor` un momento.
→ El editor pide `proveedor`. Al restaurarla, el aviso se va y la página sigue en «Informe de accesibilidad».

## Reto

### 1 — El id no es un número

Pasa `id: 101` sin comillas.

<details>
<summary>Ver solución</summary>

TypeScript marca `id` porque la interfaz pide `string`. Déjalo en `"E-101"`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `entrega` está declarado y no se usa | El párrafo sigue con texto fijo | El `<p>` tiene que ser `{entrega.titulo}` |
| No aparece el aviso al poner `"listo"` | El archivo no es `.tsx` o no guardaste | Guarda `App.tsx` y lee el problema en la pestaña Problems |
