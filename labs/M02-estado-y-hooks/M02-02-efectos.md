# M02-02 — Efectos

[← Página anterior](M02-01-estado.md) · [Siguiente página →](../M03-apis-y-arquitectura/README.md)

> Práctica del módulo. La teoría y la demo están en el [README del módulo](README.md).

### Objetivo

Hacer que el título de la pestaña muestre cuántos entregables siguen pendientes, y que ese número se actualice cuando cambie el dato.

### Prerrequisitos

- [M02-01](M02-01-estado.md) aplicado en `App.jsx` y en `Tarjeta.jsx`.

### En qué consiste

Añades un `useEffect`, lo dejas primero sin dependencias para ver el valor congelado y después declaras la dependencia correcta.

### 1 — Contar pendientes

**Acción:** en la función `Bandeja` de `App.jsx`, junto a `visibles`, calcula:

```jsx
const pendientes = items.filter((item) => item.estado === "pendiente").length
```

**Por qué:** el número sale de `estado`, el campo que pinta la pastilla. No sale de `marca` ni del filtro.

**Resultado esperado:** el archivo guarda el número. La pantalla no cambia todavía: `pendientes` no se pinta.

### 2 — Escribir el título solo al montar

**Acción:** cambia el import de React a `import { useEffect, useState } from "react"` y añade el efecto debajo del cálculo de `pendientes`:

```jsx
useEffect(() => {
  document.title = `Pendientes: ${pendientes}`
}, [])
```

Guarda. Mira el texto de la pestaña del navegador.

**Por qué:** con `[]`, el efecto corre una vez, con el `pendientes` de ese primer pintado.

**Resultado esperado:** la pestaña dice «Pendientes: 3» (E-101, E-103 y E-105). Escribir en «Buscar» no cambia el título.

### 3 — Declarar la dependencia

**Acción:** sustituye el array vacío por `[pendientes]`. Guarda.

```jsx
useEffect(() => {
  document.title = `Pendientes: ${pendientes}`
}, [pendientes])
```

**Por qué:** React compara `pendientes` con el valor anterior. Si cambia, vuelve a ejecutar el efecto después de pintar.

**Resultado esperado:** la pestaña sigue en «Pendientes: 3». El filtro sigue sin cambiarla, porque filtrar no cambia `estado`.

> [!TIP]
> En la consola de React, si el efecto usa `pendientes` y el array no lo incluye, aparece un aviso de dependencias. El array `[pendientes]` lo apaga.

## Comprueba tu entendimiento

**El título no es el filtro**
Escribe `Sur` en «Buscar» y lee la pestaña. Borra el texto.
→ La pestaña permanece en «Pendientes: 3». En pantalla, con `Sur`, se ven dos fichas.

## Reto

### 1 — Limpiar el título al salir

Devuelve una función de limpieza que deje el título en «Bandeja de entregables» y escribe `limpieza` en la consola. Para verla en la misma página, extrae el efecto a un componente hijo y deja de pintarlo con un botón.

<details>
<summary>Ver solución</summary>

```jsx
useEffect(() => {
  document.title = `Pendientes: ${pendientes}`
  return () => {
    document.title = "Bandeja de entregables"
    console.log("limpieza")
  }
}, [pendientes])
```

La limpieza corre antes de repetir el efecto y al desmontar. Cambiar el número de pendientes (cuando más adelante `estado` cambie de verdad) escribe `limpieza` y vuelve a poner el título. Un cambio de URL a `/?lenta=1` abre otro documento: el título de esa pantalla sale del HTML, no de esta limpieza.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `useEffect is not defined` | El import no incluye `useEffect` | `import { useEffect, useState } from "react"` |
| El título no aparece | Miras el `<h1>`, no la pestaña | El texto está en la pestaña del navegador |
| El título se queda en un número viejo | El array de dependencias no incluye lo que el efecto lee | Añade `pendientes` al array |
