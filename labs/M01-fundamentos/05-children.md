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

Punto de partida: las seis fichas y el botón que escribe el id. Todavía no hay caja «Buscar». `Marco` no existe.

Los laboratorios de esta página están en `labs/M04-hooks/` (M04-01 y M04-02). Se abren cuando el filtro ya vive en `App`. La demostración de ahora se hace sobre la lista fija, sin esperar a ese momento.

### 1 — El marco, sin usarlo

Se crea `bandeja/src/componentes/Marco.tsx`. `titulo` es `string`. `children` es `React.ReactNode`. La función devuelve un `<section>` con un `<h2>{titulo}</h2>` y, debajo, `{children}`.

La página no cambia: `App` todavía no importa `Marco`.

### 2 — El título y la lista viajan aparte

En `App.tsx` se envuelve la `<ul>`:

```tsx
<Marco titulo="Lista">
  <ul className="lista">{/* el map de las tarjetas */}</ul>
</Marco>
```

Sobre las fichas aparece el encabezado «Lista». Cambiar `titulo` a `"Pendientes"` cambia solo ese encabezado. Las fichas siguen siendo las del `map`. Cerrar `<Marco titulo="Lista" />` sin hijos deja el encabezado y vacía la lista: las fichas eran children, no un texto del marco. Se vuelve a abrir la etiqueta y a meter la `<ul>` dentro.

### 3 — El fragmento no añade un nodo

En `Marco`, el `<section>` se sustituye por `<>...</>`. El encabezado «Lista» sigue. En el inspector, el padre del `<h2>` pasa a ser `<main>`. Quitar el fragmento y dejar el `<h2>` y `{children}` como dos elementos sueltos en el `return` no compila: un return de TSX tiene un solo nodo raíz. Se restituye el fragmento, o el `<section>` si se quiere el borde.

Dónde queda: las seis fichas siguen saliendo de `datos.ts`. El botón sigue en la consola. El buscador llega en el módulo de estado. Si `Marco` estorba al seguir los laboratorios de estado, se deja la `<ul>` otra vez suelta en `App`: el concepto ya se vio.

## Práctica

[M04-01 — children](../M04-hooks/M04-01-children.md) y [M04-02 — El fragmento](../M04-hooks/M04-02-fragmento.md).
