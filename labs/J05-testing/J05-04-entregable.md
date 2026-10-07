# J05-04 — Validar un entregable

[← Página anterior](J05-03-cypress.md) · [Siguiente página →](J05-05-checklist.md)

> Laboratorio de [Validar un entregable](README.md).

### Objetivo

Recorrer la bandeja como quien la recibe y anotar una frase que no coincide.

### Código de partida

`npm run dev` otra vez en el 5173. El caso de Cypress puede quedarse. Este laboratorio es el navegador.

### 1 — Cuatro gestos

**Dónde:** la bandeja.

**Qué haces:**

1. Escribe `zzzz`. Anota la frase.
2. Borra. Pulsa la etiqueta «Buscar». Mira dónde está el foco.
3. Pulsa «Anotar» en E-101. Anota la pastilla y el botón.
4. Recarga. Anota si E-101 sigue revisado.

**Experimento:** si la pastilla no dice `revisado` tras el clic, no arregles todavía. Escribe la frase que viste. El laboratorio de riesgos vuelve a este fallo si lo dejas a propósito. Si la pastilla sí cambia, el entregable cumple ese gesto.

→ `zzzz` muestra «Ningún entregable coincide.». El foco cae en `#filtro` porque el `label` tiene `htmlFor="filtro"`. Tras recargar, E-101 vuelve a pendiente.

**Validación:**

- Has hecho los cuatro gestos.
- La URL no ha cambiado al marcar.
- `dev` sigue en marcha para el checklist.

## Comprueba tu entendimiento

**Qué no es validar**
Abrir `useState` y decir que el valor es el correcto no sustituye a la pastilla.
→ Quien recibe el código mira la pantalla. El caso de Cypress hace lo mismo.

## Reto

### 1 — La etiqueta suelta

Quita `htmlFor="filtro"` del `label`. Pulsa «Buscar». Restaura el atributo.

<details>
<summary>Ver solución</summary>

El foco no entra en la caja. `htmlFor` coincide con `id="filtro"`. Al restaurarlo, pulsar la etiqueta enfoca el input.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No hay fichas | `dev` está parado o el `fetch` apunta a una URL mala | `npm run dev` y la URL `/entregables.json` si ya la usas |
| El foco no entra | `htmlFor` no coincide con el `id` | Los dos dicen `filtro` |
