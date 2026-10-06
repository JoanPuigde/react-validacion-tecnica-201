# M02-03 — La condición

[← Página anterior](M02-02-defecto.md) · [Siguiente página →](M02-04-lista.md)

> Un paso. Una frase entra en la interfaz solo cuando el dato lo pide.

### Objetivo

Mostrar «Falta revisión» únicamente si `item.estado` es `"pendiente"`.

### Prerrequisitos

- [M02-02](M02-02-defecto.md): la ficha tiene pastilla y botón.

### 1 — Pintar o no pintar

**Qué agregamos:** debajo de la pastilla.

```tsx
{item.estado === "pendiente" ? <p>Falta revisión</p> : null}
```

**Con esto conseguimos:** la frase depende del dato. `null` no deja un párrafo vacío.

**Validar:** con `estado: "pendiente"` se lee «Falta revisión». Cambia el objeto de `App` a `estado: "revisado"`.

→ La frase desaparece y la pastilla queda verde. Devuelve `"pendiente"` y la frase vuelve.

## Comprueba tu entendimiento

**Rechazado tampoco muestra la frase**
Pon `estado: "rechazado"`.
→ No está «Falta revisión». Restaura `"pendiente"`.

## Reto

### 1 — La otra rama también pinta

Sustituye `null` por `<p>Ya tiene estado</p>` y prueba `"revisado"` y `"pendiente"`.

<details>
<summary>Ver solución</summary>

Con `revisado` aparece «Ya tiene estado». Con `pendiente`, «Falta revisión». Deja otra vez `: null` para que la ausencia no ocupe un párrafo.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Se ven las dos frases a la vez | Hay dos párrafos fijos, no un ternario | Un solo `{condición ? ... : null}` |
| La frase no se va al cambiar el estado | Comparas con `"Pendiente"` y el dato va en minúscula | La comparación es `"pendiente"` |
