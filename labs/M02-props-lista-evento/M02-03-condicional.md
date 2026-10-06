# M02-03 — La condición

[← Página anterior](M02-02-defecto.md) · [Siguiente página →](M02-04-lista.md)

> Práctica de [Props](../M01-fundamentos/03-props.md).

### Objetivo

Mostrar «Falta revisión» solo cuando `item.estado` es `"pendiente"`.

### Prerrequisitos

- [M02-02](M02-02-defecto.md): la ficha tiene pastilla y botón «Anotar E-101». El objeto está en `App.tsx`.

### En qué consiste

Un ternario. El experimento recorre los tres estados y anota en qué casos se ve la frase.

### 1 — Pintar o no pintar

**Dónde:** `Tarjeta.tsx`, justo debajo de la pastilla de estado.

**Qué haces:**

1. Añade esta línea.
2. Guarda.
3. Confirma que el objeto de `App` sigue en `"pendiente"`.

```tsx
{item.estado === "pendiente" ? <p>Falta revisión</p> : null}
```

**Experimento:** en el objeto de `App`, cambia el estado y mira si la frase está. Restaura `"pendiente"` al acabar.

1. `"revisado"`.
2. `"rechazado"`.
3. `"pendiente"`.

→ Con `revisado` y con `rechazado` la frase no está. La pastilla sí cambia de color. Con `pendiente` la frase vuelve.

Segundo experimento: sustituye `null` por `<p>Ya tiene estado</p>` y prueba `"revisado"`.

→ Aparece «Ya tiene estado». Vuelve a `: null`. Con `pendiente`, solo «Falta revisión». No las dos.

**Validación:**

- Estado final del objeto: `"pendiente"`.
- Se leen la pastilla «pendiente» y la frase «Falta revisión».
- No hay un segundo párrafo fijo además del ternario. Si se ven las dos frases a la vez, hay un `<p>` suelto de más.

## Comprueba tu entendimiento

**La comparación es exacta**
Cambia la condición a `item.estado === "Pendiente"` con pe mayúscula, sin cambiar el dato.

→ La frase desaparece: el dato es `"pendiente"`. Restaura la minúscula. La frase vuelve.

## Reto

### 1 — Incluir rechazado en la frase de aviso

Haz que «Falta revisión» salga también cuando el estado es `"rechazado"`. Pruébalo y deja otra vez solo `"pendiente"`.

<details>
<summary>Ver solución</summary>

```tsx
{item.estado === "pendiente" || item.estado === "rechazado" ? (
  <p>Falta revisión</p>
) : null}
```

Con `"rechazado"` se ve la frase. Para seguir el curso, la condición se queda solo en `"pendiente"`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Las dos frases a la vez | Hay párrafos fijos además del ternario | Un solo `{condición ? ... : null}` |
| La frase no se va | Comparas con `"Pendiente"` | La cadena del dato es `"pendiente"` |
