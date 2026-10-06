# M05-03 — memo

[← Página anterior](M05-02-finales.md) · [Siguiente página →](M05-04-usecallback.md)

> Un paso. Contar cuántas veces se ejecuta `Tarjeta` al escribir en el filtro. Todavía no se evita.

### Objetivo

Ver el número de cada ficha subir en la consola aunque su `item` no haya cambiado.

### Prerrequisitos

- [M05-02](M05-02-finales.md): la lista llega por la petición y el filtro sigue en `App`.

### 1 — Envolver y contar

**Qué agregamos:** en `Tarjeta.tsx`, convierte el export en un componente memorizado y cuenta al empezar la función.

```tsx
import { memo, useContext } from "react"

function Tarjeta({ item, textoBoton = "Anotar", alMarcar }: TarjetaProps) {
  console.count(item.id)
  const { revisor } = useContext(SesionContexto)
  // el return no cambia
}

export default memo(Tarjeta)
```

**Con esto conseguimos:** `memo` compara las props. Si alguna es nueva, la función corre y el contador sube. `console.count` etiqueta por id.

**Validar:** recarga, limpia la consola y escribe una letra en «Buscar».

→ Sube el contador de las fichas que siguen en pantalla. `memo` no las ha saltado. No lo quites todavía: el laboratorio siguiente usa ese número. No borres `console.count` hasta que allí te lo pida.

## Comprueba tu entendimiento

**El padre sí se vuelve a ejecutar**
La letra cambió `texto`, que es estado de `App`. `App` se vuelve a pintar y pasa props a cada `Tarjeta`.
→ El contador demuestra que esas props no le parecen iguales a `memo`.

## Reto

### 1 — Qué prop cambia

Sin arreglarlo aún, recuerda las props: `item` y `alMarcar`. El `item` de E-102 es el mismo objeto si no lo marcaste. La que nace en cada pintado es `marcar`, porque es una función declarada en el hook.

<details>
<summary>Ver solución</summary>

No cambies código en este reto. La función nueva está en `useEntregables`: `function marcar` dentro del hook se crea otra vez cada vez que el hook corre. El siguiente laboratorio la fija.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| No hay contadores | `console.count` está fuera de la función o la consola tiene filtro | Tiene que ser la primera línea del cuerpo de `Tarjeta` |
| `memo` no está definido | Falta el import | `import { memo, useContext } from "react"` |
