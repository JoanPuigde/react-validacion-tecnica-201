# M02-02 — El valor por defecto

[← Página anterior](M02-01-props.md) · [Siguiente página →](M02-03-condicional.md)

> Un paso. Una prop que puede no venir, con un texto de reserva.

### Objetivo

Añadir `textoBoton` opcional y usarlo en un botón.

### Prerrequisitos

- [M02-01](M02-01-props.md): `<Tarjeta item={entrega} />` compila.

### 1 — La prop opcional

**Qué agregamos:** en `TarjetaProps` y en la desestructuración.

```tsx
interface TarjetaProps {
  item: Entregable
  textoBoton?: string
}

export default function Tarjeta({ item, textoBoton = "Anotar" }: TarjetaProps) {
```

Y el botón, al final del `<article>`:

```tsx
<button type="button">{textoBoton}</button>
```

**Con esto conseguimos:** si nadie pasa `textoBoton`, el botón dice «Anotar». El `?` es el único sitio donde el dato puede faltar, porque hay un valor por defecto.

**Validar:** la ficha muestra el botón «Anotar» sin cambiar `App.tsx`. En `App`, añade `textoBoton="Registrar"` solo en esa etiqueta.

→ El botón pasa a «Registrar». Quita el atributo.

→ El botón vuelve a «Anotar». `item` sigue siendo obligatorio: borrar `item={entrega}` vuelve a marcar el error.

## Comprueba tu entendimiento

**El defecto no es un `any`**
Pasa `textoBoton={1}`.
→ El editor pide `string`. Quita ese valor.

## Reto

### 1 — Incluir el id en el botón

Haz que el botón diga `Anotar E-101` usando `textoBoton` e `item.id`, sin cambiar el valor por defecto.

<details>
<summary>Ver solución</summary>

```tsx
<button type="button">
  {textoBoton} {item.id}
</button>
```

Con el defecto se lee «Anotar E-101». Con `textoBoton="Registrar"` se lee «Registrar E-101».

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El botón dice vacío | `textoBoton` se usa y el `= "Anotar"` no está en el parámetro | El defecto va en la desestructuración, no dentro del JSX con un `any` |
