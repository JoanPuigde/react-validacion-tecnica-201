# M01 — TSX y el componente

[← Página anterior](../../README.md) · [Siguiente página →](M01-01-entorno.md)

> [!NOTE]
> Este módulo se sigue laboratorio a laboratorio. La teoría de cada idea está en el propio laboratorio, en el momento de añadirla.

## Qué aprenderás

- Abrir el proyecto Vite que ya está en `bandeja/`.
- Describir un entregable con una interfaz, sin `any`.
- Pintar ese dato desde un componente funcional.

## Teoría

Un componente funcional es una función que devuelve interfaz. El fichero es `.tsx`: TypeScript más etiquetas. La interfaz dice qué campos tiene un dato. Si el objeto no encaja, el editor lo marca antes de llegar al navegador.

| Pieza | Dónde |
|-------|--------|
| Vite | Sirve `bandeja/` en el puerto 5173 |
| `interface` | El contrato del dato |
| Componente | Función con `export default` |

> [!NOTE]
> No hay componentes de clase en este curso. Si ves `class extends Component` en otro material, aquí no se usa.

## Demostración guiada

Al arrancar, la página tiene el título «Bandeja de entregables» y una frase. No hay fichas. El primer cambio no es una pantalla nueva: es un tipo, luego una función, luego una expresión dentro de la etiqueta.

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M01-01 | [Entorno](M01-01-entorno.md) | Ver el título en el puerto 5173 |
| M01-02 | [La interfaz](M01-02-interfaz.md) | Declarar `Entregable` y provocar un error de tipo |
| M01-03 | [El componente](M01-03-componente.md) | Mover el dato a `Tarjeta` |
| M01-04 | [Expresiones](M01-04-expresiones.md) | Pintar id y proveedor entre llaves |
| M01-05 | [La clase](M01-05-clase.md) | Colgar `className` del estado |

→ Empieza por **[M01-01 — Entorno](M01-01-entorno.md)**.
