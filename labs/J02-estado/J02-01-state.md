# J02-01 — State

[← Página anterior](README.md) · [Siguiente página →](J02-02-usestate.md)

> Laboratorio de [State](README.md).

### Objetivo

Ver que una variable normal no vuelve a pintar, y que mutar el mismo array tampoco.

### Código de partida

Si `App.tsx` no tiene la caja «Buscar» atada a `useState("")` y `marcar` con un `map`, sustituye el archivo por el de [J02-02](J02-02-usestate.md). `Tarjeta` recibe `alMarcar`.

### 1 — El let y la mutación

**Dónde:** `App.tsx`, el estado de la caja. Luego `marcar`.

**Qué haces:**

1. Sustituye el `useState` de `texto` por `let copia = ""`. El input usa `value={copia}` y `onChange` hace `copia = evento.target.value`.
2. Teclea. Restaura `useState`, `value={texto}` y `setTexto`.
3. En `marcar`, muta y devuelve la misma lista. Pulsa una ficha pendiente. Restaura el `map` con `{ ...item, estado: "revisado" }`.

```tsx
setItems((lista) => {
  lista.forEach((item) => {
    if (item.id === id) item.estado = "revisado"
  })
  return lista
})
```

**Experimento:** con el `let`, la caja no acumula. Con la mutación, la pastilla puede no cambiar. Con el `map`, sí cambia.

**Validación:**

- La caja vuelve a guardar lo escrito.
- `marcar` no asigna `item.estado`.
- Problems vacío.

## Comprueba tu entendimiento

**Qué recuerda React**
Recarga después de marcar.
→ La ficha vuelve a pendiente. El estado no es el archivo `datos.ts`.

## Reto

### 1 — push

Dentro de `marcar`, haz `lista.push` de una copia y devuelve `lista`. Mira si la ficha nueva aparece. Quita el `push`.

<details>
<summary>Ver solución</summary>

El mismo array, aunque tenga un elemento más, puede no pintarse. Se entrega un array nuevo: `[...lista, copia]`. En este laboratorio no se añade una ficha: se quita el `push` y se deja el `map`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La caja no escribe | Sigues en el `let` | `useState` y `setTexto` |
| La pastilla no cambia | La mutación sigue | `{ ...item, estado: "revisado" }` |
