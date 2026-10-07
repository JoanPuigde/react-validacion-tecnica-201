# J04-06 — Profiler

[← Página anterior](J04-05-devtools.md) · [Siguiente página →](J04-07-lighthouse.md)

> Laboratorio de [React Profiler](README.md).

### Objetivo

Grabar un pintado y ver qué componente se ejecutó al teclear.

### Código de partida

La bandeja en el 5173. Hace falta la extensión React DevTools en el navegador donde se abre el puerto. Si no está instalada, el laboratorio se queda en el nombre de la herramienta y en el `console.count` de [J04-01](J04-01-impacto.md), que responde la misma pregunta sin tiempos.

### 1 — Una letra grabada

**Dónde:** pestaña Profiler de React DevTools.

**Qué haces:**

1. Empieza a grabar.
2. Escribe una letra en «Buscar».
3. Para la grabación.
4. Localiza `App` y `Tarjeta` en el árbol de ese pintado.

**Experimento:** marca una ficha pendiente con el Profiler grabando. Para y mira si la ficha marcada y las demás salen juntas.

→ `App` sale al teclear, porque el estado de la caja vive ahí. `Tarjeta` sale en las que se volvieron a ejecutar. Si `memo` y `useCallback` ya están, una letra no tiene por qué ejecutar las fichas cuyo `item` no cambió. Marcar ejecuta al menos la ficha cuyo objeto es nuevo.

**Validación:**

- Hay una grabación con al menos un commit.
- No has cambiado código para «mejorar» la barra.
- La página sigue usable.

## Comprueba tu entendimiento

**Qué no mira el Profiler**
No lista las peticiones HTTP.
→ Eso es Network. El Profiler mira el render de React.

## Reto

### 1 — El commit del título

Si tienes el efecto de la pestaña, márcalo con el Profiler grabando.
→ Hay un commit porque `pendientes` cambió. El título del documento no es un componente, pero el render que lo provocó sí sale.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No aparece la pestaña Profiler | La extensión no está en ese navegador | Instálala, o usa el `console.count` |
| La grabación sale vacía | No tecleaste durante la grabación | Graba, escribe una letra, para |
