# J01-06 — Props

[← Página anterior](J01-05-componentes.md) · [Siguiente página →](J01-07-eventos.md)

> Laboratorio de [Props](README.md).

### Objetivo

Ver que `item` es obligatorio, que `textoBoton` tiene defecto y que `key` es el id.

### Código de partida

`Tarjeta` recibe `item`. El botón usa `textoBoton`, con defecto `"Anotar"`. Si tu componente no tiene esa interfaz, sustituye `Tarjeta.tsx` por esta función y deja en `App` el `map` con `item={item}` y `alMarcar={marcar}`.

```tsx
import type { Entregable } from "../modelo"

interface TarjetaProps {
  item: Entregable
  textoBoton?: string
  alMarcar: (id: string) => void
}

export default function Tarjeta({
  item,
  textoBoton = "Anotar",
  alMarcar,
}: TarjetaProps) {
  return (
    <article>
      <p>{item.titulo}</p>
      <p>
        {item.id} · {item.proveedor}
      </p>
      <p className={`estado ${item.estado}`}>{item.estado}</p>
      {item.estado === "pendiente" ? <p>Falta revisión</p> : null}
      <button type="button" onClick={() => alMarcar(item.id)}>
        {item.estado === "revisado" ? "Hecho" : textoBoton} {item.id}
      </button>
    </article>
  )
}
```

### 1 — Quitar y devolver la prop

**Dónde:** `App.tsx`, la etiqueta del `map`. `key` sigue en el `<li>`.

**Qué haces:**

1. Quita `item={item}`. Lee Problems. Vuelve a ponerlo.
2. Añade `textoBoton="Registrar"` solo en esa etiqueta. Lee E-101.
3. Quita `textoBoton`.
4. Pasa `key` al `<Tarjeta>` y quítalo del `<li>`. Mira la consola. Devuelve `key={item.id}` al `<li>`.

**Experimento:** confirma en qué fichas se lee «Falta revisión».

→ Sin `item`, no compila. Con `textoBoton`, el botón de una ficha pendiente dice «Registrar» y el id. Sin el atributo, «Anotar». «Falta revisión» está en E-101, E-103 y E-105.

**Validación:**

- Problems vacío.
- `key` está en el `<li>`.
- `Tarjeta.tsx` no importa `datos.ts`.

## Comprueba tu entendimiento

**La prop sobrante**
Pasa `item={{ ...item, urgente: true }}`.
→ Problems marca `urgente`. Vuelve a `item={item}`.

## Reto

### 1 — El índice como key

Cambia `key={item.id}` por el índice del `map`. Compila. Vuelve al id.

<details>
<summary>Ver solución</summary>

El índice es `number` y compila. No se deja: al filtrar, la posición de una ficha cambia. La `key` del curso es `item.id`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El botón sale vacío | No está `= "Anotar"` | El defecto va en el parámetro |
| Aviso de `key` | `key` quedó dentro de `Tarjeta` | `key={item.id}` en el `<li>` |
