# J01-05 — Componentes

[← Página anterior](J01-04-jsx.md) · [Siguiente página →](J01-06-props.md)

> Laboratorio de [Componentes](README.md).

### Objetivo

Comprobar que las seis fichas salen de una función `Tarjeta`, y que `App` solo la usa.

### Código de partida

Existe `bandeja/src/componentes/Tarjeta.tsx`. `App.tsx` lo importa y lo pone en un `map`. Si no existe, créalo con el archivo de [J01-06](J01-06-props.md), sección de la función, y úsalo desde `App`.

### 1 — Una función, varias fichas

**Dónde:** `Tarjeta.tsx` y `App.tsx`.

**Qué haces:**

1. Cuenta cuántas veces aparece `function Tarjeta` en el proyecto. Tiene que ser una.
2. Cambia el título de la ficha a `{item.proveedor}`. Guarda.
3. Lee las seis fichas.
4. Restaura `{item.titulo}`.

**Experimento:** en `Tarjeta.tsx`, cambia el import del tipo a `./modelo`. Guarda. Restáuralo a `../modelo`.

→ Las fichas muestran el proveedor y luego otra vez el título. `./modelo` no resuelve: el archivo está dentro de `componentes/`. `../modelo` sí.

**Validación:**

- Un solo `Tarjeta.tsx`.
- `App` no contiene el `<article>` de la ficha.
- Problems vacío.

## Comprueba tu entendimiento

**Componente y elemento**
`Tarjeta` es la función. El `<h1>` de `App` es un elemento.
→ La función se importa. El `<h1>` se escribe donde se pinta.

## Reto

### 1 — App sin la ficha

Borra el import de `Tarjeta` y deja el `<Tarjeta />` en el `map`. Lee el aviso. Restaura el import.

<details>
<summary>Ver solución</summary>

`Tarjeta` no está definido. La página puede quedar en blanco. El import `./componentes/Tarjeta` lo resuelve.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Seis funciones copiadas | El marcado está repetido en `App` | Un `map` y un solo archivo |
| No resuelve `modelo` | El import no sube de carpeta | `../modelo` |
