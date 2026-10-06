# Eventos

[← Página anterior](03-props.md) · [Siguiente página →](05-children.md)

El clic es una prop más: `onClick` recibe una función. No es un atributo HTML con una cadena.

```tsx
function anotar(id: string): void {
  console.log(id)
}

<button type="button" onClick={() => anotar(item.id)}>
  {textoBoton} {item.id}
</button>
```

`anotar` solo acepta `string` y no devuelve nada. `void` lo deja escrito. La flecha se crea al pintar y corre al pulsar.

> [!WARNING]
> `onClick={anotar(item.id)}` ejecuta la función al pintar. Los seis id aparecerían en la consola al cargar y el clic no serviría. La referencia espera al clic: `() => anotar(item.id)`.

`type="button"` deja la intención explícita. Un botón sin ese tipo, dentro de un formulario, enviaría la página. Aquí no hay formulario, y el atributo evita la duda.

Si la función necesita el evento del ratón, el tipo es `React.MouseEvent<HTMLButtonElement>`. `onClick` ya lo infiere. No hace falta `any` para recibirlo.

El botón de este momento solo anota. No cambia la pastilla. Cambiar el estado es el flujo del módulo siguiente: el hijo avisa, el padre guarda.

## Demostración guiada

Punto de partida: las seis fichas de `datos.ts` están en pantalla. `Tarjeta` recibe `item`. El botón dice «Anotar E-104» en el inventario y todavía no tiene `onClick`. La consola del navegador se abre antes de recargar (F12, pestaña Console).

### 1 — El clic escribe el id

En `Tarjeta.tsx`, junto al componente, una función `anotar(id: string): void` que hace `console.log(id)`. El botón queda así:

```tsx
<button type="button" onClick={() => anotar(item.id)}>
  {textoBoton} {item.id}
</button>
```

Se recarga. La consola no escribe ningún id al cargar. Pulsar «Anotar E-104» escribe `E-104` una vez. Pulsar «Anotar E-101» suma `E-101`. La dirección de la página no cambia y las seis fichas siguen. La pastilla de E-104 sigue en `rechazado`: este manejador no toca el objeto.

### 2 — Los paréntesis disparan al pintar

Se quita la flecha y se deja `onClick={anotar(item.id)}`. Al guardar, la consola escribe los seis id sin haber pulsado nada. El clic ya no añade una línea nueva: la función corrió al pintar.

Se restituye `onClick={() => anotar(item.id)}`. Se recarga. Silencio hasta el clic.

### 3 — El argumento sigue siendo string

Cambiar la llamada a `anotar(item.estado)` y pulsar E-102 escribe `revisado`. Compila porque `estado` también es `string`. Se vuelve a `item.id` y la consola vuelve a escribir `E-102`. El laboratorio se queda con el id.

Dónde queda: seis fichas, botón que espera al clic, pastillas iguales que en `datos.ts`. El buscador todavía no existe. El módulo de estado parte de aquí.

## Práctica

[M02-05 — El evento](../M02-props-lista-evento/M02-05-evento.md).
