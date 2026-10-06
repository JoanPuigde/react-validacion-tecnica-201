# M05-03 — memo

[← Página anterior](M05-02-finales.md) · [Siguiente página →](M05-04-usecallback.md)

> Práctica de [Qué mirar](../M04-rendimiento/01-que-mirar.md).

### Objetivo

Contar cuántas veces se ejecuta `Tarjeta` al escribir en el filtro, y dejar el contador puesto para el laboratorio siguiente.

### Prerrequisitos

- [M05-02](M05-02-finales.md): la lista llega por la petición. El filtro sigue en `App`. No queda un `setTimeout` de prueba.

### En qué consiste

`memo` y `console.count`. El experimento enseña que envolver no basta si una prop nace en cada pintado. No se arregla todavía.

### 1 — Envolver y contar

**Dónde:** `Tarjeta.tsx`. El `console.count` va en la primera línea del cuerpo. El `export default` pasa a ser `memo(Tarjeta)`.

**Qué haces:**

1. Importa `memo`.
2. La función deja de ser `export default function`. Pasa a `function Tarjeta`.
3. Añade el contador.
4. Exporta `memo(Tarjeta)`.
5. Recarga, limpia la consola y escribe una letra en «Buscar».

```tsx
import { memo, useContext } from "react"

function Tarjeta({ item, textoBoton = "Anotar", alMarcar }: TarjetaProps) {
  console.count(item.id)
  const { revisor } = useContext(SesionContexto)
  // el return no cambia
}

export default memo(Tarjeta)
```

**Experimento:** limpia la consola. Escribe `E`. Anota qué ids suben. Borra la letra. Escribe `E` otra vez.

→ Sube el contador de las fichas que siguen en pantalla. `memo` no las ha saltado. El padre cambió `texto` y volvió a pintar. Una de las props que `Tarjeta` recibe no es la misma referencia que en el pintado anterior.

Segundo experimento: no borres el contador. Marca E-101 y mira solo esa etiqueta en la consola.

→ E-101 sube, porque su `item` es otro objeto (`estado: "revisado"`). Eso es un repintado esperado. El que queremos mirar en el laboratorio siguiente es el de teclear en «Buscar» sin marcar.

**Validación:**

- La consola muestra etiquetas `E-101`, `E-102`, etc.
- Escribir una letra aumenta esos números.
- `memo` sigue en el export. `console.count` sigue en la función. No lo quites en este laboratorio.
- Problems vacío. El botón sigue diciendo «Anotar» o «Hecho».

## Comprueba tu entendimiento

**Qué prop cambia sin que el dato cambie**
Las props de `Tarjeta` son `item`, `textoBoton` y `alMarcar`. El `item` de E-102 es el mismo objeto si no lo marcaste.
→ La función `marcar` se declara dentro del hook y nace otra vez en cada ejecución. `memo` la ve distinta. No la envuelvas todavía: el siguiente laboratorio lo hace y mide el contador.

## Reto

### 1 — Confirmar que el count está dentro

Mueve `console.count(item.id)` justo encima de `function Tarjeta`, fuera del cuerpo. Escribe una letra. Devuélvelo a la primera línea de la función.

<details>
<summary>Ver solución</summary>

Fuera de la función, el contador no corre en cada pintado de la ficha: corre al cargar el módulo. Dentro, cada ejecución de `Tarjeta` suma. Tiene que quedarse dentro.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No hay contadores | `console.count` está fuera de la función o la consola tiene filtro | Primera línea del cuerpo de `Tarjeta` |
| `memo` no está definido | Falta el import | `import { memo, useContext } from "react"` |
| La página en blanco | El export sigue siendo la función y además `memo(Tarjeta)` | Un solo export: `export default memo(Tarjeta)` |
