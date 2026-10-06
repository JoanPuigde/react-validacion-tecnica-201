# M01-05 — La clase

[← Página anterior](M01-04-expresiones.md) · [Siguiente página →](../M02-props-lista-evento/M02-01-props.md)

> Práctica de [TSX](../M01-fundamentos/02-tsx.md).

### Objetivo

Pintar el estado con `className`, de forma que el color salga del dato.

### Prerrequisitos

- [M01-04](M01-04-expresiones.md): la ficha muestra el título y la línea `E-101 · Norte`.
- `bandeja/src/estilos.css` ya define `.estado`, `.estado.pendiente`, `.estado.revisado` y `.estado.rechazado`. No hace falta escribir CSS.

### En qué consiste

Un párrafo más. El experimento cambia el estado del objeto y comprueba color y texto a la vez. Al final el objeto vuelve a `pendiente`.

### 1 — La clase sale del dato

**Dónde:** `Tarjeta.tsx`, dentro del `<article>`, después de la línea del id.

**Qué haces:**

1. Añade el párrafo.
2. Guarda.
3. Mira el color de la pastilla, no solo el texto.

```tsx
<p className={`estado ${entrega.estado}`}>{entrega.estado}</p>
```

**Experimento:** en el objeto, prueba uno a uno y restaura al final.

1. `estado: "revisado"`. Guarda.
2. `estado: "rechazado"`. Guarda.
3. `estado: "pendiente"`. Guarda.

→ Primero pastilla verde y texto `revisado`. Después rosada y `rechazado`. Al final beige y `pendiente`. Si el color no cambia, la clase es la palabra fija `estado` y no se está concatenando el valor.

Segundo experimento: escribe `class="estado"` en vez de `className`.

→ El editor marca `class`. Restáuralo a `className`.

**Validación:**

- Con el objeto en `"pendiente"`, se lee «pendiente» dentro de una pastilla beige.
- Problems está vacío.
- El atributo es `className`, y la template string incluye `${entrega.estado}`.

## Comprueba tu entendimiento

**Una clase que no existe**
Pon `className="estado urgente"` sin usar el dato. Mira el color. Vuelve a la template string.

→ La pastilla queda gris: existe `.estado` y no existe `.urgente`. Al restaurar, el beige vuelve porque el dato es `pendiente`.

## Reto

### 1 — El texto y la clase desacordados

Deja `className` leyendo `entrega.estado` y cambia el texto del párrafo a la palabra fija `ok`.

<details>
<summary>Ver solución</summary>

La pastilla sigue beige y el texto dice `ok`. El color y el texto ya no cuentan lo mismo. Vuelve a `{entrega.estado}` para que los dos salgan del mismo campo.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Siempre gris | No se concatena el estado | `` className={`estado ${entrega.estado}`} `` |
| El editor marca `class` | Atributo HTML | `className` |
| `"listo"` y no hay pastilla de color | El tipo no admite ese estado | Problems lo marca. Usa uno de los tres valores |
