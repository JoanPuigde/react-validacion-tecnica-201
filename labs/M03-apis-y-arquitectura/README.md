# M03 — APIs y arquitectura

[← Página anterior](../M02-estado-y-hooks/M02-02-efectos.md) · [Siguiente página →](M03-01-api.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada**, y después **practicas tú** en los laboratorios.

## Qué aprenderás

- Sustituir el array importado por una petición y pintar carga, error y vacío.
- Dejar la petición fuera del componente que dibuja la ficha.
- Reconocer un antipatrón de estructura antes de dar por buena una entrega.

## Teoría

Hasta ahora la lista vive en el paquete de JavaScript. En una entrega real llega por HTTP. `fetch` devuelve una promesa: la pantalla tiene que pintar **antes** de que la respuesta exista.

Hay cuatro finales, y no son el mismo:

| Situación | Qué ve quien revisa | Qué no es |
|-----------|---------------------|-----------|
| Cargando | Un texto de espera, sin fichas | Un error |
| Respuesta con datos | Las fichas | |
| Respuesta vacía, o un filtro que no coincide | «Ningún entregable coincide.» | Un fallo de red |
| La petición falla | Un aviso con `role="alert"` | Una lista vacía en silencio |

> [!NOTE]
> Vacío y error se parecen si solo miras «no hay fichas». El vacío es una respuesta válida. El error es que no hubo respuesta usable. Un entregable que esconde el fallo detrás de una lista en blanco no se puede validar.

La petición no va en el cuerpo del componente, el que corre en cada pintado. Ahí se lanzaría otra vez en cada letra del filtro. Va en un efecto con `[]` si solo debe ocurrir al montar, o dentro de una función del módulo `api/` que el efecto llama.

Una bandera `vivo` (o un `AbortController`) evita hacer `setItems` si el componente se fue antes de la respuesta. Es la limpieza del efecto.

La estructura que se lee en una revisión:

| Carpeta | Responsabilidad |
|---------|-----------------|
| `src/api/` | Hablar con HTTP. No pinta. |
| `src/hooks/` | Guardar carga, error y datos. No conoce el CSS. |
| `src/componentes/` | Pintar props. No llama a `fetch`. |
| `src/App.jsx` | Componer. No acumular las tres cosas en un solo archivo. |

Antipatrones que invalidan esa lectura:

- `fetch` suelto en el cuerpo de la función, fuera de un efecto o de un manejador.
- Un componente que importa la API, pinta y además decide el filtro.
- Estado duplicado: guardar `visibles` en un `useState` además de calcularlo.

> [!WARNING]
> Derivar `visibles` con `useEffect` + `setVisibles` añade un pintado de retraso y un sitio más donde el filtro puede mentir. Se calcula en el render, como en el módulo anterior.

## Demostración guiada

`public/entregables.json` contiene los mismos seis entregables que `src/datos.js`. Vite lo publica en `/entregables.json`. Al dejar de importar `datos.js`, la primera pintura de la bandeja no tiene fichas: entra el texto de carga y, cuando la promesa se resuelve, aparecen las seis.

Si la dirección del `fetch` apunta a un archivo que no existe, la rama de error muestra «No se pudo cargar la bandeja.» y no pinta la lista. Al corregir la dirección, un remonte (recargar la página) vuelve a pedir el JSON.

En el árbol, `cargarEntregables` queda en `src/api/entregables.js`. `useEntregables` guarda `items`, `cargando`, `error` y `marcar`. `Tarjeta` sigue sin conocer la URL.

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M03-01 | [La petición](M03-01-api.md) | Cargar el JSON y pintar carga, datos, vacío y error |
| M03-02 | [Estructura](M03-02-estructura.md) | Sacar la API y el hook, y revisar el antipatrón |

→ Empieza por **[M03-01 — La petición](M03-01-api.md)**.
