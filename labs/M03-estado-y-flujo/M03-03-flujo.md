# M03-03 — El flujo

[← Página anterior](M03-02-derivado.md) · [Siguiente página →](M03-04-useeffect.md)

> Un paso. El clic sube al padre. El padre entrega una lista nueva.

### Objetivo

Cambiar `estado` a `"revisado"` al pulsar, sin mutar el objeto viejo.

### Prerrequisitos

- [M03-02](M03-02-derivado.md): `visibles` sale de `entregables` y de `texto`.

### 1 — La lista pasa a estado

**Qué agregamos:** en `App.tsx`.

```tsx
const [items, setItems] = useState(entregables)
```

`visibles` tiene que filtrar `items`, no `entregables`.

```tsx
function marcar(id: string): void {
  setItems((lista) =>
    lista.map((item) =>
      item.id === id ? { ...item, estado: "revisado" } : item,
    ),
  )
}
```

En el `map`:

```tsx
<Tarjeta item={item} alMarcar={marcar} />
```

**Con esto conseguimos:** `marcar` crea un objeto nuevo solo para ese id. El resto de la lista se reaprovecha. `...item` copia los campos y `estado` los sustituye.

**Validar:** guarda. `Tarjeta` aún no acepta `alMarcar`, así que el editor marca la prop de más. Ese aviso es la señal de que el padre ya envía la función y el hijo todavía no la declara.

### 2 — El hijo deja de escribir en la consola

**Qué agregamos:** en `TarjetaProps`.

```tsx
alMarcar: (id: string) => void
```

En la desestructuración, recibe `alMarcar`. Borra `anotar`. El botón queda:

```tsx
<button type="button" onClick={() => alMarcar(item.id)}>
  {item.estado === "revisado" ? "Hecho" : textoBoton} {item.id}
</button>
```

**Con esto conseguimos:** la tarjeta no conoce `setItems`. Solo conoce una función.

**Validar:** el aviso de la prop desaparece. Pulsa «Anotar E-101».

→ La pastilla de E-101 pasa a `revisado`, «Falta revisión» desaparece en esa ficha y el botón dice «Hecho E-101». E-103 sigue pendiente. Recarga la página.

→ E-101 vuelve a pendiente: el estado sale del array inicial en cada carga. Todavía no hay servidor.

## Comprueba tu entendimiento

**No se muta el objeto**
Dentro de `marcar`, prueba `item.estado = "revisado"` y `return item` para todos, en lugar del objeto nuevo. Pulsa una ficha. Deshaz el cambio y deja el `map` con `{ ...item, estado: "revisado" }`.
→ Mutar el objeto a veces no vuelve a pintar, porque la referencia del array no cambió. El `map` con objeto nuevo sí cambia la pastilla.

## Reto

### 1 — El filtro sobrevive a la marca

Escribe `Norte`, marca E-101 y no borres la caja.
→ E-101 sigue en pantalla, ahora `revisado`, porque el filtro mira título, proveedor e id, no el estado. E-103 sigue pendiente a su lado.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Todas las fichas pasan a revisado | El `map` no compara `item.id === id` | Solo el id pulsado lleva el estado nuevo; el resto devuelve `item` |
| `alMarcar is not a function` | La prop no se pasa en el `map` | `<Tarjeta item={item} alMarcar={marcar} />` |
