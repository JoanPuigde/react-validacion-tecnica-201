# M03-02 — El derivado

[← Página anterior](M03-01-usestate.md) · [Siguiente página →](M03-03-flujo.md)

> Práctica de [Estado y valor derivado](../M02-estado-y-hooks/01-estado.md).

### Objetivo

Filtrar las fichas con `texto` sin guardar esa lista en otro estado.

### Prerrequisitos

- [M03-01](M03-01-usestate.md): la caja está controlada por `texto`. El `map` todavía recorre `entregables` entero.

### En qué consiste

Un `const` calculado. El experimento lo convierte en estado para ver que la caja y las fichas se separan, y luego lo devuelve a cálculo.

### 1 — Calcular visibles

**Dónde:** `App.tsx`, justo después de `useState`. El `map` pasa a recorrer `visibles`.

**Qué haces:**

1. Declara `visibles`.
2. Cambia `entregables.map` por `visibles.map`.
3. Encima de la `<ul>`, añade el aviso de vacío.
4. Guarda.

```tsx
const visibles = entregables.filter((item) => {
  const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
  return blob.includes(texto.toLowerCase())
})
```

```tsx
{visibles.length === 0 ? <p>Ningún entregable coincide.</p> : null}
```

**Experimento:**

1. Escribe `Este`. Cuenta fichas.
2. Borra. Cuenta otra vez.
3. Escribe `zzzz`.
4. Abre `datos.ts` y cuenta objetos del array, con `zzzz` todavía en la caja.
5. Vacía la caja.

→ Con `Este`, una ficha: «Inventario de componentes». Al borrar, seis. Con `zzzz`, ninguna ficha y la frase «Ningún entregable coincide.». `datos.ts` sigue teniendo seis objetos.

Segundo experimento: sustituye el cálculo por estado.

```tsx
const [visiblesEstado, setVisiblesEstado] = useState(entregables)
```

Pinta `visiblesEstado` en el `map`. Escribe en la caja.

→ La caja cambia y las fichas no. Nadie llama a `setVisiblesEstado`. Borra ese estado y vuelve a pintar el `const visibles`.

**Validación:**

- `Este` deja una ficha. La caja vacía deja seis. `zzzz` deja la frase y cero fichas.
- `visibles` es un `const`, no un `useState`.
- El `map` no recorre `entregables` directamente.
- Problems vacío. `visibles` se usa en el `map` y en el aviso.

## Comprueba tu entendimiento

**Mayúsculas**
Escribe `este` en minúscula.

→ Sigue apareciendo el inventario, porque los dos lados de `includes` van en minúsculas. Si solo pasa con `Este`, falta un `toLowerCase`.

## Reto

### 1 — Filtrar también por el estado escrito

Añade `item.estado` al `blob` y escribe `rechazado`.

<details>
<summary>Ver solución</summary>

Queda E-104. El estado forma parte del texto buscado. Puedes dejarlo en el `blob`: no rompe la búsqueda por `Este`. Si lo quitas, `rechazado` ya no encuentra esa ficha y `Este` sí.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El filtro no responde | El `map` sigue en `entregables` | Recorre `visibles` |
| Distingue mayúsculas y parece roto | Falta `toLowerCase` en un lado | Los dos lados van en minúscula |
| `visibles` no se usa | Declaraste el filtro y no lo pintas | `map` y el aviso de longitud lo usan |
