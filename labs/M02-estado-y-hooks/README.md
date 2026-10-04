# M02 — Estado, hooks y flujo de datos

[← Página anterior](../M01-fundamentos/M01-03-componentes.md) · [Siguiente página →](M02-01-estado.md)

> [!NOTE]
> **Cómo funciona este módulo.** Primero la **teoría**, luego la **demostración guiada**, y después **practicas tú** en los laboratorios.

## Qué aprenderás

- Guardar datos que, al cambiar, vuelven a pintar la pantalla.
- Separar la lista que se muestra de la lista que manda.
- Sincronizar el título de la pestaña con un dato de React.

## Teoría

Una variable normal dentro de `App` se pierde en el siguiente pintado y, aunque la cambies, React no vuelve a pintar. El **estado** es un valor que React recuerda entre pintados. Al actualizarlo con la función que te da `useState`, React vuelve a llamar al componente.

```jsx
const [texto, setTexto] = useState("")
```

`texto` es el valor de ahora. `setTexto` pide el siguiente. No se muta el array a mano (`items.push(...)`): se entrega un array nuevo. Si no, React no ve el cambio.

El flujo es de arriba abajo. `App` tiene la lista y el filtro. Calcula qué fichas se ven y se las pasa a `Tarjeta`. `Tarjeta` no guarda una copia del entregable. Si el padre cambia el entregable, la tarjeta recibe otra prop y pinta eso.

| | Presentación | Estado |
|--|----------------|--------|
| Dónde vive | `Tarjeta.jsx` | `App.jsx` en este módulo |
| Qué sabe | Cómo se ve una ficha | Cuál es la lista y qué hay escrito en el filtro |
| Qué no hace | Decidir si el entregable sigue pendiente | Elegir colores o márgenes |

> [!NOTE]
> Copiar una prop en un `useState` para «tenerla a mano» deja dos verdades. El filtro no se guarda: se calcula en cada pintado a partir de `items` y `texto`. Eso es un valor derivado, no estado.

`useEffect` corre **después** de pintar, y otra vez cuando cambian las dependencias que declares. Sirve para hablar con algo de fuera de React: el título de la pestaña, un temporizador, una petición. No sirve para calcular datos que ya puedes calcular mientras pintas.

```jsx
useEffect(() => {
  document.title = `Pendientes: ${pendientes}`
}, [pendientes])
```

El array es el contrato. Vacío (`[]`) significa «solo al montar». Si `pendientes` cambia y no está en el array, el título se queda con el primer número.

> [!WARNING]
> Un efecto sin array de dependencias corre en cada pintado. Un efecto con `[]` que lee un estado se queda con el valor del primer pintado.

La función que se devuelve del efecto es la limpieza: React la llama antes de repetir el efecto y al desmontar. En una petición, esa limpieza evita guardar la respuesta si el componente ya no está.

## Demostración guiada

En la bandeja de partida, la lista sale de un `import`. No hay caja de búsqueda. El título de la pestaña es el del `index.html`, fijo.

Al añadir estado, la caja «Buscar» escribe en `texto` y el `filter` deja fuera las fichas que no coinciden. La lista de `datos.js` no se borra: `items` sigue completo y `visibles` es la vista. Borrar lo escrito en la caja devuelve las seis fichas.

El botón «Marcar revisado» cambia el texto del propio botón a «Hecho». El estado que pinta la pastilla sigue siendo `item.estado`. Son dos campos distintos. La pastilla es la que un revisor leería como verdad del entregable.

El título de la pestaña pasa a «Pendientes: N». Ese número cuenta `estado === "pendiente"` en la lista completa, no en el filtro. Filtrar no cambia el título. Cambiar el número de pendientes, sí.

## Ahora practica tú

| Lab | Título | Qué harás |
|-----|--------|-----------|
| M02-01 | [Estado](M02-01-estado.md) | Filtrar la lista y marcar una ficha |
| M02-02 | [Efectos](M02-02-efectos.md) | Llevar el número de pendientes al título de la pestaña |

→ Empieza por **[M02-01 — Estado](M02-01-estado.md)**.
