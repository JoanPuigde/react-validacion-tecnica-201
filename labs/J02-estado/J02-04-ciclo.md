# J02-04 — Ciclo de vida

[← Página anterior](J02-03-useeffect.md) · [Siguiente página →](J02-05-flujo.md)

> Laboratorio de [Ciclo de vida](README.md).

### Objetivo

Ver la limpieza del efecto y el fallo de un hook que no se llama siempre.

### Código de partida

La pestaña dice «Pendientes: 3». Si no, termina el paso 1 de [J02-03](J02-03-useeffect.md). Los hooks están antes del `return`.

### 1 — Limpieza y un hook de más

**Dónde:** el efecto del título, y luego justo antes del `return`.

**Qué haces:**

1. Haz que el efecto devuelva una limpieza.
2. Marca un pendiente con la consola abierta.
3. Quita la limpieza si quieres dejar solo el título, o déjala.
4. Añade el `if` de abajo, escribe `E`, `Es`, `Est`, y luego bórralo.

```tsx
useEffect(() => {
  document.title = `Pendientes: ${pendientes}`
  return () => {
    document.title = "Bandeja de entregables"
    console.log("limpieza")
  }
}, [pendientes])
```

```tsx
if (texto.length > 2) {
  return <p>Demasiado texto {extra}</p>
}

const [extra, setExtra] = useState(0)
```

`setExtra` puede quedar sin usar. Es parte del experimento.

**Experimento:** con una y dos letras la bandeja sigue. Con la tercera, la consola habla de hooks o Problems marca el hook después del `return`.

→ Al marcar, sale `limpieza` y enseguida «Pendientes: N». Tras borrar el `if` y `extra`, el filtro responde y la pestaña vuelve a «Pendientes: 3» al recargar.

**Validación:**

- No queda `extra`.
- No hay un `useState` dentro del `map`.
- Los hooks están antes del `return`.

## Comprueba tu entendimiento

**Dónde están**
Recorre `App` y cuenta las llamadas que empiezan por `use`.
→ Todas están antes del `return`. Ninguna está dentro de un `if`.

## Reto

### 1 — El aviso sin romper la página

Declara `useState` dentro de `if (false)`. Lee Problems. Borra la línea.

<details>
<summary>Ver solución</summary>

El editor marca la regla aunque `false` nunca entre. Los hooks no van en una rama.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La página sigue rota | El `if (texto.length > 2)` sigue | Bórralo y recarga |
| El filtro no vuelve | Borraste `texto` | `useState("")` sigue al principio |
