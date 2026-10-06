# M04-04 — El contexto

[← Página anterior](M04-03-useref.md) · [Siguiente página →](M04-05-usememo.md)

> Práctica de [Estructura](../M03-apis-y-arquitectura/02-estructura.md).

### Objetivo

Cambiar un input «Revisor» y ver ese nombre en cada ficha, sin añadirlo a `TarjetaProps`.

### Prerrequisitos

- [M04-03](M04-03-useref.md): las fichas reciben `item` y `alMarcar`. El botón «Ir al buscador» enfoca `#filtro`.

### En qué consiste

Un contexto con valor por defecto, un proveedor y `useContext`. El experimento quita el proveedor y luego intenta colar el nombre como prop.

### 1 — El contexto

**Dónde:** archivo nuevo `bandeja/src/contexto/Sesion.tsx`. No lo importes todavía.

**Qué haces:**

1. Crea la interfaz y el contexto.
2. Guarda.
3. Confirma que la página no ha cambiado.

```tsx
import { createContext } from "react"

export interface Sesion {
  revisor: string
}

export const SesionContexto = createContext<Sesion>({ revisor: "sin nombre" })
```

**Experimento:** cambia el defecto a `{ revisor: 1 }` sin cambiar la interfaz.

→ Problems: `number` no es `string`. Restaura `"sin nombre"`. La página sigue igual porque nadie lee el contexto.

**Validación:**

- Problems vacío.
- No hay `any`.
- Las fichas todavía no dicen «Revisor».

### 2 — Proveer y leer

**Dónde:** `App.tsx` para el estado, el objeto y el proveedor. `Tarjeta.tsx` para la lectura y el párrafo.

**Qué haces:**

1. En `App`, estado `revisor` con valor inicial `"Ana"` y `const sesion: Sesion = { revisor }`.
2. Envuelve el return con `SesionContexto.Provider`.
3. Añade el input `#revisor` arriba del buscador.
4. En `Tarjeta`, lee el contexto y pinta el párrafo.
5. Guarda. No añadas `revisor` a `TarjetaProps`.

```tsx
const [revisor, setRevisor] = useState("Ana")
const sesion: Sesion = { revisor }
```

```tsx
return (
  <SesionContexto.Provider value={sesion}>
    <main>{/* lo que ya había */}</main>
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

```tsx
import { useContext } from "react"
import { SesionContexto } from "../contexto/Sesion"

const { revisor } = useContext(SesionContexto)
```

```tsx
<p>Revisor: {revisor}</p>
```

**Experimento:** comenta el `Provider` y deja el `useContext`. Lee las fichas. Vuelve a envolver.

→ Sin proveedor, todas dicen «Revisor: sin nombre», el defecto de `createContext`. Con el proveedor, «Revisor: Ana».

Segundo experimento: borra el input y escribe `Luis` solo en una ficha, a mano, como texto fijo. Deshazlo. Escribe `Luis` en el input.

→ El texto fijo cambia una ficha. El input las cambia todas a la vez. `TarjetaProps` sigue sin campo `revisor`. Si lo añades y lo pasas en el `map`, ya no es este paso: quítalo.

**Validación:**

- Al recargar, cada ficha dice «Revisor: Ana».
- Escribir `Luis` en `#revisor` lo pone en todas.
- El filtro y «Ir al buscador» siguen funcionando.
- Problems vacío.

## Comprueba tu entendimiento

**El nombre no baja por el map**
El `map` sigue pasando `item` y `alMarcar`.
→ No hay `revisor={revisor}` en `<Tarjeta>`. El párrafo sale de `useContext`.

## Reto

### 1 — Ampliar la interfaz

Añade `turno: number` a `Sesion`. Mira qué archivos se quejan. Si no vas a mostrarlo, quita el campo.

<details>
<summary>Ver solución</summary>

El valor por defecto de `createContext` y el objeto `sesion` de `App` piden `turno`. `turno: 1` en los dos calla el error. Para seguir, la interfaz se queda solo con `revisor`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Siempre «sin nombre» | El `Provider` no envuelve a `Tarjeta` | `Provider` por fuera del `map` |
| `revisor` no se usa en `App` | Creaste el estado y no el input | El input tiene `value={revisor}` |
| El editor pide `revisor` en `<Tarjeta>` | Lo metiste en `TarjetaProps` | Quítalo de la interfaz; se lee con `useContext` |
