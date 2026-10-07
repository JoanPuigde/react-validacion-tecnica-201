# J04-02 — Re-renderizados

[← Página anterior](J04-01-impacto.md) · [Siguiente página →](J04-03-estado.md)

> Laboratorio de [Re-renderizados](README.md).

### Objetivo

Hacer que teclear deje de ejecutar las fichas cuyo `item` no cambió.

### Código de partida

`Tarjeta` tiene `console.count(item.id)`. Si no, añádelo como en [J04-01](J04-01-impacto.md). `marcar` vive en `App` o en un hook.

### 1 — memo y useCallback

**Dónde:** `Tarjeta.tsx` y el archivo donde está `marcar`.

**Qué haces:**

1. Exporta `memo(Tarjeta)`. Limpia la consola y teclea. El contador sigue.
2. Envuelve `marcar` en `useCallback` con `[]`.
3. Limpia la consola, teclea y marca E-101.
4. Deja `memo` y `useCallback`. El contador sigue hasta el último laboratorio de la jornada.

```tsx
import { memo } from "react"
```

```tsx
function Tarjeta({ item, textoBoton = "Anotar", alMarcar }: TarjetaProps) {
  console.count(item.id)
  // el return no cambia
}

export default memo(Tarjeta)
```

```tsx
const marcar = useCallback((id: string): void => {
  setItems((lista) =>
    lista.map((item) =>
      item.id === id ? { ...item, estado: "revisado" } : item,
    ),
  )
}, [])
```

**Experimento:** si al teclear siguen contando todas, `marcar` no es la constante que llega a la prop.

→ Con los dos, una letra no cuenta en las fichas que no cambian de objeto. Marcar E-101 cuenta esa ficha.

**Validación:**

- `export default memo(Tarjeta)`.
- La prop `alMarcar` es el `useCallback`.
- Problems vacío.

## Comprueba tu entendimiento

**Por qué memo solo no basta**
Sin `useCallback`, `marcar` es otra función en cada pintado.
→ `memo` compara la referencia y no se la salta.

## Reto

### 1 — Una flecha en la etiqueta

Pasa `alMarcar={(id) => marcar(id)}` en el `map`, aunque `marcar` esté en `useCallback`. Teclea. Vuelve a `alMarcar={marcar}`.

<details>
<summary>Ver solución</summary>

La flecha es nueva en cada pintado. El contador vuelve a subir. La prop tiene que ser la misma referencia.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Siguen contando todas | `memo` no está aplicado, o la prop es una flecha nueva | `export default memo(Tarjeta)` y `alMarcar={marcar}` |
| `useCallback` no está definido | Falta en el import | `import { useCallback, useState } from "react"` dentro del archivo que declara `marcar` |
