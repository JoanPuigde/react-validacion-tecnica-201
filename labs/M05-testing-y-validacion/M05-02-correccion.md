# M05-02 — Corrección y checklist

[← Página anterior](M05-01-cypress.md) · [Siguiente página →](../../README.md)

> Práctica del módulo. La teoría y la demo están en el [README del módulo](README.md).

### Objetivo

Corregir el manejador para que la pastilla cambie, dejar el test en verde y recorrer el checklist sobre esta bandeja.

### Prerrequisitos

- [M05-01](M05-01-cypress.md): el caso «marcar revisado cambia el estado visible» falla porque `.estado` sigue en `pendiente`.

### En qué consiste

Cambias un campo en el hook, relanzas Cypress y compruebas seis preguntas sobre la entrega, actuando en la app.

### 1 — Escribir el estado que pinta la pastilla

**Acción:** abre `bandeja/src/hooks/useEntregables.js`. En `marcar`, el objeto nuevo asigna `marca`. Cámbialo para que asigne `estado`.

```js
function marcar(id) {
  setItems((lista) =>
    lista.map((item) =>
      item.id === id ? { ...item, estado: "revisado" } : item,
    ),
  )
}
```

Si `marcar` sigue dentro de `App.jsx` porque no hiciste el movimiento al hook, el cambio es el mismo en esa función.

En `Tarjeta.jsx` el botón puede seguir leyendo `item.marca` para el texto «Hecho». Átalo al estado real:

```jsx
<button type="button" onClick={() => alMarcar(item.id)}>
  {item.estado === "revisado" ? "Hecho" : "Marcar revisado"}
</button>
```

Guarda.

**Por qué:** la pastilla pinta `item.estado`. Un campo paralelo deja el botón y la pastilla en desacuerdo. El título «Pendientes: N» también cuenta `estado`, así que al marcar uno de los pendientes el número baja.

**Resultado esperado:** en el navegador, al pulsar «Marcar revisado» en «Informe de accesibilidad», la pastilla pasa a `revisado` y el botón a «Hecho». La pestaña, si ese entregable estaba pendiente, baja de 3 a 2.

### 2 — Volver a ejecutar Cypress

**Acción:** con el `npm run dev` parado, dentro de `bandeja/`:

```bash
npm run test:e2e
```

**Por qué:** el mismo aserto de antes ahora lee el campo que la interfaz muestra. El archivo del test no se debilita.

**Resultado esperado:** los casos del archivo pasan, incluido «marcar revisado cambia el estado visible».

### 3 — Recorrer el checklist en la propia bandeja

**Acción:** con `npm run dev` otra vez en marcha, comprueba cada fila en el navegador o en el código, como indica la acción.

**Por qué:** el test cubre un recorrido. El checklist cubre lo que ese recorrido no mira.

**Resultado esperado:**

**Carga, vacío y error son distintos**
Recarga `/` y escribe `zzzz` en «Buscar». Después, en `src/api/entregables.js`, apunta un momento a `/entregables-mal.json`, recarga y devuelve la URL buena.
→ Con `zzzz` se lee «Ningún entregable coincide.». Con la URL mala se lee «No se pudo cargar la bandeja.». Al restaurar la URL, vuelven las fichas.

**La ficha no pide datos**
Busca `fetch` en `src/componentes/Tarjeta.jsx`.
→ No hay ninguna llamada. La petición está en `src/api/entregables.js`.

**El filtro no repite la petición**
Pestaña Network, recarga, escribe en «Buscar».
→ Una petición a `entregables.json` al cargar. Ninguna nueva al teclear.

**La optimización tuvo medición**
Abre `/?lenta=1` y recuerda el commit del Profiler del módulo anterior.
→ Las filas dejaron de ejecutarse en cada letra después de `memo`, y el informe se pide al pulsar «Ver informe».

**Hay un recorrido automatizado**
El comando `npm run test:e2e` que acabas de lanzar.
→ Termina en verde con el caso de la pastilla.

**El buscador tiene nombre**
En la página, pulsa la etiqueta «Buscar».
→ El foco entra en la caja. En el JSX, `htmlFor="filtro"` coincide con `id="filtro"`.

## Comprueba tu entendimiento

**El número de pendientes acompaña a la pastilla**
Recarga `/`. Lee la pestaña. Marca E-101 y E-105.
→ La pestaña pasa de «Pendientes: 3» a «Pendientes: 1». E-103 sigue pendiente.

## Reto

### 1 — Impedir una segunda marca incoherente

Si el estado ya es `revisado`, el botón no debería ofrecer «Marcar revisado» en una ficha que ya venía revisada del JSON (E-102). Ajusta el texto para esos casos sin romper el test de E-101.

<details>
<summary>Ver solución</summary>

El JSX del paso 1 ya cubre el caso: `item.estado === "revisado"` muestra «Hecho» también en E-102 y E-106, que llegan así del JSON. El test de E-101 sigue encontrando primero el botón «Marcar revisado», porque esa ficha entra en `pendiente`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El test sigue viendo `pendiente` | Se cambió el botón y no `marcar`, o al revés | `marcar` asigna `estado: "revisado"` y la pastilla pinta `item.estado` |
| La pestaña no baja al marcar | `pendientes` cuenta `marca` o el efecto no depende de `pendientes` | Cuenta `item.estado === "pendiente"` y el efecto depende de `[pendientes]` |
| El checklist de error rompe los tests | Se quedó `/entregables-mal.json` | Devuelve `fetch("/entregables.json")` antes de `npm run test:e2e` |
