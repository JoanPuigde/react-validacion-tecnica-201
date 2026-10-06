# M01-02 — La interfaz

[← Página anterior](M01-01-entorno.md) · [Siguiente página →](M01-03-componente.md)

> Práctica de [TSX](../M01-fundamentos/02-tsx.md).

### Objetivo

Declarar `Entregable` y comprobar que el editor rechaza un objeto que no encaja.

### Prerrequisitos

- [M01-01](M01-01-entorno.md): `npm run dev` en marcha y el título visible.

### En qué consiste

Primero el contrato, sin usarlo. Después un objeto de ese tipo pintado en la página. El experimento consiste en romper el objeto y leer el aviso, no en dejarlo roto.

### 1 — El contrato, solo

**Dónde:** archivo nuevo `bandeja/src/modelo.ts`. No toques `App.tsx` todavía.

**Qué haces:**

1. Crea el archivo.
2. Pega este contenido y guarda.

```tsx
export type EstadoEntregable = "pendiente" | "revisado" | "rechazado"

export interface Entregable {
  id: string
  titulo: string
  proveedor: string
  estado: EstadoEntregable
}
```

**Experimento:** en la interfaz, cambia `titulo: string` por `titulo: number`. No hay nadie que la use, así que la página no se entera. Restaura `string` antes del paso 2.

**Validación:**

- El archivo guarda sin subrayado rojo.
- La página sigue igual: nadie importa `modelo.ts`.
- `estado` es el tipo `EstadoEntregable`, no `string` suelto. Si lo dejas en `string`, `"listo"` colará y el experimento del paso 2 no sirve.

### 2 — Un objeto de ese tipo en la página

**Dónde:** `bandeja/src/App.tsx`. El `h1` se queda. Sustituye el párrafo fijo.

**Qué haces:**

1. Añade el import de tipo en la primera línea.
2. Declara `entrega` encima de la función.
3. Cambia el `<p>` para que lea `entrega.titulo`.
4. Guarda.

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

**Experimento:** cambia solo `estado: "pendiente"` por `estado: "listo"`. Guarda. Abre la pestaña Problems del editor. No mires solo el navegador: Vite puede seguir mostrando el último compilado.

→ Problems marca `estado`. `"listo"` no está en `EstadoEntregable`. Devuelve `"pendiente"`. El aviso desaparece.

Segundo experimento, con el objeto ya válido: quita la línea `proveedor` y guarda.

→ Problems pide `proveedor`. Restáurala. La página sigue en «Informe de accesibilidad».

**Validación:**

- El párrafo del navegador es «Informe de accesibilidad», no la frase «Revisión de lo que entrega el proveedor.»
- Problems está vacío con el objeto restaurado.
- No hay `any` en `modelo.ts` ni en `App.tsx`. Si el aviso de `"listo"` desapareció porque cambiaste el campo a `any`, deshazlo.

## Comprueba tu entendimiento

**El id es texto**
Pon `id: 101` sin comillas. Mira Problems. Vuelve a `"E-101"`.
→ Problems dice que `number` no se puede asignar a `string`. Con las comillas, el aviso se va y la página no cambia de título.

## Reto

### 1 — Un campo que la interfaz no nombra

Añade `urgente: true` dentro del objeto.

<details>
<summary>Ver solución</summary>

Problems marca `urgente` como propiedad que no existe en `Entregable`. No amplíes la interfaz para callarlo. Borra esa línea.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `entrega` declarado y no usado | El `<p>` sigue con texto fijo | Tiene que ser `{entrega.titulo}` |
| La página no cambia y Problems está vacío | No guardaste, o miras otra pestaña del editor | Guarda `App.tsx` y lee Problems |
| `"listo"` no marca nada | `estado` en la interfaz es `string` | Tiene que ser `EstadoEntregable` |
