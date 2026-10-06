# M02-04 — La lista

[← Página anterior](M02-03-condicional.md) · [Siguiente página →](M02-05-evento.md)

> Un paso. El mismo componente, seis datos, cada uno con `key`.

### Objetivo

Recorrer un array `Entregable[]` y pintar una `Tarjeta` por elemento.

### Prerrequisitos

- [M02-03](M02-03-condicional.md): `Tarjeta` recibe `item` y ya no guarda el objeto dentro.

### 1 — El array tipado

**Qué agregamos:** `bandeja/src/datos.ts`.

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

**Con esto conseguimos:** una lista que solo acepta `Entregable`. Un `estado` mal escrito falla en este archivo, no en la pantalla.

**Validar:** cambia un momento el estado de E-104 a `"listo"`. El editor marca esa línea. Restáuralo a `"rechazado"`.

### 2 — El map

**Qué agregamos:** en `App.tsx`, quita la constante `entrega`. Importa el array y sustituye la etiqueta suelta.

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

**Con esto conseguimos:** seis fichas. `key` va en el `<li>`, que es el elemento que devuelve el `map`, y vale el id, que no cambia al reordenar.

**Validar:** se ven las seis fichas. «Falta revisión» está en E-101, E-103 y E-105, y no en E-102. La consola del navegador no avisa de `key`.

## Comprueba tu entendimiento

**La key no es la posición**
Pon `key={index}` usando el segundo argumento del `map` y mira el tipo: el index es `number`. Vuelve a `key={item.id}`.
→ Con el id, cada ficha queda atada al entregable. El aviso de `key`, si lo había, no está.

## Reto

### 1 — Un id repetido

Duplica el objeto E-101 dentro del array, con el mismo `id`.

<details>
<summary>Ver solución</summary>

La consola avisa de dos hijos con la misma `key`. Borra el duplicado. El array se queda en seis ids distintos.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Warning de `key` | `key` está dentro de `Tarjeta` | `key={item.id}` en el `<li>` |
| `entregables` no se usa y sigue la ficha única | No sustituiste `<Tarjeta item={entrega} />` | El único uso es el `map` |
