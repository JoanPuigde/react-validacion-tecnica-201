# J05-06 — Riesgos

[← Página anterior](J05-05-checklist.md) · [Siguiente página →](../../README.md)

> Laboratorio de [Riesgos](README.md).

### Objetivo

Romper el filtro, ver el caso rojo, arreglarlo sin borrar el caso, y nombrar un fallo que el caso no ve.

### Código de partida

El `it` de `Este` está en `bandeja.cy.js`. `npm run dev` parado antes de `npm run test:e2e`. El filtro usa `texto.toLowerCase()`.

### 1 — El fallo que el caso ve

**Dónde:** el `filter` de `visibles`.

**Qué haces:**

1. Quita `.toLowerCase()` de `texto` y déjalo en `blob.includes(texto)`.
2. `npm run test:e2e`.
3. Devuelve `texto.toLowerCase()`.
4. Relanza. Deja el `it` en el archivo.

**Experimento:** borra el `it` del filtro, deja el filtro roto y lanza el script. Restaura el `it` y el `toLowerCase()`.

→ Sin `toLowerCase()`, el caso de `Este` falla. Al devolverlo, pasa. Sin el `it`, el script pasa aunque el filtro esté roto. El caso se queda.

### 2 — El fallo que el caso no ve

**Dónde:** el texto del botón en `Tarjeta.tsx`.

**Qué haces:**

1. Deja el botón siempre en `{textoBoton} {item.id}`, sin el ternario de «Hecho».
2. Lanza `npm run test:e2e` si no añadiste el caso de la pastilla.
3. Restaura el ternario.

```tsx
{item.estado === "revisado" ? "Hecho" : textoBoton} {item.id}
```

**Experimento:** con el botón siempre en «Anotar», marca E-101 en el navegador.

→ La pastilla puede cambiar y el botón miente, o al revés si también tocaste la pastilla. El caso de `Este` pasa. Ese es el riesgo: el recorrido automático no mira el rótulo. Si añadiste el caso de `.estado` en J05-03, ese sí falla cuando la pastilla no cambia. Restaura el ternario.

**Validación:**

- `npm run test:e2e` pasa con el filtro arreglado y el caso presente.
- El botón vuelve a decir «Hecho» cuando el estado es `revisado`.
- No queda `blob.includes(texto)` sin `toLowerCase()`.

## Comprueba tu entendimiento

**Qué riesgo te llevas**
Un caso borrado al corregir, y un fallo fuera del texto que el caso busca.
→ El `it` se queda. El checklist cubre lo que el `it` no ejecuta.

## Reto

### 1 — El caso de la pastilla, si no está

Pega el `it` «marca el informe» de [J05-03](J05-03-cypress.md). Deja el botón sin «Hecho» y lanza el script. Restaura el botón.

<details>
<summary>Ver solución</summary>

Si el caso lee `.estado` y la pastilla sí cambia, pasa aunque el botón diga «Anotar». Para cazar el rótulo hace falta un `contains` de «Hecho». Restaura el ternario. El caso puede quedarse.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Sigue rojo | El `toLowerCase` no volvió, o `dev` ocupa el puerto | Restaura la línea y relanza con el puerto libre |
| El caso pasa con el filtro roto | El `it` escribe `este` en minúsculas | El caso escribe `Este` |
| Borraste el caso | Salió con el experimento | Vuelve a pegar el `it` de J05-03 |
