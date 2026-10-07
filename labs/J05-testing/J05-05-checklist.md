# J05-05 — Checklist

[← Página anterior](J05-04-entregable.md) · [Siguiente página →](J05-06-riesgos.md)

> Laboratorio de [Checklist](README.md).

### Objetivo

Recorrer la lista de la guía y marcar qué fila cubre el caso de Cypress y cuál no.

### Código de partida

La bandeja en el 5173. `bandeja.cy.js` tiene el caso del título y el de `Este`. Si falta el de `Este`, pégalo desde [J05-03](J05-03-cypress.md).

### 1 — La tabla, en la bandeja

**Dónde:** el navegador, en este orden.

**Qué haces:**

1. Abre `/`. El título es «Bandeja de entregables».
2. Escribe `Norte`. No están las seis.
3. Escribe `zzzz`. Se lee «Ningún entregable coincide.».
4. Pulsa «Buscar». El foco está en la caja.
5. Borra, marca una pendiente. Pastilla `revisado`, botón «Hecho».
6. Recarga. La marca no sigue.

**Experimento:** al lado de cada fila, di si el `it` de Cypress la ejecuta.

→ El caso del título cubre la fila 1. El de `Este` cubre un filtro, no exactamente `Norte`, ni el vacío, ni el foco, ni la recarga. Esas filas se miran a mano. No hace falta rellenar un formulario: el recorrido es el laboratorio.

**Validación:**

- Las seis filas se han hecho.
- El caso de `Este` sigue en el archivo.
- No has borrado un `it` para «dejarlo limpio».

## Comprueba tu entendimiento

**Para qué se repite**
La misma tabla sirve en otra entrega que tenga caja, lista y una acción.
→ Cambian los textos. No cambia la pregunta: qué se ve.

## Reto

### 1 — Una fila de red

Si la lista sale de `/entregables.json`, teclea con Network abierto.
→ No se repite esa petición. Si la lista sale de `datos.ts`, la fila no aplica y se anota así.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `Norte` no quita fichas | El `map` no recorre `visibles` | El filtro de [J02-02](../J02-estado/J02-02-usestate.md) |
| La marca sobrevive | Hay otro mecanismo de guardado | En esta bandeja, recargar restaura el origen |
