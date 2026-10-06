# M03-03 — El flujo

[← Página anterior](M03-02-derivado.md) · [Siguiente página →](M03-04-useeffect.md)

> Práctica de [Flujo de datos](../M02-estado-y-hooks/02-flujo.md).

### Objetivo

Cambiar `estado` a `"revisado"` desde el padre, sin mutar el objeto viejo.

### Prerrequisitos

- [M03-02](M03-02-derivado.md): `visibles` sale de `entregables` y de `texto`. El botón todavía llama a `anotar`.

### En qué consiste

La lista pasa a estado. La función baja a la tarjeta. El experimento muta el objeto para ver que a veces no hay repintado, y lo deshace.

### 1 — La lista y la función en el padre

**Dónde:** `App.tsx`. `visibles` tiene que filtrar `items`, no `entregables`.

**Qué haces:**

1. `const [items, setItems] = useState(entregables)`.
2. Cambia el `filter` para que parta de `items`.
3. Declara `marcar` y pásala en el `map`: `alMarcar={marcar}`.
4. Guarda sin tocar todavía `Tarjeta`.

```tsx
function marcar(id: string): void {
  setItems((lista) =>
    lista.map((item) =>
      item.id === id ? { ...item, estado: "revisado" } : item,
    ),
  )
}
```

**Experimento:** mira Problems.

→ `Tarjeta` no acepta `alMarcar`. El aviso es la señal de que el padre ya envía la función. No borres el atributo.

**Validación:**

- Problems habla de la prop `alMarcar`, no de un fallo de sintaxis.
- `visibles` filtra `items`.

### 2 — El hijo deja la consola

**Dónde:** `Tarjeta.tsx`.

**Qué haces:**

1. Añade a `TarjetaProps`: `alMarcar: (id: string) => void`.
2. Recíbela en la desestructuración.
3. Borra `anotar`.
4. El botón llama a `alMarcar(item.id)` y el texto depende de `item.estado`.
5. Guarda.

```tsx
<button type="button" onClick={() => alMarcar(item.id)}>
  {item.estado === "revisado" ? "Hecho" : textoBoton} {item.id}
</button>
```

**Experimento:** pulsa «Anotar E-101». Mira pastilla, frase «Falta revisión» y texto del botón. Recarga.

→ La pastilla pasa a `revisado`, la frase desaparece en esa ficha y el botón dice «Hecho E-101». E-103 sigue pendiente. Al recargar, E-101 vuelve a pendiente: el estado salió de `useState(entregables)` y la recarga lo reinicia.

Segundo experimento: dentro de `marcar`, sustituye el objeto nuevo por una mutación.

```tsx
lista.forEach((item) => {
  if (item.id === id) item.estado = "revisado"
})
return lista
```

Pulsa otra ficha pendiente. Si la pastilla no cambia, era esto: la misma referencia de array. Restaura el `map` con `{ ...item, estado: "revisado" }` y pulsa de nuevo.

**Validación:**

- Problems vacío.
- Un clic cambia solo esa ficha.
- Tras recargar, los pendientes del archivo vuelven.
- En `Tarjeta.tsx` no queda `console.log` ni `anotar`.

## Comprueba tu entendimiento

**El filtro no borra la marca**
Escribe `Norte`, marca E-101 y no borres la caja.

→ E-101 sigue visible, en `revisado`. E-103 sigue pendiente al lado. El filtro no mira el estado salvo que lo hayas metido en el `blob`.

## Reto

### 1 — Marcar todas por un fallo de comparación

Quita la condición `item.id === id` y devuelve siempre el objeto con `estado: "revisado"`. Pulsa una ficha. Deshazlo.

<details>
<summary>Ver solución</summary>

Todas las pastillas pasan a `revisado`. El `map` tiene que devolver `item` tal cual cuando el id no coincide, y el objeto nuevo solo cuando coincide.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Todas pasan a revisado | El `map` no compara el id | Solo el id pulsado cambia |
| `alMarcar is not a function` | No se pasa en el `map` | `<Tarjeta item={item} alMarcar={marcar} />` |
| La pastilla no cambia | Mutas el objeto y devuelves el mismo array | `{ ...item, estado: "revisado" }` |
