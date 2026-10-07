# J05-03 — Cypress

[← Página anterior](J05-02-vision.md) · [Siguiente página →](J05-04-entregable.md)

> Laboratorio de [Cypress](README.md).

### Objetivo

Añadir el caso que escribe `Este` y verlo fallar cuando el texto no está.

### Código de partida

`bandeja/cypress/e2e/bandeja.cy.js` tiene el caso del título. El input de la bandeja tiene `id="filtro"`. `npm run dev` está parado.

### 1 — El caso del filtro

**Dónde:** dentro del `describe`, después del caso del título.

**Qué haces:**

1. Añade el `it`.
2. `npm run test:e2e` en `bandeja/`.
3. Cambia `"Este"` por `"zzzz"` y relanza.
4. Restaura `"Este"` y relanza.

```js
it("filtra por Este", () => {
  cy.visit("/")
  cy.get("#filtro").type("Este")
  cy.contains("Inventario de componentes")
  cy.contains("Informe de accesibilidad").should("not.exist")
})
```

**Experimento:** con `zzzz`, lee el mensaje de Cypress. Nombra el texto que no encontró, no una variable.

→ Pasan el título y el filtro con `Este`. Con `zzzz`, falla «Inventario de componentes». Al restaurar, los dos pasan.

**Validación:**

- El caso del título sigue.
- `#filtro` encuentra el input.
- El archivo se queda con `"Este"`.

## Comprueba tu entendimiento

**Qué no afirma**
El caso no pulsa «Anotar».
→ La pastilla puede estar mal y este `it` pasa. El reto lo cubre.

## Reto

### 1 — La pastilla

Añade un caso que, en el artículo de «Informe de accesibilidad», pulse el botón que contiene «Anotar» y lea `revisado` en `.estado`.

<details>
<summary>Ver solución</summary>

```js
it("marca el informe", () => {
  cy.visit("/")
  cy.contains("article", "Informe de accesibilidad").within(() => {
    cy.contains("button", "Anotar").click()
    cy.get(".estado").should("have.text", "revisado")
  })
})
```

Al cargar, el botón dice «Anotar E-101». Tras el clic, la pastilla es `revisado`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No encuentra `#filtro` | El `id` del input es otro | `id="filtro"` |
| Falla con el inventario | El filtro distingue mal las mayúsculas, o el caso sigue en `zzzz` | `texto.toLowerCase()` y el caso en `"Este"` |
| Puerto ocupado | `dev` en marcha | Páralo y relanza |
