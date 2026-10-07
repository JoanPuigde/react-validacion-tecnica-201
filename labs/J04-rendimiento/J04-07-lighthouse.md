# J04-07 — Lighthouse

[← Página anterior](J04-06-profiler.md) · [Siguiente página →](../J05-testing/README.md)

> Laboratorio de [Lighthouse](README.md).

### Objetivo

Leer una pasada de carga y quitar el contador de depuración.

### Código de partida

`npm run dev` en el 5173. Lighthouse viene con el navegador. Si `Tarjeta` tiene `console.count`, este laboratorio lo quita al final.

### 1 — Una pasada y el contador fuera

**Dónde:** pestaña Lighthouse. Luego `Tarjeta.tsx`.

**Qué haces:**

1. Categoría Rendimiento. Analiza la carga de la página.
2. Lee un número: el peso, el bloqueo o la puntuación. No cambies código para subirlo.
3. Borra `console.count` de `Tarjeta`.
4. Recarga y escribe una letra. La consola ya no cuenta ids.

**Experimento:** repite la pasada si quieres. Compara la holgura de la nota con lo que el contador decía antes de borrarlo.

→ En seis fichas la pasada sale holgada. El contador, mientras estuvo, decía que había ejecuciones de más. Son lecturas distintas. `memo` y `useCallback` pueden quedarse. El `console.count` no.

**Validación:**

- Has leído al menos un número de Lighthouse.
- `Tarjeta.tsx` no contiene `console.count`.
- El filtro y marcar siguen igual.

## Comprueba tu entendimiento

**Qué no demuestra la nota**
Una nota alta no dice que `memo` hiciera falta.
→ La nota mira la carga. El contador miraba los renders. En esta lista la nota no justifica el `memo`. El contador explicó por qué se puso.

## Reto

### 1 — Lighthouse no ve el estado

Marca E-101 y lanza otra pasada. Lighthouse recarga la página.
→ La marca no está en el informe. La pasada vuelve a cargar `/` y el estado de memoria se pierde.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Lighthouse no abre la app | El puerto no responde | `npm run dev` en `bandeja/` |
| La consola sigue contando | Quedó otro `console.count` | Búscalo en `Tarjeta.tsx` y bórralo |
