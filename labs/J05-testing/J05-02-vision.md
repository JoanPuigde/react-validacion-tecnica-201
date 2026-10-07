# J05-02 — Testing en React

[← Página anterior](J05-01-estrategia.md) · [Siguiente página →](J05-03-cypress.md)

> Laboratorio de [Testing en React](README.md).

### Objetivo

Lanzar el caso del título y comprobar que no lee el estado de React.

### Código de partida

`npm run dev` parado. El puerto 5173 libre. Terminal en `bandeja/`.

### 1 — El script

**Dónde:** la terminal, en `bandeja/`.

**Qué haces:**

1. Para `dev` con Ctrl+C si sigue abierto.
2. `npm run test:e2e`.
3. Lee el resumen. El caso del título pasa.
4. Abre `bandeja.cy.js` y busca `useState`. No está.

**Experimento:** cambia el texto que busca el caso a `Bandeja que no existe`. Relanza. Restaura `Bandeja de entregables`.

→ Con el texto falso, el caso falla porque la página no lo muestra. No falla por un estado interno. Al restaurar, pasa.

**Validación:**

- El comando es `npm run test:e2e` dentro de `bandeja/`.
- El caso del título pasa con el texto real.
- No has dejado el texto falso.

## Comprueba tu entendimiento

**Qué abre Cypress**
No importa `Tarjeta` en el test.
→ Abre la URL `/` en un navegador que arranca el propio script.

## Reto

### 1 — El puerto ocupado

Lanza `npm run dev` y, sin pararlo, `npm run test:e2e` en otra terminal.
→ El script no puede usar el 5173. Para `dev` y relanza el test.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Puerto en uso | `dev` sigue | Ctrl+C y otra vez `test:e2e` |
| Falla el título | El `<h1>` no dice «Bandeja de entregables» | Restaura el texto en `App.tsx` |
