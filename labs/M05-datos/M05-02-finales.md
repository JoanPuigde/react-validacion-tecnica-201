# M05-02 — Tres finales

[← Página anterior](M05-01-fetch.md) · [Siguiente página →](M05-03-memo.md)

> Un paso. Cargar, fallar y no encontrar no comparten la misma frase.

### Objetivo

Pintar un texto de espera, un aviso de error y el vacío del filtro, cada uno por su lado.

### Prerrequisitos

- [M05-01](M05-01-fetch.md): el hook pide el JSON y parte de `[]`.

### 1 — Dos estados al lado de la lista

**Qué agregamos:** en el hook.

```tsx
const [cargando, setCargando] = useState(true)
const [error, setError] = useState("")
```

En el efecto de la petición, `setCargando(true)` al empezar, `setError("")` también, `setError("No se pudo cargar la bandeja.")` en el `catch`, y `setCargando(false)` en un `finally` si `vivo` sigue en true. Devuelve esos dos campos junto a `items` y `marcar`.

En `App`, no pintes la lista mientras `cargando` o `error`:

```tsx
{cargando ? <p>Cargando entregables…</p> : null}
{error ? <p role="alert">{error}</p> : null}
{!cargando && !error ? (
  <Marco titulo="Lista">{/* vacío y ul, como ya los tienes */}</Marco>
) : null}
```

El párrafo «Ningún entregable coincide.» se queda dentro de `Marco`, no en la rama de error.

**Con esto conseguimos:** tres salidas. El `role="alert"` es el fallo. El otro párrafo es el filtro.

**Validar:** recarga. Si la respuesta es muy rápida puede que no leas la espera; en el reto la alargas. Escribe `zzzz`.

→ «Ningún entregable coincide.» No aparece el aviso de `role="alert"`.

### 2 — Forzar el error

**Qué agregamos:** en `cargarEntregables`, cambia un momento la URL a `"/no-esta.json"`. Recarga. Devuelve `"/entregables.json"`.

**Con esto conseguimos:** ver el `catch`. Un 404 no lanza solo: por eso el `if (!respuesta.ok) throw`.

**Validar:** con la URL mala se lee «No se pudo cargar la bandeja.» y no hay fichas ni la frase del filtro. Con la URL buena, al recargar, vuelven las seis.

## Comprueba tu entendimiento

**El filtro no es un error**
URL buena, caja en `zzzz`.
→ Una sola frase, la de ninguna coincidencia. El título de la pestaña puede decir «Pendientes: 0» mientras carga y pasar a 3 al llegar los datos: el efecto depende de `pendientes`, que con `[]` es 0.

## Reto

### 1 — Ver la espera

Antes del `dispatch`, espera 700 ms.

<details>
<summary>Ver solución</summary>

```tsx
await new Promise((resolver) => setTimeout(resolver, 700))
```

Hace falta que `cargarEntregables` sea la que espera, o un `await` en el efecto antes del `dispatch`. Al recargar se lee «Cargando entregables…» y después las fichas. Quita la espera al terminar.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Se queda en «Cargando» | `setCargando(false)` no está en el `finally` | El `finally` apaga la carga también si hubo error |
| Error y fichas a la vez | La lista no mira `error` | La `ul` va en `{!cargando && !error ? ... : null}` |
