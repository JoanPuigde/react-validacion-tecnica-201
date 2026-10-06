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

Con la consola abierta, al cargar la bandeja no aparece ningún id. Al pulsar «Anotar E-104» se escribe `E-104` una vez. La dirección no cambia y la lista no desaparece. La pastilla de E-104 sigue en `rechazado`: el manejador no ha tocado el objeto.

Al quitar la flecha y dejar los paréntesis, la consola se llena al recargar. Al restituir `() =>`, el silencio vuelve hasta el clic.

## Práctica

[M02-05 — El evento](../M02-props-lista-evento/M02-05-evento.md).
