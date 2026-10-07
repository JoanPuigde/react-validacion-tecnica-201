# J03-07 — Loading, error y vacío

[← Página anterior](J03-06-fetch.md) · [Siguiente página →](J03-08-estructura.md)

> Laboratorio de [Loading, error y vacío](README.md).

### Objetivo

Pintar una frase de espera, un aviso de error y el vacío del filtro, cada uno por su lado.

### Código de partida

Hace falta el `fetch` de [J03-06](J03-06-fetch.md): `bandeja/src/api/entregables.ts` existe y `App` lo llama en un efecto con `[]`. Si no es así, termina ese laboratorio, que trae el archivo entero. La página, al recargar, muestra las seis fichas.

### En qué consiste

Dos estados y dos salidas. El experimento cambia la URL, la restaura y comprueba que `zzzz` no es un error.

### 1 — Las tres frases

**Dónde:** `App.tsx`. Los `useState` y los `useEffect` van antes de cualquier `return`.

**Qué haces:**

1. Añade `cargando` en `true` y `error` en `""`.
2. En el efecto de la petición, enciende la carga al empezar, guarda el mensaje en el `catch` y apaga la carga en un `finally`.
3. Antes del `return` de la lista, pinta las dos ramas.
4. Guarda y recarga.

```tsx
const [cargando, setCargando] = useState(true)
const [error, setError] = useState("")
```

```tsx
useEffect(() => {
  let vivo = true
  setCargando(true)
  setError("")
  cargarEntregables()
    .then((lista) => {
      if (vivo) setItems(lista)
    })
    .catch((causa: unknown) => {
      console.error(causa)
      if (vivo) setError("No se pudo cargar la bandeja.")
    })
    .finally(() => {
      if (vivo) setCargando(false)
    })
  return () => {
    vivo = false
  }
}, [])
```

```tsx
if (cargando) {
  return (
    <main>
      <h1>Bandeja de entregables</h1>
      <p>Cargando entregables…</p>
    </main>
  )
}

if (error) {
  return (
    <main>
      <h1>Bandeja de entregables</h1>
      <p role="alert">{error}</p>
    </main>
  )
}
```

**Experimento:**

1. En `cargarEntregables`, la URL pasa a `"/no-esta.json"`. Recarga.
2. Restaura `"/entregables.json"` y recarga.
3. Escribe `zzzz` en «Buscar».

→ Con la URL mala, «No se pudo cargar la bandeja.» y ninguna ficha. Con la URL buena, las seis. Con `zzzz`, «Ningún entregable coincide.» y el aviso de error no está.

**Validación:**

- Problems vacío.
- Los hooks están encima de los dos `return`.
- El párrafo del filtro no tiene `role="alert"`. El del error, sí.

## Comprueba tu entendimiento

**Vacío no es error**
Con la URL buena, deja la caja en `zzzz` e inspecciona el párrafo.
→ El texto es «Ningún entregable coincide.». No hay `role="alert"`.

## Reto

### 1 — Un hook debajo de la carga

Justo debajo de `if (cargando) return …`, declara `useState(0)` y úsalo en el return de la lista. Recarga.

<details>
<summary>Ver solución</summary>

La consola habla de hooks: en la primera pintura `cargando` es `true` y ese `useState` no se llama; cuando pasa a `false`, sí. Borra ese `useState`. Los hooks siguen antes de los `return`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Pantalla en blanco al fallar | No está el `return` de `error` | El aviso va antes del return de la lista |
| `zzzz` muestra el aviso de red | El vacío usa la misma frase que el `catch` | El filtro pinta «Ningún entregable coincide.» |
| `Rendered more hooks` | Hay un hook debajo de `if (cargando)` | Súbelo, o bórralo si era el experimento |
