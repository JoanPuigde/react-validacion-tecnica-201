# M05-05 — Un caso

[← Página anterior](M05-04-usecallback.md) · [Siguiente página →](../../README.md)

> Práctica de [El recorrido](../M05-testing-y-validacion/01-recorrido.md).

### Objetivo

Añadir un caso de Cypress que deje solo el entregable del proveedor Este, y leer el fallo cuando el texto no está.

### Prerrequisitos

- [M05-04](M05-04-usecallback.md): `#filtro` filtra la lista que llega del JSON. El botón de una ficha pendiente contiene la palabra «Anotar».
- Para el puerto: para `npm run dev` con <kbd>Ctrl</kbd> + <kbd>C</kbd> antes de lanzar el script. El script arranca el suyo.

### En qué consiste

Un `it` que escribe en la página. El experimento cambia el texto buscado, ve el caso rojo y lo restaura.

### 1 — El caso del filtro

**Dónde:** `bandeja/cypress/e2e/bandeja.cy.js`, dentro del `describe`, después del caso del título.

**Qué haces:**

1. Añade el caso.
2. En una terminal, entra en `bandeja/`.
3. Confirma que no hay un `npm run dev` usando el puerto 5173.
4. Lanza el script y espera a que termine.

```js
it("filtra por proveedor", () => {
  cy.visit("/")
  cy.get("#filtro").type("Este")
  cy.contains("Inventario de componentes")
  cy.contains("Informe de accesibilidad").should("not.exist")
})
```

```bash
npm run test:e2e
```

**Experimento:** cambia `type("Este")` por `type("zzzz")` y lanza otra vez. Lee el fallo. Restaura `"Este"` y lanza otra vez.

→ Con `zzzz`, el caso falla buscando «Inventario de componentes»: el filtro no lo pinta. Cypress no mira `useState`. Mira el texto de la página. Con `"Este"`, los dos casos pasan: el del título y el del filtro.

Segundo experimento: en `App.tsx`, cambia un momento `id="filtro"` por `id="busca"`, guarda y lanza el script. Restaura `id="filtro"`.

→ El caso no encuentra `#filtro`. El id del input es parte del recorrido. Déjalo en `filtro`.

**Validación:**

- `npm run test:e2e` termina con los dos casos en verde.
- El caso nuevo contiene `type("Este")`.
- `id="filtro"` sigue en el input.
- No dejaste `npm run dev` y el script peleándose por el puerto.

## Comprueba tu entendimiento

**Qué afirma cada línea**
`cy.get("#filtro")` encuentra el input. `type("Este")` escribe. `contains` exige el inventario. `should("not.exist")` exige que el informe no esté.
→ Si quitas la última línea, el caso pasa aunque el informe siga en pantalla. Las dos comprobaciones hacen falta.

## Reto

### 1 — La pastilla

Añade un caso que, en el artículo de «Informe de accesibilidad», pulse el botón y lea `revisado` en `.estado`. Lanza otra vez el script.

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

El botón dice «Anotar E-101». `contains` busca el trozo «Anotar». Tras el clic, la pastilla es `revisado`. Los tres casos pasan.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `Port 5173 is already in use` | `npm run dev` sigue abierto | Páralo y repite `npm run test:e2e` |
| No encuentra `#filtro` | El input no tiene ese `id` | `id="filtro"` en el buscador |
| El caso del título pasa y el filtro no | La lista no llega del JSON o el filtro no usa `texto` | Revisa el efecto de carga y el `useMemo` de `visibles` |
| El reto no encuentra «Anotar» | El botón ya dice «Hecho» al cargar | El caso visita `/` de nuevo; E-101 empieza en `pendiente` |
