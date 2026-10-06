# La petición y los tres finales

[← Página anterior](README.md) · [Siguiente página →](02-estructura.md)

`fetch` devuelve una promesa. El JSON, hasta comprobarlo, es `unknown`. Un `any` daría por buena cualquier respuesta. Un guarda mira campo a campo y solo entonces el valor es `Entregable[]`.

```tsx
function esEstado(valor: unknown): valor is EstadoEntregable {
  return valor === "pendiente" || valor === "revisado" || valor === "rechazado"
}
```

`respuesta.ok` importa. Un 404 no lanza solo. Si no se rechaza, una página de error acabaría tratada como lista.

Hay tres finales, y no son el mismo:

| Situación | Qué se ve | Qué no es |
|-----------|-----------|-----------|
| Cargando | «Cargando entregables…», sin fichas | Un error |
| Respuesta con datos | Las fichas | |
| Filtro sin coincidencias | «Ningún entregable coincide.» | Un fallo de red |
| La petición falla | Un aviso con `role="alert"` | Una lista en blanco |

> [!NOTE]
> Vacío y error se parecen si solo se mira «no hay fichas». El vacío es una respuesta válida. El error es que no hubo respuesta usable.

La petición no va en el cuerpo del componente, el que corre en cada pintado. Ahí se lanzaría otra vez en cada letra del filtro. Va en un efecto con `[]`, o en una función de `api/` que ese efecto llama. Una bandera `vivo` evita hacer `dispatch` si el hook ya se fue.

El estado inicial de la lista, cuando la fuente es la red, es `[]`. Quien la llena es la respuesta, no el import de `datos.ts`.

## Demostración guiada

Punto de partida: [M04-07](../M04-hooks/M04-07-hook-propio.md) ya dejó `bandeja/src/hooks/useEntregables.ts`. El reductor empieza con el array de `datos.ts`. La pestaña dice «Pendientes: 3». El buscador y las seis fichas funcionan. `public/entregables.json` ya está en el repo, con los mismos seis, y la página todavía no lo pide.

Si ese hook no existe, esta demostración espera. Crearlo es la página de [estructura](02-estructura.md), aunque en la guía venga después.

### 1 — El archivo que ya está y nadie pide

Con `npm run dev` en marcha, en el navegador se abre `http://localhost:5173/entregables.json`. Se ven los seis objetos. En la app, la pestaña Network no tiene esa petición: la lista sigue saliendo del import.

### 2 — El guarda

Se crea `bandeja/src/api/entregables.ts` con `esEstado`, `esEntregable` y `cargarEntregables`. `fetch("/entregables.json")`. Si `respuesta.ok` es falso, `throw new Error`. El JSON se lee como `unknown`. Si no es un array o algún elemento falla el guarda, `throw new Error("El JSON no es una lista de entregables")`. No hay `any`. La página no cambia: nadie llama a la función.

### 3 — El hook la llama una vez

En `useEntregables.ts` el estado inicial del reductor pasa a `[]`. Una acción `"cargar"` sustituye la lista. Un `useEffect` con `[]` llama a `cargarEntregables` y hace `dispatch` si la bandera `vivo` sigue en pie. Se quita el import de `datos.ts`.

Network, al recargar: una petición a `entregables.json` y después las seis fichas. Escribir en «Buscar» no dispara otra. La pestaña vuelve a «Pendientes: 3» cuando llega la respuesta.

### 4 — Un estado que el tipo no admite

En el JSON, E-104 pasa a `"estado": "listo"`. Se recarga. El guarda rechaza la lista. La consola muestra el error. No aparecen las seis fichas a medias. Se restaura `"rechazado"` y, al recargar, vuelven.

### 5 — Error, carga y vacío

En el hook, `cargando` empieza en `true` y `error` en `""`. El `catch` hace `setError("No se pudo cargar la bandeja.")`. El `finally` apaga `cargando`. En `App`, tres ramas: cargando muestra «Cargando entregables…» sin fichas; error muestra un aviso con `role="alert"`; si no, la lista y el filtro.

La URL del `fetch` se cambia a `"/no-esta.json"`. Al recargar, el aviso y ninguna ficha. Se restituye `"/entregables.json"`. Con la URL buena, `zzzz` en la caja deja «Ningún entregable coincide.» y el aviso de error no está.

Dónde queda: la lista nace del JSON. `datos.ts` puede seguir en el proyecto. El hook ya no lo importa.

## Práctica

[M05-01 — La petición](../M05-datos/M05-01-fetch.md) y [M05-02 — Tres finales](../M05-datos/M05-02-finales.md).
