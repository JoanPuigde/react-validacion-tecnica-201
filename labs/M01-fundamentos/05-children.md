# Children

[← Página anterior](04-eventos.md) · [Siguiente página →](../M02-estado-y-hooks/README.md)

`children` es lo que se escribe entre la etiqueta de apertura y la de cierre. También es una prop. El tipo es `React.ReactNode`: elementos, texto o `null`. No es `any`.

```tsx
interface MarcoProps {
  titulo: string
  children: React.ReactNode
}

function Marco({ titulo, children }: MarcoProps) {
  return (
    <section>
      <h2>{titulo}</h2>
      {children}
    </section>
  )
}
```

Quien usa `Marco` decide el contenido. El marco decide el título y el sitio donde ese contenido cae.

```tsx
<Marco titulo="Lista">
  <ul className="lista">{/* las tarjetas */}</ul>
</Marco>
```

Un fragmento agrupa sin inventar un nodo. `<>...</>` (o `<Fragment>`) sirve cuando el return necesita un solo padre y un `<section>` no aporta nada. El encabezado y la lista pasan a ser hermanos. En el inspector, el padre del `<h2>` es `<main>`, no un envoltorio de más.

> [!NOTE]
> Props, evento y children son tres canales distintos. La prop `item` es un dato. `onClick` es un aviso hacia arriba. `children` es interfaz que el padre mete dentro. Ninguno sustituye a los otros.

## Demostración guiada

La lista de fichas queda entre `<Marco titulo="Lista">` y `</Marco>`. Sobre las fichas aparece el encabezado «Lista». Al filtrar más adelante, el aviso de «ningún entregable» también cae ahí dentro, porque es children, no un texto fijo del marco.

Al sustituir el `<section>` por un fragmento, el encabezado sigue y el inspector deja de mostrar el section. Quitar el fragmento y dejar dos elementos sueltos en el return no compila: un return de TSX tiene un solo nodo raíz.

## Práctica

[M04-01 — children](../M04-hooks/M04-01-children.md) y [M04-02 — El fragmento](../M04-hooks/M04-02-fragmento.md).
