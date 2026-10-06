# M05 — Datos

> Práctica de [la petición](../M03-apis-y-arquitectura/01-peticion.md), de [qué mirar en el pintado](../M04-rendimiento/01-que-mirar.md) y de [el recorrido](../M05-testing-y-validacion/01-recorrido.md).

[← Página anterior](../M03-apis-y-arquitectura/01-peticion.md) · [Siguiente página →](M05-01-fetch.md)

> [!NOTE]
> La lista deja de nacer en `datos.ts` y pasa a llegar por HTTP. Los dos últimos laboratorios solo comprueban el pintado de más y un recorrido automático. No cambian de tema: cierran la bandeja.

## Qué aprenderás

- Pedir el JSON y aceptar solo `Entregable[]`.
- Distinguir carga, error y vacío.
- Ver cuándo `memo` se salta un pintado, y dejar un caso de Cypress del filtro.

## Teoría

`fetch` devuelve `unknown` hasta que tú compruebas la forma. Un `as` a ciegas o un `any` darían por buena una respuesta que no es una lista de entregables.

Vacío es un filtro sin coincidencias. Error es una petición que no salió bien. Cargando es la espera. Son tres frases distintas.

## Demostración guiada

`public/entregables.json` tiene los mismos seis entregables. Al terminar el módulo, la bandeja los pide al arrancar, el buscador sigue en `#filtro` y Cypress puede escribir `Este` y ver una sola ficha.

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M05-01 | [La petición](M05-01-fetch.md) | Cargar y comprobar el JSON |
| M05-02 | [Tres finales](M05-02-finales.md) | Carga, error y vacío |
| M05-03 | [memo](M05-03-memo.md) | Contar pintados de la ficha |
| M05-04 | [useCallback](M05-04-usecallback.md) | Estabilizar lo que la ficha lee |
| M05-05 | [Un caso](M05-05-caso.md) | Cypress escribe en el filtro |

→ Empieza por **[M05-01 — La petición](M05-01-fetch.md)**.
