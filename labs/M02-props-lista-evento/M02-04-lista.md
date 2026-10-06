# M02-04 — La lista

[← Página anterior](M02-03-condicional.md) · [Siguiente página →](M02-05-evento.md)

> Práctica de [Props](../M01-fundamentos/03-props.md).

### Objetivo

Pintar seis `Tarjeta` desde un `Entregable[]`, cada una con `key` estable.

### Prerrequisitos

- [M02-03](M02-03-condicional.md): `Tarjeta` solo conoce `item`. En `App` hay un único objeto `entrega`.

### En qué consiste

El array se crea en su archivo y se recorre. El experimento repite un id y mira la consola, y prueba la `key` por índice.

### 1 — El array tipado

**Dónde:** archivo nuevo `bandeja/src/datos.ts`.

**Qué haces:**

1. Crea el archivo con estos seis objetos.
2. Guarda.
3. No lo importes todavía.

```tsx
import type { Entregable } from "./modelo"

export const entregables: Entregable[] = [
  { id: "E-101", titulo: "Informe de accesibilidad", proveedor: "Norte", estado: "pendiente" },
  { id: "E-102", titulo: "Pruebas de carga", proveedor: "Sur", estado: "revisado" },
  { id: "E-103", titulo: "Manual de operación", proveedor: "Norte", estado: "pendiente" },
  { id: "E-104", titulo: "Inventario de componentes", proveedor: "Este", estado: "rechazado" },
  { id: "E-105", titulo: "Plan de pruebas", proveedor: "Oeste", estado: "pendiente" },
  { id: "E-106", titulo: "Acta de entrega", proveedor: "Sur", estado: "revisado" },
]
```

**Experimento:** cambia el estado de E-104 a `"listo"`. Guarda. Mira Problems en este archivo, no en la página.

→ Problems marca esa línea. Restáuralo a `"rechazado"`. Problems se vacía. La página sigue con una sola ficha: `App` todavía no importa el array.

**Validación:**

- Seis ids distintos, de E-101 a E-106.
- Problems vacío en `datos.ts`.

### 2 — El map

**Dónde:** `App.tsx`. Borra la constante `entrega` y su import de tipo si ya no se usa.

**Qué haces:**

1. Importa `entregables` desde `./datos`.
2. Sustituye la `<Tarjeta>` suelta por la lista.
3. Guarda.
4. Abre la consola del navegador y cuenta fichas.

```tsx
import { entregables } from "./datos"

<ul className="lista">
  {entregables.map((item) => (
    <li key={item.id}>
      <Tarjeta item={item} />
    </li>
  ))}
</ul>
```

**Experimento:** duplica el objeto E-101 dentro del array, con el mismo `id`. Guarda. Lee la consola. Borra el duplicado.

→ La consola avisa de dos hijos con la misma `key`. Al borrar el duplicado, el aviso no vuelve al recargar.

Segundo experimento: cambia `key={item.id}` por `key={index}` añadiendo el segundo argumento del `map`. Vuelve a `key={item.id}`.

→ Con el índice compila, porque es `number`. No lo dejes: al filtrar, la posición de una ficha cambia. La `key` del curso es `item.id`, en el `<li>`, no dentro de `Tarjeta`.

**Validación:**

- Se ven seis fichas.
- «Falta revisión» está en E-101, E-103 y E-105. No está en E-102 ni en E-106 ni en E-104.
- La consola, tras recargar sin el duplicado, no avisa de `key`.
- En `App.tsx` no queda la constante `entrega`.

## Comprueba tu entendimiento

**El componente no se copió seis veces**
`Tarjeta.tsx` sigue siendo un solo archivo.
→ Las seis fichas salen del `map`. Si hay seis funciones `Tarjeta` copiadas a mano, no es este paso.

## Reto

### 1 — Un elemento de menos

Quita `proveedor` de E-105 en el array.

<details>
<summary>Ver solución</summary>

Problems marca ese objeto: falta `proveedor`. La página puede seguir enseñando cinco fichas o la última compilación buena. Restaura `proveedor: "Oeste"`. Vuelven a ser seis y Problems se vacía.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Warning de `key` | `key` está dentro de `Tarjeta` | `key={item.id}` en el `<li>` |
| Sigue una sola ficha | El `map` no sustituyó a `<Tarjeta item={entrega} />` | El único uso es el `map` |
| `entregables` no se usa | Importaste el array y no lo recorres | El `map` llama a `entregables.map` |
