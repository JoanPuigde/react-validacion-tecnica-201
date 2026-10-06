# M01-04 — Expresiones

[← Página anterior](M01-03-componente.md) · [Siguiente página →](M01-05-clase.md)

> Un paso. Entre llaves va JavaScript, no otra cadena escrita a mano.

### Objetivo

Mostrar identificador y proveedor desde el objeto, en el mismo párrafo.

### Prerrequisitos

- [M01-03](M01-03-componente.md): `Tarjeta` pinta `entrega.titulo`.

### 1 — Añadir una expresión

**Qué agregamos:** un párrafo nuevo dentro del `<article>` de `Tarjeta.tsx`. No sustituyas el del título.

```tsx
<p>
  {entrega.id} · {entrega.proveedor}
</p>
```

**Con esto conseguimos:** dos campos del objeto en la interfaz. Las llaves evaluán la expresión. El punto medio es texto fijo, fuera de las llaves.

**Validar:** bajo «Informe de accesibilidad» se lee `E-101 · Norte`. Cambia en el objeto `proveedor: "Norte"` por `proveedor: "Sur"`, guarda.

→ La ficha pasa a `E-101 · Sur`. Devuelve `"Norte"`.

## Comprueba tu entendimiento

**Sin llaves no hay dato**
Quita un momento las llaves y deja `entrega.id` como texto.
→ La página muestra la palabra `entrega.id`, no `E-101`. Vuelve a poner las llaves.

## Reto

### 1 — Juntar título e id en una sola expresión

En el párrafo del título, muestra `E-101 — Informe de accesibilidad` usando una template string.

<details>
<summary>Ver solución</summary>

```tsx
<p>{`${entrega.id} — ${entrega.titulo}`}</p>
```

La ficha enseña esa línea. El párrafo de id y proveedor puede quedarse.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Se ve `{entrega.id}` con las llaves en pantalla | Las llaves quedaron dentro de un string | Tiene que ser JSX: `{entrega.id}`, no `"{entrega.id}"` |
