# J05-01 — Estrategia

[← Página anterior](README.md) · [Siguiente página →](J05-02-vision.md)

> Laboratorio de [Estrategia de testing](README.md).

### Objetivo

Leer el caso que ya existe y escribir, en un comentario del propio archivo, lo que no cubre.

### Código de partida

`bandeja/cypress/e2e/bandeja.cy.js` visita `/` y busca el título. La bandeja tiene caja `#filtro` y fichas. Si no hay caja, pega el `App.tsx` de [J02-02](../J02-estado/J02-02-usestate.md).

### 1 — Lo que el caso no mira

**Dónde:** `bandeja.cy.js`, debajo del `it` del título.

**Qué haces:**

1. Lee el `it`.
2. Añade un comentario con tres cosas que no afirma.
3. No lances el script todavía. El laboratorio siguiente lo hace.

```js
// No mira: el filtro, la pastilla, el vacío de la caja.
```

**Experimento:** imagina el filtro roto y el título intacto. Di si este `it` fallaría.

→ No fallaría. El caso solo busca el `<h1>`. El comentario se queda hasta que el caso del filtro exista. Puedes borrarlo cuando [J05-03](J05-03-cypress.md) esté verde.

**Validación:**

- El `it` del título no se ha borrado.
- El comentario nombra el filtro.

## Comprueba tu entendimiento

**Qué afirmaría una persona**
Al escribir `Este`, una ficha se queda y otra no.
→ Eso es un caso. El título solo no lo es.

## Reto

### 1 — Otra frase que tampoco está cubierta

Añade al comentario «el foco de la etiqueta Buscar».
→ El caso del título no pulsa la etiqueta. El checklist de la jornada sí.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No hay archivo de Cypress | No estás en `bandeja/cypress/e2e/` | `bandeja.cy.js` |
| El comentario rompe el script | Quedó fuera de un `/* */` o sin `//` | Una línea `//` dentro del `describe` |
