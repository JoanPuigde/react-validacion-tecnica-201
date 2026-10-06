# M02-01 — La prop

[← Página anterior](README.md) · [Siguiente página →](M02-02-defecto.md)

> Práctica de [Props](../M01-fundamentos/03-props.md).

### Objetivo

Hacer que `Tarjeta` reciba el entregable por `item`, y que no compile si esa prop falta.

### Prerrequisitos

- [M01-05](../M01-tsx-y-componente/M01-05-clase.md): el objeto `entrega` vive dentro de `Tarjeta.tsx` y la pastilla lee `entrega.estado`.

### En qué consiste

Primero se declara la prop y se rompe `App` a propósito. Después se pasa el objeto y se borra la copia interna.

### 1 — Declarar la prop y dejar de usarla

**Dónde:** `bandeja/src/componentes/Tarjeta.tsx`.

**Qué haces:**

1. Añade la interfaz y cambia la firma de la función.
2. Sustituye cada `entrega.` del JSX por `item.`.
3. Borra la constante `entrega`.
4. Guarda. No pases todavía la prop desde `App`.

```tsx
import type { Entregable } from "../modelo"

interface TarjetaProps {
  item: Entregable
}

export default function Tarjeta({ item }: TarjetaProps) {
```

**Experimento:** no hagas nada más. Mira Problems en `App.tsx`.

→ `<Tarjeta />` está marcado: falta `item`. Ese aviso es el resultado de este paso. No lo tapes con `item?` ni con `any`.

**Validación:**

- En `Tarjeta.tsx` no queda el nombre `entrega`.
- Problems señala la etiqueta de `App`, no el interior de `Tarjeta`.
- La página puede quedar en el último pintado bueno. No sigas hasta leer el aviso.

### 2 — Pasar el objeto desde el padre

**Dónde:** `bandeja/src/App.tsx`.

**Qué haces:**

1. Importa el tipo.
2. Declara `entrega` encima de `App`.
3. Escribe `<Tarjeta item={entrega} />`.
4. Guarda.

```tsx
import type { Entregable } from "./modelo"
import Tarjeta from "./componentes/Tarjeta"

const entrega: Entregable = {
  id: "E-101",
  titulo: "Informe de accesibilidad",
  proveedor: "Norte",
  estado: "pendiente",
}
```

**Experimento:** quita `item={entrega}` y guarda. Lee Problems. Vuelve a poner el atributo.

→ Sin el atributo, falta `item`. Con él, Problems se vacía.

Segundo experimento: duplica la etiqueta y pasa un objeto en línea con `id: "E-104"`, `titulo: "Inventario de componentes"`, `proveedor: "Este"`, `estado: "rechazado"`.

→ Hay dos fichas. La segunda pastilla es rosada. Borra esa segunda etiqueta antes del laboratorio de la lista. Tiene que quedar solo `entrega`.

**Validación:**

- Una ficha: «Informe de accesibilidad», `E-101 · Norte`, pastilla `pendiente`.
- Problems vacío.
- El objeto ya no está declarado dentro de `Tarjeta.tsx`.

## Comprueba tu entendimiento

**La prop sobrante también se marca**
Pasa `item={{ ...entrega, urgente: true }}`.

→ Problems marca `urgente`. Vuelve a `<Tarjeta item={entrega} />`.

## Reto

### 1 — Cambiar el título desde el padre

En el objeto de `App`, cambia `titulo` a `Plan de pruebas`. No abras `Tarjeta.tsx`. Restaura el título al acabar.

<details>
<summary>Ver solución</summary>

La ficha cambia igual. El componente no tiene el título escrito dentro: pinta `item.titulo`. Al restaurar, vuelve «Informe de accesibilidad».

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `item` posiblemente indefinido | La prop quedó opcional | `item: Entregable`, sin `?` |
| La ficha en blanco | El JSX de `Tarjeta` sigue leyendo `entrega` | Todas las lecturas son `item.` |
| Sigue el aviso de prop ausente | El atributo no es `item` | `<Tarjeta item={entrega} />` |
