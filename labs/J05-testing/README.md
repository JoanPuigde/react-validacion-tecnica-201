# Jornada 5 — Testing, validación y mejora

[← Página anterior](../J04-rendimiento/J04-07-lighthouse.md) · [Siguiente página →](J05-01-estrategia.md)

El caso que ya está en el repositorio visita `/` y busca el título. Sirve para saber que Vite arrancó. No mira el filtro ni la pastilla. Esta jornada añade el recorrido que sí importa y deja escrito qué se mira en una entrega aunque el test no lo cubra.

## Estrategia de testing

Un test de esta jornada afirma lo que vería una persona: un título presente, otro ausente, una pastilla con un texto. No afirma el valor de `useState`. Si el caso solo comprueba que el botón existe, pasa aunque la pastilla no cambie.

La pirámide, en esta bandeja, se queda en un extremo: un recorrido E2E del filtro y de la marca. No hay una suite de unidades de la ficha. El caso que se queda es el que falla cuando el texto de la página miente.

### Demostración

1. Se abre `bandeja/cypress/e2e/bandeja.cy.js`. El `it` existente visita `/` y busca el `<h1>`.
2. Se nombra lo que ese caso no mira: el filtro, la pastilla, el aviso de error.
3. Se decide un caso que sí lo mira: escribir `Este` y ver «Inventario de componentes», sin ver «Informe de accesibilidad».
4. Ese caso todavía no está. El laboratorio lo añade.

→ Laboratorio: [J05-01 — Estrategia](J05-01-estrategia.md).

## Testing en React

Cypress no monta el componente en un test de unidad. Abre la aplicación. El estado interno no se consulta. Si el filtro compara mal las mayúsculas, el caso lo ve porque el título no está en la página.

Corregir el fallo y borrar el caso deja la entrega como al principio: el siguiente cambio puede devolver el fallo sin que se vea.

### Demostración

1. Se para `npm run dev`. El script de Cypress arranca el suyo en el 5173.
2. `npm run test:e2e` en `bandeja/` ejecuta el caso del título. Pasa.
3. El caso no importa `App.tsx`. No hay un `expect` sobre `texto` ni sobre `items`.
4. Se vuelve a dejar el puerto libre para el `dev` cuando toque mirar la página a mano.

→ Laboratorio: [J05-02 — Testing en React](J05-02-vision.md).

## Cypress

El caso nuevo escribe en `#filtro`. El id del input tiene que ser `filtro`. El script se lanza con el puerto libre.

### Demostración

1. En `bandeja.cy.js`, después del caso del título, un `it` visita `/`, escribe `Este` en `#filtro`, ve «Inventario de componentes» y no ve «Informe de accesibilidad».
2. `npm run test:e2e`. Pasan los dos.
3. El texto pasa a `zzzz`. El caso falla buscando el inventario. Cypress cita el texto que no encontró.
4. Se restituye `Este`. Vuelve a pasar.

→ Laboratorio: [J05-03 — Cypress](J05-03-cypress.md).

## Validar un entregable

Validar es recorrer la pantalla como quien recibe el código, no como quien lo escribió. El caso automático cubre un flujo. El resto se mira: la pastilla, el foco de la etiqueta, el vacío, y la red si la lista viene por HTTP.

### Demostración

1. Con `dev` en el 5173, `zzzz` muestra «Ningún entregable coincide.».
2. Pulsar la etiqueta «Buscar» lleva el foco a `#filtro`.
3. Marcar E-101 deja la pastilla en `revisado` y el botón en «Hecho».
4. Recargar devuelve E-101 a pendiente. Si hay `fetch`, Network no repite el JSON al teclear.

→ Laboratorio: [J05-04 — Validar un entregable](J05-04-entregable.md).

## Checklist

El checklist es una lista corta que se puede repetir en otra entrega. Cada fila es una acción y lo que se ve. No es un formulario que se rellena.

| Acción | Se ve |
|--------|--------|
| Abrir `/` | El título «Bandeja de entregables» |
| Escribir `Norte` | Fichas de ese proveedor, no las seis |
| Escribir `zzzz` | «Ningún entregable coincide.» |
| Pulsar «Buscar» | El foco en `#filtro` |
| Marcar una pendiente | Pastilla `revisado` y botón «Hecho» |
| Recargar | La marca no se queda |

### Demostración

1. Se recorre la tabla en la bandeja, en ese orden.
2. Una fila que no se cumple se anota con la frase que se vio, no con una opinión.
3. El caso de Cypress cubre el título y el filtro de `Este`. No cubre el foco ni la recarga.
4. Esas filas se quedan en la página de la jornada, no hace falta otro archivo.

→ Laboratorio: [J05-05 — Checklist](J05-05-checklist.md).

## Riesgos

Un riesgo es un fallo que el caso no cubre y que puede volver. El botón que siempre dice «Anotar» pasa el caso del filtro. El `toLowerCase` quitado no lo pasa, si el caso escribe `Este` con mayúscula. Borrar el caso al corregir es el riesgo de quedarse sin red.

### Demostración

1. Se quita `.toLowerCase()` de `texto` en el filtro. `npm run test:e2e` falla en el caso de `Este`.
2. Se devuelve `toLowerCase()`. El caso pasa. El `it` sigue en el archivo.
3. Se deja el botón siempre en «Anotar», aunque el estado sea `revisado`. Si no hay un caso de la pastilla, el script pasa.
4. Se restaura el ternario del botón. El riesgo queda nombrado: el caso del filtro no mira la pastilla.

→ Laboratorio: [J05-06 — Riesgos](J05-06-riesgos.md).
