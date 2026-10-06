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

`public/entregables.json` tiene los mismos seis entregables. Vite lo publica en `/entregables.json`. Al recargar, la pestaña Network muestra una petición a ese archivo y después las fichas. Escribir en «Buscar» no dispara otra.

Con un `"estado": "listo"` dentro del JSON, el guarda rechaza la lista y la consola muestra el error. Al restaurar `"rechazado"` y recargar, vuelven las seis.

La URL `"/no-esta.json"` deja el aviso «No se pudo cargar la bandeja.» y ninguna ficha. `zzzz` en la caja, con la URL buena, deja solo la frase de ninguna coincidencia, sin `role="alert"`.

## Práctica

[M05-01 — La petición](../M05-datos/M05-01-fetch.md) y [M05-02 — Tres finales](../M05-datos/M05-02-finales.md).
