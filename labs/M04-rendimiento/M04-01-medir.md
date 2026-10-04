# M04-01 — Medir

[← Página anterior](README.md) · [Siguiente página →](M04-02-optimizar.md)

> Práctica del módulo. La teoría y la demo están en el [README del módulo](README.md).

### Objetivo

Señalar, con el Profiler, que filtrar la variante lenta vuelve a ejecutar las filas.

### Prerrequisitos

- React DevTools instalado en el navegador con el que abres el puerto 5173.
- `npm run dev` en marcha dentro de `bandeja/`.

### En qué consiste

Abres la variante, grabas una pulsación en el filtro y lees el commit. No cambias código todavía.

### 1 — Abrir la variante

**Acción:** en el navegador, abre la misma base de la bandeja con el query `lenta`. Si la raíz reenviada es `https://….app.github.dev/`, la dirección termina en `/?lenta=1`.

**Por qué:** `App` mira ese parámetro y monta `ListaPesada`. La bandeja de entregables no entra en esta medición.

**Resultado esperado:** el título es «Variante lenta». Hay una caja «Filtrar», el botón «Ver informe» y una lista larga de piezas. Escribir en el filtro tarda más de lo que tardaba la bandeja de seis fichas.

### 2 — Grabar un commit

**Acción:** abre las herramientas de desarrollo, pestaña **Profiler** (la pone React DevTools; no es la pestaña Performance). Pulsa el círculo de grabar. Escribe una letra en «Filtrar». Para la grabación.

**Por qué:** un solo cambio de estado deja un commit pequeño de leer. Grabar de más mezcla el arranque con la interacción.

**Resultado esperado:** hay al menos un commit. Al seleccionarlo, en el árbol aparece `ListaPesada` y, debajo, muchas `Fila`. Esas filas se ejecutaron por una letra.

> [!TIP]
> Si no ves la pestaña Profiler, la extensión no está en ese navegador. El simple browser del editor a veces no lleva extensiones: abre el puerto en Chrome.

### 3 — Mirar la carga con Lighthouse

**Acción:** en las herramientas del navegador, pestaña Lighthouse, marca Performance y pulsa «Analyze page load» sobre `/?lenta=1`.

**Por qué:** Lighthouse mira la carga del documento, no el coste de teclear. Son preguntas distintas. Las dos caben en una revisión.

**Resultado esperado:** un informe con una puntuación de rendimiento y una lista de oportunidades. No hace falta alcanzar un número concreto. Anota una oportunidad que mencione JavaScript si aparece.

## Comprueba tu entendimiento

**La bandeja corta no es esta medición**
Quita `?lenta=1`, abre el Profiler, graba y escribe una letra cuando ya tengas el filtro «Buscar» de la bandeja (módulos anteriores).
→ El commit no arrastra doscientas `Fila`. Si el filtro aún no existe, la comprobación es la contraria: en `/` no está el título «Variante lenta».

## Reto

### 1 — Ver el trabajo en Performance

Graba en la pestaña Performance (la del navegador, no el Profiler) mientras escribes tres letras en el filtro de `/?lenta=1`. Localiza un tramo largo de scripting en el hilo principal.

<details>
<summary>Ver solución</summary>

Performance → grabar → tres letras → parar. En el carril del hilo principal hay bloques de Scripting coincidiendo con cada letra. El Profiler dice qué componente fue. Performance dice que el tiempo se fue en script, no en red.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `/?lenta=1` muestra la bandeja de entregables | Falta el query, o `App.jsx` ya no tiene la condición | La dirección lleva `lenta` y `App` importa `ListaPesada` |
| No existe la pestaña Profiler | React DevTools no está instalado en ese navegador | Instala la extensión y recarga la página |
| La grabación sale vacía | Se paró antes de escribir, o se grabó otra pestaña | Graba, escribe una letra en «Filtrar», para |
