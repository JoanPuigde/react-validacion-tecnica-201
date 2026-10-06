# M04-04 — El contexto

[← Página anterior](M04-03-useref.md) · [Siguiente página →](M04-05-usememo.md)

> Un paso. `Tarjeta` lee el nombre del revisor sin una prop nueva.

### Objetivo

Cambiar un input «Revisor» y ver ese nombre en cada ficha.

### Prerrequisitos

- [M04-03](M04-03-useref.md): las fichas siguen recibiendo `item` y `alMarcar` por props.

### 1 — El contexto tipado

**Qué agregamos:** `bandeja/src/contexto/Sesion.tsx`.

```tsx
import { createContext } from "react"

export interface Sesion {
  revisor: string
}

export const SesionContexto = createContext<Sesion>({ revisor: "sin nombre" })
```

**Con esto conseguimos:** un valor por defecto tipado. Quien no tenga proveedor encima lee «sin nombre», no `undefined`.

**Validar:** el archivo guarda. La página no cambia todavía.

### 2 — Proveer y leer

**Qué agregamos:** en `App`, un estado y el proveedor alrededor de `<main>`… o al menos alrededor de la lista. Lo simple es envolver el return entero.

```tsx
const [revisor, setRevisor] = useState("Ana")
const sesion: Sesion = { revisor }
```

```tsx
return (
  <SesionContexto.Provider value={sesion}>
    <main>{/* lo que ya había, más este input al principio */}</main>
  </SesionContexto.Provider>
)
```

```tsx
<label htmlFor="revisor">Revisor</label>
<input
  id="revisor"
  value={revisor}
  onChange={(evento) => setRevisor(evento.target.value)}
/>
```

En `Tarjeta.tsx`:

```tsx
import { useContext } from "react"
import { SesionContexto } from "../contexto/Sesion"

const { revisor } = useContext(SesionContexto)
```

Y un párrafo dentro del `<article>`:

```tsx
<p>Revisor: {revisor}</p>
```

**Con esto conseguimos:** el nombre no viaja en `TarjetaProps`. `useContext` lee el proveedor de arriba.

**Validar:** las fichas dicen «Revisor: Ana». Borra y escribe `Luis`.

→ Todas las fichas dicen «Revisor: Luis» a la vez. `TarjetaProps` no tiene un campo `revisor`. Si lo añades, estás pasando una prop, no usando el contexto: quítalo.

## Comprueba tu entendimiento

**El defecto del createContext**
Comenta el `<SesionContexto.Provider>` y deja el `useContext`.
→ Las fichas dicen «Revisor: sin nombre». Vuelve a envolver con el proveedor.

## Reto

### 1 — Ampliar la interfaz

Añade `turno: number` a `Sesion`. Mira qué se queja.

<details>
<summary>Ver solución</summary>

El valor por defecto de `createContext` y el objeto `sesion` de `App` piden `turno`. Añadir `turno: 1` en los dos calla el error. Si no vas a mostrarlo, quita el campo y deja la interfaz solo con `revisor`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Siempre «sin nombre» con el input cambiado | El proveedor no envuelve a `Tarjeta` | `Provider` por fuera del `map` |
| `revisor` no se usa en `App` | Creaste el estado y no el input | El input tiene `value={revisor}` |
