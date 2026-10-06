# M02-05 — El evento

[← Página anterior](M02-04-lista.md) · [Siguiente página →](../M03-estado-y-flujo/M03-01-usestate.md)

> Práctica de [Eventos](../M01-fundamentos/04-eventos.md).

### Objetivo

Escribir el id en la consola al pulsar, y comprobar que cargar la página no dispara el manejador.

### Prerrequisitos

- [M02-04](M02-04-lista.md): hay seis tarjetas. El botón dice «Anotar» más el id. La consola del navegador está abierta.

### En qué consiste

Una función tipada y un `onClick` con flecha. El experimento quita la flecha y cuenta líneas al recargar.

### 1 — La función

**Dónde:** `Tarjeta.tsx`, dentro de la función, antes del `return`.

**Qué haces:**

1. Declara `anotar`.
2. En el botón, sustituye el contenido si hace falta y añade `onClick`.
3. Guarda.
4. Recarga la página con la consola abierta y no pulses todavía.

```tsx
function anotar(id: string): void {
  console.log(id)
}
```

```tsx
<button type="button" onClick={() => anotar(item.id)}>
  {textoBoton} {item.id}
</button>
```

**Experimento:** recarga y cuenta las líneas nuevas en la consola antes de pulsar.

→ Cero ids. Pulsa «Anotar E-104». Aparece una línea `E-104`. Pulsa «Anotar E-101». Se suma `E-101`. La pastilla de E-104 sigue en `rechazado`: este botón no modifica el objeto.

Segundo experimento: cambia el `onClick` a `onClick={anotar(item.id)}` y recarga.

→ La consola escribe los seis id al cargar. El clic ya no es lo que los produce. Restáuralo a `() => anotar(item.id)` y recarga. La consola vuelve a estar en silencio hasta el clic.

**Validación:**

- Tras recargar con la flecha puesta, no hay ids en la consola.
- Un clic escribe exactamente el id de esa ficha, una vez.
- La dirección de la página no cambia.
- Problems vacío. `anotar` se usa. Si el editor dice que no se usa, el `onClick` no la llama.

## Comprueba tu entendimiento

**Qué valor viaja**
Cambia la llamada a `anotar(item.estado)` y pulsa E-102. Restaura `item.id`.

→ Con `estado`, la consola escribe `revisado`. Con `id`, `E-102`. Las dos son `string`, por eso compilan. El laboratorio se queda con el id.

## Reto

### 1 — El tipo del evento

Pasa también el evento y escribe `evento.type`, sin `any`.

<details>
<summary>Ver solución</summary>

```tsx
function anotar(id: string, evento: React.MouseEvent<HTMLButtonElement>): void {
  console.log(id, evento.type)
}
```

```tsx
onClick={(evento) => anotar(item.id, evento)}
```

Al pulsar se ve `E-101 click`. Puedes dejar solo `anotar(item.id)` para los laboratorios siguientes: el evento no vuelve a hacer falta. Si lo dejas, no estorba.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Seis líneas al recargar | Paréntesis en el `onClick` | `() => anotar(item.id)` |
| `anotar` no se usa | El botón no tiene `onClick` | La flecha llama a `anotar` |
| Un clic escribe otro id | La función cierra sobre una variable fija | El argumento es `item.id` de esa ficha |
