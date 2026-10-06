# Flujo de datos

[← Página anterior](01-estado.md) · [Siguiente página →](03-efecto.md)

El estado baja. El aviso sube. `Tarjeta` no llama a `setItems`. Recibe una función y la llama con el id.

```tsx
function marcar(id: string): void {
  setItems((lista) =>
    lista.map((item) =>
      item.id === id ? { ...item, estado: "revisado" } : item,
    ),
  )
}
```

`...item` copia los campos y `estado` sustituye uno. El resto de objetos de la lista se reaprovechan. Mutar `item.estado = "revisado"` y devolver el mismo objeto a veces no vuelve a pintar: la referencia del array no cambió.

En la tarjeta, la prop es `(id: string) => void`. El botón deja de escribir en la consola y pasa a `alMarcar(item.id)`. La pastilla lee `item.estado`. Si el botón dice «Hecho» porque mira otro campo, la pastilla puede seguir en `pendiente`. La verdad del entregable es `estado`.

El filtro no borra esa marca. Con `Norte` escrito en la caja, marcar E-101 lo deja en pantalla, ahora revisado, porque el filtro mira título, proveedor e id.

> [!NOTE]
> Al recargar, la lista vuelve al array inicial. El estado de React no es el JSON y todavía no es un servidor. Eso llega en el módulo de la petición.

## Demostración guiada

`App` pasa `alMarcar={marcar}` en el `map`. Pulsar «Anotar E-101» cambia la pastilla a `revisado`, quita «Falta revisión» en esa ficha y el botón pasa a «Hecho». E-103 sigue pendiente. Recargar devuelve E-101 a pendiente.

Si el `map` olvida comparar el id, todas las fichas cambian a la vez. Con la comparación, solo cambia la pulsada.

## Práctica

[M03-03 — El flujo](../M03-estado-y-flujo/M03-03-flujo.md).
