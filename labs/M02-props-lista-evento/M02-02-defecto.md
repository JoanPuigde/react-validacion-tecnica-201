# M02-02 — El valor por defecto

[← Página anterior](M02-01-props.md) · [Siguiente página →](M02-03-condicional.md)

> Práctica de [Props](../M01-fundamentos/03-props.md).

### Objetivo

Añadir `textoBoton` opcional, ver el texto de reserva y ver el texto que manda el padre.

### Prerrequisitos

- [M02-01](M02-01-props.md): `<Tarjeta item={entrega} />` compila y Problems está vacío.

### En qué consiste

La prop nueva puede no venir. El experimento la pasa, la quita y le da un tipo imposible.

### 1 — Parámetro con defecto y botón

**Dónde:** `Tarjeta.tsx`, en la interfaz, en la firma y al final del `<article>`. `App.tsx` no se toca en este paso.

**Qué haces:**

1. Añade `textoBoton?: string` a `TarjetaProps`.
2. En la desestructuración, escribe `textoBoton = "Anotar"`.
3. Añade el botón y guarda.

```tsx
interface TarjetaProps {
  item: Entregable
  textoBoton?: string
}

export default function Tarjeta({ item, textoBoton = "Anotar" }: TarjetaProps) {
```

```tsx
<button type="button">{textoBoton} {item.id}</button>
```

**Experimento:** en `App`, añade `textoBoton="Registrar"` en la etiqueta. Guarda. Léelo. Quita el atributo. Guarda.

→ Con el atributo, el botón dice «Registrar E-101». Sin él, «Anotar E-101». `item` sigue siendo obligatorio: borrar `item={entrega}` vuelve a marcar el error. Restáuralo.

Segundo experimento: pasa `textoBoton={1}`.

→ Problems pide `string`. Quita ese valor.

**Validación:**

- Sin el atributo, el botón dice «Anotar E-101».
- Problems vacío.
- El `= "Anotar"` está en el parámetro, no escrito a mano solo dentro del JSX. Si quitas el defecto y no pasas la prop, el botón queda vacío o el editor marca `string | undefined`.

## Comprueba tu entendimiento

**El defecto no cambia el id**
El botón sigue enseñando `E-101` aunque cambies solo `textoBoton`.
→ Hay dos trozos: el texto que puede faltar y `{item.id}`, que no tiene defecto porque `item` es obligatorio.

## Reto

### 1 — Otro defecto

Cambia el defecto a `"Registrar"` y no pases la prop.

<details>
<summary>Ver solución</summary>

El botón dice «Registrar E-101» sin atributo en `App`. Deja el defecto en `"Anotar"` para el resto de los laboratorios: el botón de más adelante se busca por esa palabra.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El botón sale vacío | No está el `= "Anotar"` | El defecto va en la desestructuración |
| `textoBoton` no se usa | El botón sigue con un texto fijo | El contenido del botón incluye `{textoBoton}` |
