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

Punto de partida: caja «Buscar», `visibles` calculado, seis fichas al vaciar la caja. El botón de cada ficha llama a `anotar` y la consola recibe el id. La lista que se pinta sigue siendo el import de `datos.ts`, no un estado.

### 1 — La lista pasa a estado

`const [items, setItems] = useState(entregables)`. `visibles` filtra `items`, no `entregables`. Al recargar se ven las mismas seis: el inicial es ese array. `datos.ts` no se edita.

### 2 — El hijo avisa, el padre cambia una ficha

En `App`, antes del `return`:

```tsx
function marcar(id: string): void {
  setItems((lista) =>
    lista.map((item) =>
      item.id === id ? { ...item, estado: "revisado" } : item,
    ),
  )
}
```

En el `map`, `<Tarjeta item={item} alMarcar={marcar} />`. En `Tarjeta`, la prop es `alMarcar: (id: string) => void`. El botón deja la consola y pasa a `onClick={() => alMarcar(item.id)}`. El texto del botón: si `item.estado === "revisado"`, «Hecho»; si no, el `textoBoton`.

Pulsar «Anotar E-101» pone la pastilla en `revisado`, quita «Falta revisión» en esa ficha y el botón dice «Hecho E-101». E-103 sigue pendiente y sigue diciendo «Anotar». Recargar devuelve E-101 a pendiente: el estado salió de `useState(entregables)`.

### 3 — Sin comparar el id, cambian todas

Se quita `item.id === id` y el `map` devuelve `{ ...item, estado: "revisado" }` para cada elemento. Un clic pasa las seis a revisado. Se restituye la comparación. Un clic vuelve a tocar solo la ficha pulsada.

### 4 — El filtro no borra la marca

Se escribe `Norte`. Quedan E-101 y E-103. Se marca E-101. Sigue en pantalla, ahora en `revisado`, porque el filtro mira título, proveedor e id. E-103 sigue pendiente. Se borra la caja.

Dónde queda: marcar cambia `estado` en el padre. Al recargar hay tres pendientes: E-101, E-103 y E-105. La pestaña del navegador todavía dice el título del HTML. Eso es la página del efecto.

## Práctica

[M03-03 — El flujo](../M03-estado-y-flujo/M03-03-flujo.md).
