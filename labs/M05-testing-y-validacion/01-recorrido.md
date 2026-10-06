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

Con la bandeja cargando el JSON y el buscador en `#filtro`, un caso escribe `Este`, ve «Inventario de componentes» y no ve «Informe de accesibilidad». Otro abre el artículo de ese informe, pulsa el botón que contiene «Anotar» y lee `revisado` en la pastilla.

`npm run test:e2e` los ejecuta junto al caso del título. Cambiar el texto a `zzzz` hace fallar el del inventario: el filtro no lo pinta, y el caso lo dice. Al restituir `Este`, vuelve a pasar.

El checklist se recorre en la misma bandeja: la URL mala enseña el aviso, `zzzz` enseña el vacío, Network no repite la petición al teclear, y pulsar la etiqueta «Buscar» lleva el foco a la caja.

## Práctica

[M05-05 — Un caso](../M05-datos/M05-05-caso.md).
