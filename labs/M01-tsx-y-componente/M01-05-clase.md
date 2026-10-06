# M01-05 — La clase

[← Página anterior](M01-04-expresiones.md) · [Siguiente página →](../M02-props-lista-evento/README.md)

> Un paso. El estado del entregable elige la clase, no un estilo escrito en el componente.

### Objetivo

Pintar `entrega.estado` con `className`, usando las clases que ya están en `estilos.css`.

### Prerrequisitos

- [M01-04](M01-04-expresiones.md): la ficha muestra título, id y proveedor.

### 1 — Colgar la clase del dato

**Qué agregamos:** este párrafo dentro del `<article>`.

```tsx
<p className={`estado ${entrega.estado}`}>{entrega.estado}</p>
```

**Con esto conseguimos:** el texto es el estado y la clase también. En la hoja ya existen `.estado.pendiente`, `.estado.revisado` y `.estado.rechazado`. No hace falta `style={{ }}` para este paso.

**Validar:** se lee «pendiente» dentro de una pastilla beige. Cambia el objeto a `estado: "revisado"`.

→ La pastilla pasa a verde y el texto a `revisado`. Devuelve `"pendiente"`.

> [!NOTE]
> En TSX el atributo es `className`, no `class`. `class` es una palabra reservada de JavaScript.

## Comprueba tu entendimiento

**La clase sale del dato**
Pon `estado: "rechazado"`.
→ Pastilla rosada y texto `rechazado`. Restaura `"pendiente"`.

## Reto

### 1 — Una clase que no existe

Escribe a mano `className="estado urgente"` sin usar el dato.

<details>
<summary>Ver solución</summary>

La pastilla queda gris: `.estado` existe y `.urgente` no. Vuelve a `` className={`estado ${entrega.estado}`} `` para que el color dependa del objeto.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El editor marca `class` | Usaste el atributo HTML | Cámbialo por `className` |
| Siempre gris | La clase es la palabra `estado` y no se concatena el valor | La template string incluye `${entrega.estado}` |
