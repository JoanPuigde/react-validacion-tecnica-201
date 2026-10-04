# M05-01 — Cypress

[← Página anterior](README.md) · [Siguiente página →](M05-02-correccion.md)

> Práctica del módulo. La teoría y la demo están en el [README del módulo](README.md).

### Objetivo

Dejar en Cypress el recorrido de buscar un proveedor y el de marcar una ficha, y ver que el segundo falla.

### Prerrequisitos

- [M03-02](../M03-apis-y-arquitectura/M03-02-estructura.md): la bandeja carga el JSON, filtra por `#filtro` y tiene el botón «Marcar revisado».
- Para el servidor de Vite: no hace falta que tu `npm run dev` esté parado. El script de test usa el puerto 5173; si ya está ocupado, páralo con <kbd>Ctrl</kbd> + <kbd>C</kbd> antes de lanzar el test.

### En qué consiste

Amplías `cypress/e2e/bandeja.cy.js` y ejecutas `npm run test:e2e` desde `bandeja/`.

### 1 — Lanzar la prueba que ya está

**Acción:** en una terminal, dentro de `bandeja/`:

```bash
npm run test:e2e
```

**Por qué:** el script levanta `npm run dev`, espera `http://127.0.0.1:5173` y ejecuta Cypress. Así el test no depende de que te acuerdes de arrancar la app.

**Resultado esperado:** Cypress imprime 1 test pasando, el del título «Bandeja de entregables». El comando termina y devuelve el control de la terminal.

### 2 — Añadir el filtro

**Acción:** en `cypress/e2e/bandeja.cy.js`, dentro del `describe`, añade este caso después del que ya existe:

```js
it("filtra por proveedor", () => {
  cy.visit("/")
  cy.get("#filtro").type("Este")
  cy.contains("Inventario de componentes")
  cy.contains("Informe de accesibilidad").should("not.exist")
})
```

Vuelve a ejecutar `npm run test:e2e`.

**Por qué:** `#filtro` es el `id` del input. `not.exist` comprueba que el texto ya no está en la página, no solo que está oculto por CSS.

**Resultado esperado:** 2 tests pasando. Si `#filtro` no existe, Cypress falla al hacer `cy.get("#filtro")`: el laboratorio del estado no está aplicado.

### 3 — Añadir la pastilla

**Acción:** añade un tercer caso:

```js
it("marcar revisado cambia el estado visible", () => {
  cy.visit("/")
  cy.contains("article", "Informe de accesibilidad").within(() => {
    cy.contains("button", "Marcar revisado").click()
    cy.get(".estado").should("have.text", "revisado")
  })
})
```

Ejecuta `npm run test:e2e` otra vez.

**Por qué:** `within` ata la búsqueda a esa ficha. `have.text` lee la pastilla, no el botón.

**Resultado esperado:** el caso nuevo falla. Cypress esperaba que `.estado` tuviera el texto `revisado` y encontró `pendiente`. Los otros dos casos siguen pasando. No cambies el test para que busque «Hecho».

> [!WARNING]
> Afirmar `cy.contains("Hecho")` pondría el test en verde sin tocar el defecto. La pastilla es el dato que revisa otra persona.

## Comprueba tu entendimiento

**El fallo nombra la ficha**
Lee el mensaje de Cypress del caso que falló.
→ Menciona «Informe de accesibilidad» o el texto esperado `revisado`. No es un error de compilación de `App.jsx`.

## Reto

### 1 — Un caso para el vacío

Añade un caso que escriba `zzzz` en `#filtro` y compruebe el texto «Ningún entregable coincide.».

<details>
<summary>Ver solución</summary>

```js
it("avisa si el filtro no coincide", () => {
  cy.visit("/")
  cy.get("#filtro").type("zzzz")
  cy.contains("Ningún entregable coincide.")
})
```

Ese caso pasa con el JSX del módulo de la API. No sustituye al caso de la pastilla, que sigue en rojo hasta el laboratorio siguiente.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `Port 5173 is already in use` al lanzar el test | Tu `npm run dev` sigue activo | Páralo con <kbd>Ctrl</kbd> + <kbd>C</kbd> y repite `npm run test:e2e` |
| Cypress no arranca y falta una librería del sistema | El post-create no instaló las dependencias de Cypress | Vuelve a lanzar `bash .devcontainer/post-create.sh` desde la raíz del repo |
| `Timed out retrying` en `#filtro` | El input no tiene `id="filtro"` | Revisa el JSX del buscador en `App.jsx` |
