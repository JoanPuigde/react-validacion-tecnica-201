# TSX

[← Página anterior](01-entorno.md) · [Siguiente página →](03-props.md)

Un componente funcional es una función cuyo nombre empieza en mayúscula y que devuelve interfaz. El fichero es `.tsx`: TypeScript y etiquetas en el mismo archivo. No hay componentes de clase en este curso.

TSX parece HTML escrito dentro de TypeScript. Vite lo transforma. Lo que va entre llaves es una expresión: `{entrega.titulo}`. Fuera de las llaves, el texto se pinta tal cual.

El dato se describe con una interfaz. Si el objeto no encaja, el editor lo marca antes de llegar al navegador.

```tsx
export type EstadoEntregable = "pendiente" | "revisado" | "rechazado"

export interface Entregable {
  id: string
  titulo: string
  proveedor: string
  estado: EstadoEntregable
}
```

`estado` solo admite esas tres cadenas. `"listo"` no compila. Tampoco un `id` numérico: la interfaz pide `string`. No se usa `any` para callar el aviso. `any` apaga la comprobación y el objeto deja de tener forma.

En la etiqueta, `class` de HTML pasa a ser `className`. `class` es una palabra reservada. La clase puede salir del dato:

```tsx
<p className={`estado ${entrega.estado}`}>{entrega.estado}</p>
```

> [!NOTE]
> Un **elemento** es lo que React pinta (`<h1>`, `<p>`). Un **componente** es la función que devuelve elementos. `App` es un componente. El `<h1>` de dentro es un elemento.

## Demostración guiada

Punto de partida: el navegador muestra el título y el párrafo «Revisión de lo que entrega el proveedor.» `npm run dev` sigue en `bandeja/`. No existe `Tarjeta`.

### 1 — El contrato, sin pintar nada

Se crea `bandeja/src/modelo.ts`:

```tsx
export type EstadoEntregable = "pendiente" | "revisado" | "rechazado"

export interface Entregable {
  id: string
  titulo: string
  proveedor: string
  estado: EstadoEntregable
}
```

La página no cambia: nadie importa el archivo. Cambiar `titulo: string` por `titulo: number` tampoco se ve en el navegador. Se restaura `string` antes de seguir. `estado` se queda en `EstadoEntregable`. Si se deja en `string`, el paso 3 no marca `"listo"`.

### 2 — El objeto en la página

En `bandeja/src/App.tsx` se importa el tipo y se declara el objeto encima de `App`. El párrafo fijo se sustituye por `{entrega.titulo}`.

```tsx
import type { Entregable } from "./modelo"

const entrega: Entregable = {
  id: "E-101",
  titulo: "Informe de accesibilidad",
  proveedor: "Norte",
  estado: "pendiente",
}
```

Al guardar, el navegador deja la frase de revisión y muestra «Informe de accesibilidad». Cambiar `proveedor` a `"Sur"` no mueve esa línea: el párrafo no lee ese campo. Se restaura `"Norte"`.

### 3 — Un valor que el tipo no admite

En el objeto, `estado` pasa a `"listo"`. La pestaña Problems del editor subraya el campo. El navegador puede seguir mostrando el último pintado bueno: el aviso está en el editor, no en la ficha. Se devuelve `"pendiente"` y Problems queda vacío.

Quitar la línea `proveedor` hace que Problems la pida. Se restaura. La página sigue en «Informe de accesibilidad».

### 4 — Nace Tarjeta

Se crea la carpeta `bandeja/src/componentes/` y el archivo `Tarjeta.tsx`. El objeto se copia ahí. El import del tipo sube un nivel: `../modelo`. La función se llama `Tarjeta`, devuelve un `<article>` y el párrafo sigue siendo `{entrega.titulo}`.

Hasta que `App` no la use, la página no cambia. En `App.tsx` se borran el import de `Entregable` y la constante `entrega`, se importa `Tarjeta` desde `./componentes/Tarjeta` y el `<p>` se sustituye por `<Tarjeta />`. Al guardar, se sigue leyendo «Informe de accesibilidad». El dato ya no está en `App`.

Un import `./modelo` desde `Tarjeta.tsx` no resuelve: el archivo está un nivel más abajo. Se deja `../modelo`.

### 5 — La expresión y la pastilla

Dentro del `<article>`, debajo del título, se añade `<p>{entrega.id} · {entrega.proveedor}</p>`. Se lee `E-101 · Norte`. Cambiar `proveedor` a `"Sur"` y guardar cambia esa línea a `E-101 · Sur`. Se restaura `"Norte"`. Quitar las llaves de `{entrega.id}` pinta la palabra `entrega.id`.

La pastilla usa la clase que ya está en `bandeja/src/estilos.css`:

```tsx
<p className={`estado ${entrega.estado}`}>{entrega.estado}</p>
```

Con `"pendiente"` la pastilla es beige. `"revisado"` la pone verde. `"rechazado"`, rosada. Se deja `"pendiente"`. Escribir `class` en vez de `className` lo marca el editor.

Dónde queda: una sola ficha. El objeto `entrega` vive dentro de `bandeja/src/componentes/Tarjeta.tsx`. `App` solo escribe `<Tarjeta />`. La página de props parte de este archivo.

## Práctica

[M01-02 — La interfaz](../M01-tsx-y-componente/M01-02-interfaz.md), [M01-03 — El componente](../M01-tsx-y-componente/M01-03-componente.md), [M01-04 — Expresiones](../M01-tsx-y-componente/M01-04-expresiones.md) y [M01-05 — La clase](../M01-tsx-y-componente/M01-05-clase.md).
