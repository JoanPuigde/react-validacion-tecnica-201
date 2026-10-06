# El recorrido y el checklist

[← Página anterior](README.md) · [Siguiente página →](../../README.md)

Un test de extremo a extremo abre la aplicación como la abre un navegador: visita una URL, escribe, pulsa y lee lo que quedó pintado. No importa `useState` ni el hook. Cypress ejecuta esos pasos. `cy.visit` carga la página. `cy.contains` busca texto visible. `cy.get` busca un selector. `within` limita la búsqueda a una ficha.

`npm run test:e2e` arranca Vite, espera el puerto 5173 y lanza Cypress sin ventana. Si `npm run dev` ya ocupa el puerto, el script no puede arrancar el suyo.

| Comprobación | Dónde encaja |
|--------------|----------------|
| ¿El filtro deja una ficha y esconde otra? | Cypress, contra el texto de la página |
| ¿Marcar cambia la pastilla? | Cypress, leyendo `.estado`, no el botón |
| ¿Una letra repinta fichas de más? | Contador o Profiler, no un test de texto |

> [!NOTE]
> Un test verde que afirma lo que ya está mal no valida la entrega. Si el botón pasa a «Hecho» y el test solo busca «Hecho», la pastilla puede seguir en `pendiente`. El aserto tiene que leer la pastilla.

El checklist, para esta bandeja y para otra entrega:

| Pregunta | Señal a favor |
|----------|----------------|
| ¿Se distinguen cargar, vacío y error? | Tres textos distintos, no una lista en blanco para todo |
| ¿La ficha solo pinta? | La petición está en `api/`. En `Tarjeta` no hay `fetch` |
| ¿El filtro dispara otra petición? | Network: una al entrar, ninguna al teclear |
| ¿El estado tiene forma? | Interfaces, sin `any`. Un estado que no existe no entra |
| ¿Hizo falta optimizar? | Hubo una medición. Un `memo` sin contador ni Profiler no cuenta |
| ¿Queda un recorrido automático? | Cypress visita, actúa y lee lo visible |
| ¿El control tiene nombre? | `<label htmlFor>` coincide con el `id` del input |

> [!WARNING]
> Corregir un fallo y borrar el caso deja la entrega como al principio: el siguiente cambio puede devolver el fallo sin que se vea. El caso se queda.

## Demostración guiada

Punto de partida: la bandeja pide `/entregables.json`. El buscador tiene `id="filtro"` y su etiqueta es «Buscar». El botón de una ficha pendiente contiene «Anotar». `npm run dev` no puede estar usando el 5173: el script de Cypress arranca el suyo. Se para con Ctrl+C.

El caso que ya viene visita `/` y busca el título. No mira el filtro.

### 1 — El filtro, visto desde fuera

En `bandeja/cypress/e2e/bandeja.cy.js`, dentro del `describe`, después del caso del título, un caso escribe `Este` en `#filtro`, ve «Inventario de componentes» y no ve «Informe de accesibilidad». En `bandeja/`, `npm run test:e2e`. Pasan el del título y este.

Se cambia el texto escrito a `zzzz`. El caso falla buscando «Inventario de componentes»: el filtro no lo pinta. Cypress no mira `useState`. Mira el texto de la página. Se restituye `Este` y el caso vuelve a pasar.

### 2 — La pastilla, no el botón

Otro caso abre el artículo que contiene «Informe de accesibilidad», pulsa el botón que contiene «Anotar» y lee `revisado` en `.estado`. Al cargar, E-101 está pendiente y el botón dice «Anotar E-101». Tras el clic, la pastilla es `revisado`. Si el caso solo comprueba que el botón existe, pasa aunque la pastilla no cambie. Este caso lee la pastilla.

### 3 — El checklist, en la misma bandeja

Con `dev` otra vez en el 5173: la URL del fetch en `"/no-esta.json"` enseña «No se pudo cargar la bandeja.» Se restituye la URL buena. `zzzz` enseña «Ningún entregable coincide.» sin `role="alert"`. En Network, teclear en «Buscar» no repite `entregables.json`. Pulsar la etiqueta «Buscar» lleva el foco a `#filtro`.

Dónde queda: los casos se quedan en el archivo. Borrar el caso al corregir un fallo deja la entrega como al principio.

## Práctica

[M05-05 — Un caso](../M05-datos/M05-05-caso.md).
