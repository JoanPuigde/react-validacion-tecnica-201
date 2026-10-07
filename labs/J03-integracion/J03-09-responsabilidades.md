# J03-09 — Separación de responsabilidades

[← Página anterior](J03-08-estructura.md) · [Siguiente página →](J03-10-reutilizable.md)

> Laboratorio de [Separación de responsabilidades](README.md).

### Objetivo

Comprobar que el hook no filtra, que la ficha no pide, y que `App` no guarda la lista.

### Código de partida

`useEntregables` devuelve `{ items, cargando, error, marcar }`. `App` calcula `visibles` y pinta. `Tarjeta` recibe `item` y `alMarcar`. Si el hook no existe, haz [J03-08](J03-08-estructura.md): el archivo está entero ahí.

### En qué consiste

Tres búsquedas y un experimento que se deshace.

### 1 — Tres sitios, tres trabajos

**Dónde:** `useEntregables.ts`, `Tarjeta.tsx` y `App.tsx`.

**Qué haces:**

1. Busca `texto` en el hook.
2. Busca `fetch` en `Tarjeta.tsx`.
3. Busca `useState` de la lista en `App.tsx`.
4. Anota las tres.

**Experimento:** en el cuerpo de `Tarjeta`, antes del `return`, añade `void fetch("/entregables.json")`. Recarga con Network abierto. Escribe una letra en «Buscar». Borra esa línea.

→ Una petición por ficha al cargar, y otra por cada letra. Al borrar la línea, la petición vuelve a ser una, al recargar. `Tarjeta` otra vez solo pinta.

**Validación:**

- `texto` no está en el hook.
- `fetch` no está en `Tarjeta.tsx`.
- `App` no tiene `useState` de `items`. Lo recibe del hook.
- Teclear no repite `entregables.json`.

## Comprueba tu entendimiento

**Quién filtra**
Cambia el filtro para que también mire `item.estado`. Escribe `pendiente`.
→ Lo hace `App`, en `visibles`. El hook sigue devolviendo las seis cuando la caja está vacía. Puedes dejar el filtro como estaba, solo título, proveedor e id.

## Reto

### 1 — La ficha decide el estado

Dentro de `Tarjeta`, cambia la pastilla para que siempre escriba `ok`, sin leer `item.estado`. Marca E-101. Restaura `{item.estado}`.

<details>
<summary>Ver solución</summary>

El botón pasa a «Hecho» y la pastilla sigue diciendo `ok`. La ficha ha dejado de contar el dato. La pastilla vuelve a `{item.estado}`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Petición por letra | El `fetch` de prueba sigue en `Tarjeta` | Bórralo. La petición vive en `api/entregables.ts` |
| El filtro no responde | `visibles` se calcula en el hook y no recibe `texto` | El `filter` está en `App`, después de `useState("")` |
