# J04-02 — Re-renderizados

[← Página anterior](J04-01-impacto.md) · [Siguiente página →](J04-03-estado.md)

`memo` se salta el render si las props son iguales. La comparación se rompe si `marcar` es una función nueva en cada pintado. `useCallback` con `[]` deja esa función quieta.

## Demostración

### Objetivo

Hacer que teclear deje de ejecutar las fichas cuyo `item` no cambió.

### Código de partida

La primera línea de `Tarjeta` es `console.count(item.id)`. `marcar` es una `function` en `App`, no un `useCallback`. Pega los dos archivos.

`bandeja/src/App.tsx`

```tsx
import { useState } from "react"
import { entregables } from "./datos"
import type { Entregable } from "./modelo"
import Tarjeta from "./componentes/Tarjeta"

export default function App() {
  const [texto, setTexto] = useState("")
  const [items, setItems] = useState<Entregable[]>(entregables)

  const visibles = items.filter((item) => {
    const blob = `${item.titulo} ${item.proveedor} ${item.id}`.toLowerCase()
    return blob.includes(texto.toLowerCase())
  })

  function marcar(id: string): void {
    setItems((lista) =>
      lista.map((item) =>
        item.id === id ? { ...item, estado: "revisado" } : item,
      ),
    )
  }

  return (
    <main>
      <h1>Bandeja de entregables</h1>
      <label htmlFor="filtro">Buscar</label>
      <input
        id="filtro"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
      />
      {visibles.length === 0 ? <p>Ningún entregable coincide.</p> : null}
      <ul className="lista">
        {visibles.map((item) => (
          <li key={item.id}>
            <Tarjeta item={item} alMarcar={marcar} />
          </li>
        ))}
      </ul>
    </main>
  )
}
```

`bandeja/src/componentes/Tarjeta.tsx`

```tsx
import type { Entregable } from "../modelo"

interface TarjetaProps {
  item: Entregable
  textoBoton?: string
  alMarcar: (id: string) => void
}

export default function Tarjeta({
  item,
  textoBoton = "Anotar",
  alMarcar,
}: TarjetaProps) {
  console.count(item.id)
  return (
    <article>
      <p>{item.titulo}</p>
      <p>
        {item.id} · {item.proveedor}
      </p>
      <p className={`estado ${item.estado}`}>{item.estado}</p>
      {item.estado === "pendiente" ? <p>Falta revisión</p> : null}
      <button type="button" onClick={() => alMarcar(item.id)}>
        {item.estado === "revisado" ? "Hecho" : textoBoton} {item.id}
      </button>
    </article>
  )
}
```

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
| No sale `resumen` | `Resumen` no está en el `return` de `App`, o la consola filtra los log | `<Resumen texto={texto} />` debajo de la caja, y el nivel `Info` visible |
| Al teclear salen los id | `Tarjeta` volvió a ejecutarse | `export default memo(Tarjeta)`, `alMarcar={marcar}` y `marcar` dentro de `useCallback` |

## Laboratorio

La demostración aplicó `memo` a `Tarjeta` y `useCallback` a `marcar`. Aquí el hijo que no debe saltarse es otro: recibe el texto de la caja.

### Objetivo

`Resumen` se vuelve a ejecutar al teclear porque su prop `texto` cambia. `Tarjeta`, con `memo` y `useCallback`, no.

### Código de partida

Antes de crear nada, comprueba estas tres cosas. Si falta una, la demostración de esta página la deja: no sigas con `Resumen` hasta tenerlas.

- `bandeja/src/componentes/Tarjeta.tsx` termina en `export default memo(Tarjeta)`.
- En `bandeja/src/App.tsx`, `marcar` está dentro de `useCallback` con `[]`.
- En el `map`, la prop es `alMarcar={marcar}`. Una flecha `alMarcar={(id) => marcar(id)}` rompe el salto de la ficha.

En `Tarjeta`, cambia el contador por un log y guarda. Así, si una ficha se ejecuta, su id aparece escrito; si no se ejecuta, no aparece.

```tsx
console.log(item.id)
```

### 1 — El hijo que sí debe ejecutarse

Crea el archivo `bandeja/src/componentes/Resumen.tsx` con este contenido. Todavía no lleva `memo`.

```tsx
function Resumen({ texto }: { texto: string }) {
  console.log("resumen")
  return <p>Texto: {texto}</p>
}

export default Resumen
```

En `App.tsx`, importa el componente junto a `Tarjeta`.

```tsx
import Resumen from "./componentes/Resumen"
```

En el `return`, justo debajo del `input` de «Buscar», antes de la lista:

```tsx
<Resumen texto={texto} />
```

Guarda los dos archivos. F12, Consola, y límpiala con el icono de prohibido. Haz clic en «Buscar» y escribe `a`.

En la página, debajo de la caja, se lee `Texto: a`. En la consola se lee `resumen`. No se leen `E-101`, `E-102` ni el resto de ids: esas fichas no se han ejecutado. StrictMode puede escribir `resumen` dos veces por la misma letra. Sigue siendo el párrafo, no las fichas.

### 2 — memo no calla a Resumen

Sustituye `Resumen.tsx` por este archivo y guarda.

```tsx
import { memo } from "react"

function Resumen({ texto }: { texto: string }) {
  console.log("resumen")
  return <p>Texto: {texto}</p>
}

export default memo(Resumen)
```

Limpia la consola. Escribe otra letra, `b`, sin borrar la caja. La página pasa a `Texto: ab`. La consola vuelve a escribir `resumen`. Los id de las fichas siguen sin salir.

`memo` ha comparado las props. `texto` pasó de `"a"` a `"ab"`, así que `Resumen` se ejecuta. El `item` de cada ficha es el mismo objeto y `marcar` es la misma función, así que `Tarjeta` no.

Al terminar puedes borrar el import, la etiqueta `<Resumen />` y el archivo. Si los dejas, la página siguiente que diga «pega `App.tsx`» quitará la etiqueta al sustituir ese archivo.

**Validación:**

- Con la caja en `ab`, la consola muestra `resumen` y no muestra ids.
- `Tarjeta` sigue exportada con `memo`.
- `alMarcar={marcar}`.

→ «resumen» sale al teclear. Los id de las fichas no. `memo(Resumen)` no calla el log: la prop `texto` cambió.
