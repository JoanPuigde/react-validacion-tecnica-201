# M05-05 — Un caso

[← Página anterior](M05-04-usecallback.md) · [Siguiente página →](../../README.md)

> Un paso. Un recorrido que escribe en el filtro y lee lo que quedó en la página.

### Objetivo

Añadir un caso a Cypress que deje solo el entregable del proveedor Este.

### Prerrequisitos

- [M05-04](M05-04-usecallback.md): `#filtro` filtra la lista que llega del JSON.
- Para el puerto: para tu `npm run dev` con <kbd>Ctrl</kbd> + <kbd>C</kbd> antes de lanzar el script. El script arranca el suyo.

### 1 — El caso del filtro

**Qué agregamos:** en `bandeja/cypress/e2e/bandeja.cy.js`, dentro del `describe`, después del caso del título.

```js
it("filtra por proveedor", () => {
  cy.visit("/")
  cy.get("#filtro").type("Este")
  cy.contains("Inventario de componentes")
  cy.contains("Informe de accesibilidad").should("not.exist")
})
```

En la terminal, dentro de `bandeja/`:

```bash
npm run test:e2e
```

**Con esto conseguimos:** Cypress abre la bandeja, espera a que el JSON pinte y comprueba el texto visible. No importa `useState`. Si el id del input cambia, el caso falla.

**Validar:** los dos casos pasan. El del título ya estaba. El nuevo encuentra el inventario y no el informe de accesibilidad.

## Comprueba tu entendimiento

**El caso lee la pantalla**
Cambia un momento el `type("Este")` por `type("zzzz")` y lanza otra vez el script. Restaura `"Este"`.
→ Falla buscando «Inventario de componentes», porque el filtro vacío de coincidencias no lo pinta. Con `"Este"`, vuelve a pasar.

## Reto

### 1 — La pastilla

Añade un caso que, en el artículo de «Informe de accesibilidad», pulse el botón y lea el texto `revisado` en `.estado`.

<details>
<summary>Ver solución</summary>

```js
it("marcar deja la pastilla en revisado", () => {
  cy.visit("/")
  cy.contains("article", "Informe de accesibilidad").within(() => {
    cy.contains("button", "Anotar").click()
    cy.get(".estado").should("have.text", "revisado")
  })
})
```

El botón dice «Anotar E-101». `contains` busca el trozo «Anotar». Tras el clic, la pastilla es `revisado`. Lanza `npm run test:e2e` otra vez: los tres casos pasan.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `Port 5173 is already in use` | `npm run dev` sigue abierto | Páralo y repite `npm run test:e2e` |
| No encuentra `#filtro` | El input no tiene ese `id` | `id="filtro"` en el buscador |
| El caso del título pasa y el filtro no | La lista no llega del JSON o el filtro no usa `texto` | Revisa el efecto de carga y el `useMemo` de `visibles` |
