# J01-01 — Introducción a React

[← Página anterior](README.md) · [Siguiente página →](J01-02-spa.md)

> Laboratorio de [Introducción a React](README.md).

### Objetivo

Ver que el título de la página sale del componente `App`, no del HTML.

### Código de partida

El repo ya tiene la bandeja. `npm run dev` en `bandeja/` y el puerto 5173. No hace falta otro archivo.

### 1 — Del HTML al componente

**Dónde:** `bandeja/index.html`, `bandeja/src/main.tsx` y `bandeja/src/App.tsx`.

**Qué haces:**

1. En `index.html`, localiza `<div id="raiz">`. No lo cambies.
2. En `main.tsx`, localiza `createRoot` y `<App />`.
3. En `App.tsx`, cambia el texto del `<h1>` a `Bandeja en revisión`. Guarda.
4. Mira el navegador. Restaura `Bandeja de entregables`.

**Experimento:** borra un momento el `id="raiz"` del HTML y guarda. Lee la terminal de Vite o la consola. Restaura `id="raiz"`.

→ Sin el nodo, `main.tsx` lanza «No está el nodo #raiz» y la página no pinta. Con el id restaurado, vuelve el título.

**Validación:**

- El `<h1>` del navegador coincide con el de `App.tsx`.
- `index.html` no contiene el texto «Bandeja de entregables».

## Comprueba tu entendimiento

**Quién pinta**
El título está en `App`, y `main.tsx` monta `App` en `#raiz`.
→ Cambiar el `<h1>` y guardar cambia la página. Cambiar un comentario del HTML no cambia ese título.

## Reto

### 1 — El párrafo que no está en el HTML

Añade bajo el `<h1>` un `<p>Hola</p>`. Guarda. Quítalo.

<details>
<summary>Ver solución</summary>

«Hola» aparece en el navegador y no está en `index.html`. Al quitar el párrafo, desaparece.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La página no cambia | Miras `index.html` | El título está en `App.tsx` |
| `No está el nodo #raiz` | El `id` del `div` no coincide | `id="raiz"`, como en `main.tsx` |
