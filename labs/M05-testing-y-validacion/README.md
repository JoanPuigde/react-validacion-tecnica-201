# M05 — Testing y validación

[← Página anterior](../M04-rendimiento/M04-02-optimizar.md) · [Siguiente página →](M05-01-cypress.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada**, y después **practicas tú** en los laboratorios.

## Qué aprenderás

- Cubrir un recorrido de la bandeja con Cypress, de punta a punta.
- Leer un fallo de test como defecto de la pantalla, no como un capricho del aserto.
- Cerrar la semana con un checklist aplicable a otra entrega.

## Teoría

Un test de extremo a extremo abre la aplicación como la abre un navegador: visita una URL, escribe, pulsa y lee lo que quedó pintado. No importa `useState` ni el hook. Si la pastilla no cambia, el test no tiene por qué saber que el fallo está en un campo llamado `marca`.

Cypress ejecuta esos pasos en un navegador controlado. `cy.visit` carga la página. `cy.contains` busca texto visible. `cy.get` busca un selector. Lo que envuelves en `within` limita la búsqueda a esa ficha, para no pulsar el botón de otra.

| Comprobación | Dónde encaja |
|--------------|----------------|
| ¿El módulo calcula bien un filtro? | Más cerca del código, si el curso lo tuviera |
| ¿La persona puede buscar, marcar y ver el estado? | Cypress, contra la bandeja arrancada |
| ¿La variante lenta repinta de más? | Profiler, no un test de texto |

> [!NOTE]
> Un test verde que afirma lo que ya está mal no valida la entrega. Si el botón pasa a «Hecho» y el test solo busca «Hecho», el estado real puede seguir en «pendiente». El aserto tiene que leer la pastilla.

El checklist de una entrega de interfaz, el que se puede reutilizar fuera de esta bandeja:

| Pregunta | Señal a favor |
|----------|----------------|
| ¿Se distingue cargar, vacío y error? | Tres textos o estados distintos, no una lista en blanco para todo |
| ¿El estado vive en un sitio y la ficha solo pinta? | La petición está en `api/`, la ficha no llama a `fetch` |
| ¿Un filtro dispara otra petición? | Network: una petición al entrar, ninguna al teclear |
| ¿Hay una interacción medida antes de optimizar? | Un commit del Profiler, no un `memo` sin grabación |
| ¿Un recorrido queda automatizado? | Cypress visita, actúa y lee el resultado visible |
| ¿El control tiene nombre? | El `input` tiene `<label htmlFor>` apuntando a su `id` |

> [!WARNING]
> Corregir el defecto y borrar el test deja la entrega como al principio: el siguiente cambio puede devolver el fallo sin que nadie lo vea. El test se queda.

## Demostración guiada

En `bandeja/cypress/e2e/bandeja.cy.js` hay una prueba que visita `/` y busca el título. `npm run test:e2e` arranca Vite, espera el puerto 5173 y lanza Cypress en modo ejecutable, sin ventana. Al terminar, para el servidor que él mismo levantó.

Esa prueba no mira el filtro ni la pastilla. Al añadir un caso que busca el texto `revisado` dentro de la ficha E-101 después de pulsar «Marcar revisado», Cypress falla: el botón dice «Hecho» y la pastilla sigue en `pendiente`. El manejador escribió `marca`, no `estado`.

Con el manejador corregido, el mismo caso pasa. El recorrido queda en el archivo y se puede volver a lanzar.

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M05-01 | [Cypress](M05-01-cypress.md) | Añadir el recorrido de filtro y el de la pastilla |
| M05-02 | [Corrección y checklist](M05-02-correccion.md) | Arreglar el campo que la pastilla no leía y repasar la entrega |

→ Empieza por **[M05-01 — Cypress](M05-01-cypress.md)**.
