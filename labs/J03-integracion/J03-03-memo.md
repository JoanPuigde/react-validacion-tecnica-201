# J03-03 — Memo

[← Página anterior](J03-02-hoc.md) · [Siguiente página →](J03-04-reducer.md)

> Laboratorio de [Memo](README.md).

### Objetivo

Ver cuándo `memo` se salta `Tarjeta`, y cuándo un valor nuevo del contexto lo impide.

### Código de partida

[J03-02](J03-02-hoc.md) está hecho. `Tarjeta` termina en `export default conRevisor(Tarjeta)`. `marcar` en `App` todavía es una `function`. Si no tienes el HOC, ese laboratorio trae el archivo.

Abre la consola del navegador (F12, pestaña Consola). `console.log` se ve con el nivel por defecto. Cada vez que la ficha se ejecuta, escribe su id.

### 1 — La ficha se ejecuta al teclear

**Dónde:** `Tarjeta.tsx`, primera línea de la función.

**Qué haces:**

1. Añade el `console.log`.
2. Guarda. Limpia la consola.
3. Escribe una letra en «Buscar».

```tsx
console.log(item.id)
```

→ Aparecen ids. `App` se ha vuelto a ejecutar y la ficha es hija suya. En desarrollo pueden salir repetidos: `StrictMode` en `main.tsx` llama dos veces. No es un fallo. Mira si salen líneas nuevas.

### 2 — memo y una función estable

**Dónde:** `App.tsx` y la última línea de `Tarjeta.tsx`.

**Qué haces:**

1. `marcar` pasa a `useCallback`.
2. Envuelve el HOC con `memo`.
3. Limpia la consola y escribe otra letra.

```tsx
import { useCallback, useState } from "react"
```

```tsx
const marcar = useCallback((id: string) => {
  setItems((lista) =>
    lista.map((item) =>
      item.id === id ? { ...item, estado: "revisado" } : item,
    ),
  )
}, [])
```

```tsx
import { memo } from "react"
```

```tsx
export default memo(conRevisor(Tarjeta))
```

→ No salen ids nuevos. `memo` compara `item` y `alMarcar`. La función es la misma porque `useCallback` tiene `[]`. El proveedor, en `main.tsx`, no se entera de la caja «Buscar».

### 3 — El valor del contexto, nuevo en cada pintado

**Dónde:** `bandeja/src/contexto/Sesion.tsx`.

**Qué haces:**

1. Añade un estado que no es el revisor, y un botón. El `value` es un objeto escrito en el JSX.
2. Limpia la consola y pulsa «Tocar».
3. Memoriza el valor con `[revisor]`.
4. Limpia la consola, pulsa «Tocar» otra vez y después escribe `Luis`.
5. Quita `tocar`, el botón y el `console.log`. Deja el `useMemo` y el `memo`.

Primero, sin memorizar:

```tsx
const [revisor, setRevisor] = useState("Ana")
const [tocar, setTocar] = useState(0)
return (
  <SesionContexto.Provider value={{ revisor, setRevisor }}>
    <button type="button" onClick={() => setTocar(tocar + 1)}>
      Tocar {tocar}
    </button>
    {children}
  </SesionContexto.Provider>
)
```

→ «Tocar» pasa de 0 a 1 y el nombre sigue en Ana, pero la consola escribe los ids. `memo` no frena esto: el proveedor se pintó con otro objeto, y `conRevisor` lee ese contexto.

Ahora el valor memorizado. El botón se queda un momento:

```tsx
import { useMemo, useState, type ReactNode } from "react"
```

```tsx
const valor = useMemo(() => ({ revisor, setRevisor }), [revisor])

return (
  <SesionContexto.Provider value={valor}>
    <button type="button" onClick={() => setTocar(tocar + 1)}>
      Tocar {tocar}
    </button>
    {children}
  </SesionContexto.Provider>
)
```

→ «Tocar» ya no escribe ids. `Luis` sí: el nombre cambió, el valor es otro y las seis fichas dicen «Revisor: Luis».

Al terminar, `SesionProveedor` se queda así. Sin botón y sin `tocar`.

```tsx
export function SesionProveedor({ children }: { children: ReactNode }) {
  const [revisor, setRevisor] = useState("Ana")
  const valor = useMemo(() => ({ revisor, setRevisor }), [revisor])
  return <SesionContexto.Provider value={valor}>{children}</SesionContexto.Provider>
}
```

**Validación:**

- `export default memo(conRevisor(Tarjeta))`.
- `marcar` es un `useCallback` con `[]`.
- No quedan `console.log` ni el botón «Tocar».
- Problems vacío.

## Comprueba tu entendimiento

**Qué compara memo**
`memo` mira las props. El contexto lo mira quien llama a `useSesion`, aquí `Envuelto`.
→ Si el `value` es otro objeto, `Envuelto` se ejecuta aunque `item` sea el mismo. Por eso el `useMemo` está en el proveedor.

## Reto

### 1 — Quitar el useCallback

Deja `marcar` otra vez como `function`, con `memo` puesto. Escribe una letra.
→ Vuelven los ids: `alMarcar` es una función nueva y `memo` lo toma por un cambio. Restaura el `useCallback`.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Teclear sigue escribiendo ids | `marcar` no está en `useCallback`, o el `memo` no envuelve el export | `useCallback` con `[]` y `memo(conRevisor(Tarjeta))` |
| «Tocar» no escribe ids y aún no hay `useMemo` | El `value` ya era una constante | Vuelve a `value={{ revisor, setRevisor }}` para el experimento |
| El revisor no cambia | El `useMemo` tiene `[]` | La dependencia es `[revisor]` |
