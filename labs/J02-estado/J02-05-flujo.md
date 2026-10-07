# J02-05 — Flujo de datos

[← Página anterior](J02-04-ciclo.md) · [Siguiente página →](J02-06-separacion.md)

> Laboratorio de [Flujo de datos](README.md).

### Objetivo

Dejar el estado en el padre y el aviso en la ficha, y comprobar que solo cambia el id pulsado.

### Código de partida

`Tarjeta` tiene `alMarcar: (id: string) => void` y el botón llama a `alMarcar(item.id)`. `App` tiene `marcar` y pasa `alMarcar={marcar}`. Si no, pega la función de [J02-02](J02-02-usestate.md) y la prop de [J01-06](../J01-fundamentos/J01-06-props.md).

### 1 — Baja el dato, sube el id

**Dónde:** `marcar` en `App.tsx` y el botón en `Tarjeta.tsx`.

**Qué haces:**

1. Pulsa «Anotar E-101». Mira pastilla, «Falta revisión» y el botón. Mira E-103.
2. Recarga.
3. Quita `item.id === id` para que todos pasen a `revisado`. Pulsa una ficha.
4. Restaura la comparación.

**Experimento:** escribe `Norte`, marca E-101 y no borres la caja.

→ E-101 queda `revisado` y sigue visible. E-103, si está, sigue pendiente. Sin la comparación, un clic marca todas las que se ven. Al recargar, E-101 vuelve a pendiente.

**Validación:**

- El botón dice «Hecho» solo si `item.estado === "revisado"`.
- `Tarjeta` no importa `useState`.
- Problems vacío.

## Comprueba tu entendimiento

**La verdad del entregable**
Deja la pastilla leyendo `item.estado` y el botón siempre en «Anotar». Marca.
→ La pastilla cambia y el botón miente. Restaura el ternario del botón.

## Reto

### 1 — Avisar con el estado, no con el id

Cambia la prop a `(estado: string) => void` y pasa `item.estado`. Mira qué ficha cambia. Vuelve al id.

<details>
<summary>Ver solución</summary>

Varias fichas comparten `pendiente`. El padre no distingue cuál fue. El aviso vuelve a ser el id.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No cambia ninguna | `alMarcar` no está en la etiqueta | `alMarcar={marcar}` |
| Cambian todas | El `map` no compara el id | `item.id === id` |
