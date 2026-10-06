# M02-05 — El evento

[← Página anterior](M02-04-lista.md) · [Siguiente página →](../M03-estado-y-flujo/README.md)

> Un paso. El clic llama a una función. Cargar la página, no.

### Objetivo

Escribir el id en la consola al pulsar el botón de esa ficha.

### Prerrequisitos

- [M02-04](M02-04-lista.md): hay seis tarjetas.

### 1 — La función, sin paréntesis en el onClick

**Qué agregamos:** dentro de `Tarjeta`, antes del `return`.

```tsx
function anotar(id: string): void {
  console.log(id)
}
```

En el botón, el manejador y el texto:

```tsx
<button type="button" onClick={() => anotar(item.id)}>
  {textoBoton} {item.id}
</button>
```

**Con esto conseguimos:** `anotar` solo acepta `string` y no devuelve nada. La flecha se ejecuta al pulsar. `void` deja escrito que no hay valor de vuelta.

**Validar:** abre la consola del navegador. Al cargar no aparece ningún `E-10x`. Pulsa «Anotar E-104».

→ La consola escribe `E-104` una vez. Pulsa «Anotar E-101».

→ Se suma `E-101`. La pastilla no cambia: este botón todavía no modifica datos.

> [!WARNING]
> `onClick={anotar(item.id)}` ejecuta la función al pintar. Verías los seis id al recargar y el clic no serviría. Tiene que ser `() => anotar(item.id)`.

## Comprueba tu entendimiento

**El tipo del id**
Cambia la llamada a `anotar(item.estado)` —sigue siendo `string`, así que compila— y pulsa una ficha. Luego restaura `item.id`.
→ Con `estado`, la consola escribe `pendiente` o `revisado`. Con `id`, vuelve a escribir `E-101`.

## Reto

### 1 — Pasar el evento y leer el tipo

Anota también el `type` del evento del ratón, sin usar `any`.

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

Al pulsar, la consola muestra `E-101 click`. `evento` llega tipado por `onClick`; no hace falta anotarlo a mano si no lo pasas a otra función.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Seis líneas en la consola al recargar | Paréntesis en el `onClick` | Flecha: `() => anotar(item.id)` |
| `anotar` marcado como no usado | El botón no llama a la función | El `onClick` tiene que referenciarla |
