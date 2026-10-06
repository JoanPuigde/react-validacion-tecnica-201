# M01-04 — Expresiones

[← Página anterior](M01-03-componente.md) · [Siguiente página →](M01-05-clase.md)

> Práctica de [TSX](../M01-fundamentos/02-tsx.md).

### Objetivo

Pintar `id` y `proveedor` desde el objeto, y ver la diferencia entre una expresión y un texto fijo.

### Prerrequisitos

- [M01-03](M01-03-componente.md): `Tarjeta` pinta `{entrega.titulo}` dentro de un `<article>`. El objeto está en `Tarjeta.tsx`.

### En qué consiste

Un párrafo nuevo. El experimento quita las llaves para ver el nombre del campo en pantalla, y las devuelve.

### 1 — El párrafo con dos expresiones

**Dónde:** `bandeja/src/componentes/Tarjeta.tsx`, dentro del `<article>`, debajo del párrafo del título. No borres ese párrafo.

**Qué haces:**

1. Añade este bloque.
2. Guarda.
3. Mira la ficha, no el editor.

```tsx
<p>
  {entrega.id} · {entrega.proveedor}
</p>
```

El punto medio va fuera de las llaves: es texto fijo. `entrega.id` y `entrega.proveedor` van cada uno en su expresión.

**Experimento:** quita las llaves del id y deja la palabra `entrega.id` como texto. Guarda.

→ La ficha muestra la palabra `entrega.id`, no `E-101`. Vuelve a poner `{entrega.id}`.

Segundo experimento: en el objeto, cambia `proveedor: "Norte"` por `proveedor: "Sur"`. Guarda. Mira la segunda línea. Devuelve `"Norte"`.

→ La segunda línea pasa a `E-101 · Sur` y, al restaurar, a `E-101 · Norte`. El título «Informe de accesibilidad» no se mueve: es otra expresión.

**Validación:**

- Bajo el título del entregable se lee `E-101 · Norte`.
- No se leen las llaves en la página.
- Problems no marca `entrega.id` como no usado.

## Comprueba tu entendimiento

**Una sola expresión puede juntar los dos**
Sustituye el párrafo del título por `{`${entrega.id} — ${entrega.titulo}`}`.

→ Se lee `E-101 — Informe de accesibilidad`. Puedes dejar esa línea. El párrafo de id y proveedor sigue debajo.

## Reto

### 1 — Una expresión que no es un campo

Debajo, añade `<p>{entrega.id.length}</p>`.

<details>
<summary>Ver solución</summary>

Se ve `5`, la longitud de `"E-101"`. Es JavaScript dentro de las llaves, no un campo nuevo de la interfaz. Borra ese párrafo al terminar para no dejar un número suelto en la ficha. Si lo dejas, no rompe nada.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Se ve `{entrega.id}` con llaves | Las llaves quedaron dentro de un string | Tiene que ser JSX: `{entrega.id}`, no `"{entrega.id}"` |
| La segunda línea no cambia al editar `proveedor` | Estás editando otro archivo | El objeto está en `Tarjeta.tsx` |
