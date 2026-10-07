# J01-07 — Eventos

[← Página anterior](J01-06-props.md) · [Siguiente página →](../J02-estado/README.md)

> Laboratorio de [Eventos](README.md).

### Objetivo

Ver que el clic espera a la flecha, y que el manejador es una prop que sube al padre.

### Código de partida

El botón de `Tarjeta` tiene `onClick={() => alMarcar(item.id)}` y `type="button"`. `App` pasa `alMarcar={marcar}`. Si el botón no tiene `onClick`, pégalo así.

### 1 — La flecha

**Dónde:** `Tarjeta.tsx`, el botón. La consola del navegador, abierta.

**Qué haces:**

1. Recarga. No pulses. Confirma que la consola no se llena de ids por pintar.
2. Cambia el `onClick` a `onClick={alMarcar(item.id)}`. Guarda y lee Problems o la consola.
3. Restaura `onClick={() => alMarcar(item.id)}`.
4. Pulsa «Anotar E-101». Mira la pastilla y E-103. Recarga.

**Experimento:** quita `type="button"` y vuelve a ponerlo. Aquí no hay formulario; el atributo deja la intención escrita.

→ Sin la flecha, la llamada no espera al clic. Con la flecha, E-101 pasa a `revisado` y el botón dice «Hecho E-101». E-103 sigue pendiente. Al recargar, E-101 vuelve a pendiente.

**Validación:**

- El `onClick` tiene `() =>`.
- Problems vacío.
- La URL no cambia al pulsar.

## Comprueba tu entendimiento

**Quién cambia la pastilla**
`Tarjeta` no llama a `setItems`. Llama a `alMarcar`.
→ La función que copia el objeto está en el padre, o en el hook si ya lo tienes.

## Reto

### 1 — El tipo del evento

Pasa el evento y escribe su `type`, sin `any`.

<details>
<summary>Ver solución</summary>

```tsx
onClick={(evento: React.MouseEvent<HTMLButtonElement>) => {
  console.log(evento.type)
  alMarcar(item.id)
}}
```

Al pulsar, la consola escribe `click` y la pastilla cambia. Puedes dejar solo `() => alMarcar(item.id)`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La pastilla cambia al cargar | El `onClick` llama a la función al pintar | `() => alMarcar(item.id)` |
| Un clic no hace nada | Falta `alMarcar` en la etiqueta | `alMarcar={marcar}` en el `map` |
| Cambia otra ficha | La función cierra sobre un id fijo | El argumento es `item.id` de esa ficha |
