# M03-05 — Las reglas

[← Página anterior](M03-04-useeffect.md) · [Siguiente página →](../M04-hooks/README.md)

> Un paso. Un hook debajo de un return condicional rompe la pantalla. Lo ves y lo quitas.

### Objetivo

Provocar el aviso de los hooks y dejar todos los hooks al principio de `App`, sin condiciones.

### Prerrequisitos

- [M03-04](M03-04-useeffect.md): `useState` y `useEffect` están antes del `return`.

### 1 — Poner un hook demasiado tarde

**Qué agregamos:** justo antes del `return`, esta condición y un estado nuevo.

```tsx
if (texto.length > 2) {
  return <p>Demasiado texto</p>
}

const [extra, setExtra] = useState(0)
```

Usa `extra` en ese return para que no quede sin usar: `<p>Demasiado texto {extra}</p>`. `setExtra` puedes no llamarlo; si el editor marca el setter, prefija el nombre con guion bajo o borra el estado al deshacer el paso.

**Con esto conseguimos:** nada útil. Al teclear la tercera letra, React deja de llamar a `useState` en un pintado en el que antes sí lo llamaba.

**Validar:** escribe `Est` en «Buscar». La pantalla falla. En la consola del navegador se lee que se renderizaron menos hooks que en el pintado anterior, o el editor ya marcó el hook después del `return`.

### 2 — Devolver el hook arriba y quitar el atajo

**Qué agregamos:** borra el `if` y borra `extra`. Los hooks que ya tenías (`texto`, `items`, el efecto) siguen al inicio de la función, antes de cualquier `return`.

**Con esto conseguimos:** el número de hooks es el mismo en cada pintado. El filtro vuelve a funcionar.

**Validar:** escribe `Este`. Queda el inventario, sin mensaje de error en la consola. Recarga.

→ La pestaña vuelve a «Pendientes: 3» si no habías marcado en esta carga, o al número que corresponda si el estado se reinició al recargar.

## Comprueba tu entendimiento

**El orden es el de las llamadas**
Los `useState` y el `useEffect` están por encima del `return` de la lista.
→ No hay `useState` dentro de un `if`, ni dentro del `map`, ni dentro de `Tarjeta` creado a medias.

## Reto

### 1 — El hook en el map

Dentro del `map`, llama `useState(item.id)` antes del `<li>`.

<details>
<summary>Ver solución</summary>

El editor o la consola rechazan el hook: no puede estar en un callback. Borra esa línea. El único estado de la lista sigue en `App`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| La página queda rota al seguir | El `if (texto.length > 2)` sigue en el archivo | Bórralo en el paso 2 |
| `setExtra` marcado como no usado | El estado de prueba sigue declarado | Borra `extra` al quitar el experimento |
