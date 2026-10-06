# M03-02 — El derivado

[← Página anterior](M03-01-usestate.md) · [Siguiente página →](M03-03-flujo.md)

> Un paso. La lista que se ve se calcula. No es otro estado.

### Objetivo

Filtrar las fichas con `texto` y avisar cuando no queda ninguna.

### Prerrequisitos

- [M03-01](M03-01-usestate.md): el input está controlado por `texto`. El `map` todavía recorre `entregables` entero.

### 1 — Calcular visibles

**Qué agregamos:** justo después de `useState`, y cambia el `map` para recorrer `visibles`.

```tsx
const visibles = entregables.filter((item) => {
  const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
  return blob.includes(texto.toLowerCase())
})
```

```tsx
{visibles.map((item) => (
  <li key={item.id}>
    <Tarjeta item={item} />
  </li>
))}
```

Encima de la `<ul>`:

```tsx
{visibles.length === 0 ? <p>Ningún entregable coincide.</p> : null}
```

**Con esto conseguimos:** cada letra recalcula la lista. `visibles` no se guarda: si lo metes en un `useState`, tendrías dos verdades.

**Validar:** escribe `Este`. Queda «Inventario de componentes». Borra y vuelven las seis. Escribe `zzzz`.

→ Se lee «Ningún entregable coincide.» y no hay fichas. Vacía la caja.

## Comprueba tu entendimiento

**El array original no se vacía**
Con `zzzz` en la caja, mira `entregables` en `datos.ts`.
→ Sigue teniendo seis objetos. Lo que está vacío es `visibles`.

## Reto

### 1 — Guardar el filtro en estado, y deshacerlo

Añade `const [visiblesEstado, setVisiblesEstado] = useState(entregables)` y pinta ese array en lugar de `visibles`. Escribe en la caja.

<details>
<summary>Ver solución</summary>

La caja cambia y las fichas no: nadie llama a `setVisiblesEstado`. Borra ese estado y vuelve a pintar `visibles`, el `const` calculado.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El filtro no distingue mayúsculas raras y parece roto | Comparas sin `toLowerCase` en uno de los dos lados | Los dos lados van en minúscula |
| Aviso de que `visibles` no se usa | El `map` sigue en `entregables` | El `map` recorre `visibles` |
