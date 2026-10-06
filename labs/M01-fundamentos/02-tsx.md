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

En `App.tsx` aparece un objeto `entrega` anotado como `Entregable`. El párrafo deja de ser una frase fija y pasa a leer `{entrega.titulo}`. Al cambiar `proveedor` en el objeto, la ficha cambia al guardar: Vite ha vuelto a pintar.

Al poner `estado: "listo"`, el editor subraya el campo y `npm run build` falla en esa línea. Al devolver `"pendiente"`, el aviso desaparece y la pastilla usa la clase `.estado.pendiente` que ya está en la hoja de estilos.

El mismo objeto, movido a una función `Tarjeta` en `src/componentes/Tarjeta.tsx`, sigue pintando igual. `App` solo la usa. La función no extiende ninguna clase.

## Práctica

[M01-02 — La interfaz](../M01-tsx-y-componente/M01-02-interfaz.md), [M01-03 — El componente](../M01-tsx-y-componente/M01-03-componente.md), [M01-04 — Expresiones](../M01-tsx-y-componente/M01-04-expresiones.md) y [M01-05 — La clase](../M01-tsx-y-componente/M01-05-clase.md).
