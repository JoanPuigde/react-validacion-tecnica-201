# J03-01 — useContext

[← Página anterior](README.md) · [Siguiente página →](J03-02-hoc.md)

> Laboratorio de [useContext](README.md).

### Objetivo

Llevar el nombre de quien revisa a las fichas sin añadirlo a las props.

### Código de partida

`App` tiene la caja «Buscar», `items` y `marcar`. `Tarjeta` recibe `item` y `alMarcar`. Si no es así, pega el `App.tsx` de [J02-02](../J02-estado/J02-02-usestate.md) y la función de [J01-06](../J01-fundamentos/J01-06-props.md).

### 1 — El proveedor y la lectura

**Dónde:** archivo nuevo `bandeja/src/contexto/Sesion.tsx`, `main.tsx` y `Tarjeta.tsx`.

**Qué haces:**

1. Crea el contexto y el hook.
2. Envuelve `<App />` en `main.tsx`.
3. En `Tarjeta`, lee `revisor` y pinta un párrafo. No toques `TarjetaProps`.
4. En `App`, una caja cambia el nombre.
5. Escribe `Luis`.

```tsx
import { createContext, useContext, useState, type ReactNode } from "react"

interface Sesion {
  revisor: string
  setRevisor: (nombre: string) => void
}

const SesionContexto = createContext<Sesion | null>(null)

export function SesionProveedor({ children }: { children: ReactNode }) {
  const [revisor, setRevisor] = useState("Ana")
  return (
    <SesionContexto.Provider value={{ revisor, setRevisor }}>
      {children}
    </SesionContexto.Provider>
  )
}

export function useSesion(): Sesion {
  const sesion = useContext(SesionContexto)
  if (!sesion) throw new Error("useSesion fuera del proveedor")
  return sesion
}
```

```tsx
import { SesionProveedor } from "./contexto/Sesion"
```

En `main.tsx`, `<SesionProveedor>` envuelve a `<App />` y queda dentro de `<StrictMode>`.

```tsx
const { revisor } = useSesion()
```

```tsx
<p>Revisor: {revisor}</p>
```

En `App`, encima de «Buscar»:

```tsx
const { revisor, setRevisor } = useSesion()
```

```tsx
<label htmlFor="revisor">Revisor</label>
<input
  id="revisor"
  value={revisor}
  onChange={(evento) => setRevisor(evento.target.value)}
/>
```

**Experimento:** quita `<SesionProveedor>` en `main.tsx`. Recarga. Vuelve a ponerlo.

→ Con el proveedor, las seis fichas dicen «Revisor: Ana». `Luis` las cambia todas. `TarjetaProps` no tiene `revisor`. Sin el proveedor, la página lanza «useSesion fuera del proveedor».

**Validación:**

- No hay `revisor={revisor}` en `<Tarjeta>`.
- Problems vacío con el proveedor puesto.
- El filtro sigue respondiendo.

## Comprueba tu entendimiento

**Quién provee**
El `useState` de `revisor` está en `SesionProveedor`, no en `Tarjeta`.
→ La ficha solo lee. La caja de `App` pide el siguiente nombre.

## Reto

### 1 — Un campo de más en el contexto

Añade `turno: number` a la interfaz y no lo pongas en el valor. Lee Problems. Quítalo.

<details>
<summary>Ver solución</summary>

El objeto del `value` no cumple `Sesion`. O añades `turno: 1` en los dos sitios, o dejas la interfaz solo con `revisor` y `setRevisor`. Para seguir, se queda sin `turno`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `useSesion fuera del proveedor` | `App` quedó fuera de `SesionProveedor` | El proveedor envuelve `<App />` en `main.tsx` |
| El editor pide `revisor` en `<Tarjeta>` | Lo metiste en `TarjetaProps` | Quítalo de la interfaz. Se lee con `useSesion` |
| Solo cambia una ficha | Escribiste el nombre a mano en una ficha | El párrafo es `{revisor}` del contexto |
