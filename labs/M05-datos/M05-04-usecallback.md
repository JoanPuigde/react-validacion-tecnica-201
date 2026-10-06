# M05-04 — useCallback

[← Página anterior](M05-03-memo.md) · [Siguiente página →](M05-05-caso.md)

> Un paso. Fijar la función y el valor del contexto para que `memo` pueda saltarse la ficha.

### Objetivo

Conseguir que una letra en el filtro no aumente el contador de una ficha que sigue en la lista.

### Prerrequisitos

- [M05-03](M05-03-memo.md): `console.count(item.id)` está dentro de `Tarjeta` y sube al teclear.

### 1 — Fijar marcar

**Qué agregamos:** en el hook, envuelve `marcar`.

```tsx
const marcar = useCallback((id: string) => {
  dispatch({ type: "marcar", id })
}, [])
```

`dispatch` es estable. El array de dependencias puede ir vacío.

**Con esto conseguimos:** la prop `alMarcar` es la misma función entre pintados.

**Validar:** recarga, limpia la consola, escribe una letra.

→ El contador puede seguir subiendo. `memo` compara props, pero `useContext` despierta a la ficha si el valor del contexto es otro objeto. En `App` tienes `const sesion = { revisor }` (o equivalente) dentro del componente: ese objeto nace en cada pintado.

### 2 — Fijar el valor del contexto

**Qué agregamos:** en `App`.

```tsx
const sesion = useMemo(() => ({ revisor }), [revisor])
```

Pasa `sesion` al `Provider`. Borra el objeto suelto si lo tenías.

**Con esto conseguimos:** el contexto solo cambia cuando cambia el nombre. Escribir en «Buscar» no crea otra sesión.

**Validar:** recarga, limpia la consola, escribe `E` en «Buscar».

→ No sube el contador de las fichas que siguen visibles. Escribe en «Revisor».

→ Ahí sí suben: el contexto cambió y las fichas tienen que mostrar el nombre nuevo. Marca una ficha.

→ Sube el contador de esa ficha, porque su `item` es otro objeto. Quita `console.count` al terminar. `memo` se queda.

## Comprueba tu entendimiento

**El buscador no es un pintado de cada ficha**
Sin el `console.count`, escribe `Este`.
→ Solo queda el inventario. El filtro sigue siendo el `useMemo` de `visibles`. `memo` no sustituye al filtro.

## Reto

### 1 — Romper el callback

Añade `texto` como dependencia de `useCallback` aunque `marcar` no lo use. Escribe en el filtro con el `console.count` puesto otra vez. Luego vacía el array y borra el count.

<details>
<summary>Ver solución</summary>

Con `[texto]`, `marcar` cambia en cada letra y los contadores vuelven a subir. Con `[]`, paran. `texto` no pertenece a esa función.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| El contador sigue al teclear en Buscar | `sesion` no está en `useMemo`, o `marcar` no está en `useCallback` | Los dos pasos, y el `Provider` recibe ese `sesion` |
| `dispatch` dentro del callback marcado como missing | Metiste `items` u otra variable en la función y no en el array | `marcar` solo usa `dispatch` e `id` |
