# M02-01 — La prop

[← Página anterior](README.md) · [Siguiente página →](M02-02-defecto.md)

> Un paso. `Tarjeta` deja de conocer el objeto concreto.

### Objetivo

Recibir un `Entregable` por la prop `item`.

### Prerrequisitos

- [M01-05](../M01-tsx-y-componente/M01-05-clase.md): `Tarjeta` pinta el objeto interno `entrega`.

### 1 — Declarar la prop y borrar el objeto interno

**Qué agregamos:** la interfaz del componente. Sustituye `entrega` por `item` en el JSX. Borra la constante `entrega`.

```tsx
import type { Entregable } from "../modelo"

interface TarjetaProps {
  item: Entregable
}

export default function Tarjeta({ item }: TarjetaProps) {
```

Donde ponía `entrega.`, ahora pone `item.`.

**Con esto conseguimos:** el componente no compila si quien lo usa no pasa `item`.

**Validar:** guarda `Tarjeta.tsx` sin tocar `App`. `<Tarjeta />` queda marcado: falta `item`. Ese aviso es el resultado de este paso. No lo tapes con `any` ni con `item?`.

### 2 — Pasar el objeto desde App

**Qué agregamos:** en `App.tsx`, el mismo objeto de antes, ahora como prop.

```tsx
import type { Entregable } from "./modelo"
import Tarjeta from "./componentes/Tarjeta"

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
      <Tarjeta item={entrega} />
    </main>
  )
}
```

**Con esto conseguimos:** el dato vive en el padre. La ficha solo lo muestra.

**Validar:** el aviso de `item` desaparece. La página vuelve a mostrar «Informe de accesibilidad», `E-101 · Norte` y la pastilla `pendiente`.

## Comprueba tu entendimiento

**Otro objeto, otra ficha**
Duplica la etiqueta y pasa un segundo objeto con `id: "E-104"`, `titulo: "Inventario de componentes"`, `proveedor: "Este"`, `estado: "rechazado"`.
→ Hay dos fichas. Quita la segunda antes del laboratorio de la lista: aquí solo tiene que quedar `entrega`.

## Reto

### 1 — Un campo que la interfaz no tiene

Pasa `item={{ ...entrega, urgente: true }}` sin ampliar `Entregable`.

<details>
<summary>Ver solución</summary>

TypeScript marca `urgente` como exceso de propiedad. No añadas el campo. Deja `<Tarjeta item={entrega} />`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `item` posiblemente indefinido dentro de `Tarjeta` | La prop quedó opcional (`item?`) | `item: Entregable`, sin `?` |
| La ficha en blanco | El JSX sigue leyendo `entrega` | Todas las lecturas pasan a `item` |
