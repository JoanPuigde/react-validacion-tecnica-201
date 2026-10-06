# M05-02 — Tres finales

[← Página anterior](M05-01-fetch.md) · [Siguiente página →](M05-03-memo.md)

> Práctica de [La petición](../M03-apis-y-arquitectura/01-peticion.md).

### Objetivo

Pintar un texto de espera, un aviso de error y el vacío del filtro, cada uno por su lado.

### Prerrequisitos

- [M05-01](M05-01-fetch.md): el hook pide el JSON, parte de `[]` y el `catch` solo escribe en la consola.

### En qué consiste

Dos estados junto a la lista y tres ramas en `App`. El experimento cambia la URL, la restaura y comprueba que `zzzz` no es un error.

### 1 — Cargando y error

**Dónde:** `useEntregables.ts` para los estados y el efecto. `App.tsx` para las tres ramas.

**Qué haces:**

1. Declara `cargando` en `true` y `error` en `""`.
2. En el efecto de la petición, enciéndelos al empezar, guarda el mensaje en el `catch` y apaga la carga en un `finally`.
3. Devuelve `cargando` y `error` junto a `items` y `marcar`.
4. En `App`, pinta las tres ramas. El párrafo del filtro se queda dentro de `Marco`.
5. Guarda.

```tsx
const [cargando, setCargando] = useState(true)
const [error, setError] = useState("")
```

Dentro del efecto, antes del `fetch` y en el cierre:

```tsx
setCargando(true)
setError("")
```

```tsx
.catch((causa: unknown) => {
  console.error(causa)
  if (vivo) setError("No se pudo cargar la bandeja.")
})
.finally(() => {
  if (vivo) setCargando(false)
})
```

```tsx
{cargando ? <p>Cargando entregables…</p> : null}
{error ? <p role="alert">{error}</p> : null}
{!cargando && !error ? (
  <Marco titulo="Lista">{/* vacío y ul, como ya los tienes */}</Marco>
) : null}
```

**Experimento:** escribe `zzzz` con la URL buena.

→ Se lee «Ningún entregable coincide.». No aparece el aviso con `role="alert"`. La pestaña puede haber pasado por «Pendientes: 0» mientras el array inicial estaba vacío y acabar en 3 cuando llegan los datos.

**Validación:**

- Tras recargar, hay seis fichas y no se ve el aviso de error.
- El párrafo del filtro está dentro de `Marco`, no en la rama del `error`.
- Problems vacío. `App` desestructura `cargando` y `error` y los usa.

### 2 — Forzar el fallo

**Dónde:** la URL dentro de `cargarEntregables`, un momento.

**Qué haces:**

1. Cambia `"/entregables.json"` por `"/no-esta.json"`.
2. Recarga.
3. Lee la página.
4. Devuelve `"/entregables.json"` y recarga.

**Experimento:** con la URL mala, mira si hay fichas y si está la frase del filtro.

→ Se lee «No se pudo cargar la bandeja.». No hay fichas ni «Ningún entregable coincide.». Un 404 no lanza solo: el `throw` sale de `if (!respuesta.ok)`. Sin ese `if`, el `json()` de un 404 puede caer en el otro error, el del guarda, pero la frase de la página tiene que ser la del `catch`.

Al restaurar la URL, vuelven las seis fichas y el aviso desaparece.

**Validación:**

- URL buena: seis fichas, sin `role="alert"`.
- `zzzz`: solo la frase del filtro.
- URL mala, antes de restaurar: solo el aviso de carga. Ya restaurada, no dejes `"/no-esta.json"` en el archivo.

## Comprueba tu entendimiento

**Tres frases, tres causas**
«Cargando entregables…» es `cargando`. «No se pudo cargar la bandeja.» es `error`. «Ningún entregable coincide.» es `visibles.length === 0` con la petición ya resuelta.
→ Si las tres pueden verse a la vez, las ramas de `App` no se excluyen. La lista va en `{!cargando && !error ? ... : null}`.

## Reto

### 1 — Ver la espera

La respuesta real es rápida. Antes del `dispatch`, espera 700 ms. Recarga. Quita la espera al acabar.

<details>
<summary>Ver solución</summary>

```tsx
await new Promise((resolver) => setTimeout(resolver, 700))
```

La espera puede vivir en `cargarEntregables` o en el efecto, antes del `dispatch`. Al recargar se lee «Cargando entregables…» y después las fichas. Sin quitar el `setTimeout`, el laboratorio siguiente arranca lento: bórralo.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Se queda en «Cargando» | `setCargando(false)` no está en el `finally` | El `finally` apaga la carga también si hubo error |
| Error y fichas a la vez | La lista no mira `error` | La `ul` va en `{!cargando && !error ? ... : null}` |
| `zzzz` muestra el aviso rojo | El vacío del filtro está en la rama de `error` | Esa frase vive dentro de `Marco` |
