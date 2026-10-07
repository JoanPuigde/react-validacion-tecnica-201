# J03-10 — Componente reutilizable

[← Página anterior](J03-09-responsabilidades.md) · [Siguiente página →](J03-11-antipatrones.md)

> Laboratorio de [Componente reutilizable](README.md).

### Objetivo

Ver que seis fichas salen de un solo `Tarjeta`, y que una prop opcional cambia el rótulo sin copiar el archivo.

### Código de partida

`bandeja/src/componentes/Tarjeta.tsx` es una función con `item` obligatorio y `textoBoton` opcional, defecto `"Anotar"`. `App` la usa dentro de un `map`. Si tu ficha está escrita seis veces en `App`, borra esas copias y deja el `map` de [J03-06](J03-06-fetch.md).

### En qué consiste

Una prop más en una sola etiqueta. El experimento la quita y quita también `item`.

### 1 — Un archivo, seis fichas

**Dónde:** `App.tsx`, en el `map`. `Tarjeta.tsx` no se copia.

**Qué haces:**

1. En la primera vuelta del `map`, pasa `textoBoton` solo si el id es `E-104`.
2. Guarda.
3. Lee los botones.
4. Quita el atributo.

```tsx
<Tarjeta
  item={item}
  alMarcar={marcar}
  textoBoton={item.id === "E-104" ? "Registrar" : undefined}
/>
```

**Experimento:** quita `item={item}` y guarda. Lee Problems. Vuelve a poner `item={item}` y quita `textoBoton`.

→ Con el atributo, E-104 dice «Registrar E-104» si sigue rechazado. El resto dice «Anotar» o «Hecho». Sin `item`, Problems marca la etiqueta. Sin `textoBoton`, E-104 vuelve a «Anotar». Sigue habiendo un solo archivo `Tarjeta.tsx`.

**Validación:**

- No hay seis funciones `Tarjeta` copiadas.
- `item` no es opcional en la interfaz.
- Problems vacío al terminar.

## Comprueba tu entendimiento

**El defecto no es un any**
Pasa `textoBoton={1}`.
→ Problems pide `string`. Quita ese valor.

## Reto

### 1 — El borde en el componente, no en el li

La clase visual de la ficha ya está en `article` dentro de `Tarjeta`. Quita un momento el `<li>` y pon `key` en `Tarjeta`. Lee la consola. Devuelve el `<li key={item.id}>`.

<details>
<summary>Ver solución</summary>

`key` en el componente no identifica al hijo del `map`. El aviso de la consola, o la posición inestable al filtrar, es la señal. `key={item.id}` vuelve al `<li>`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Todas dicen «Registrar» | `textoBoton` está fijo en `Tarjeta` | El defecto es `"Anotar"` y el atributo solo va en E-104 |
| `item` posiblemente indefinido | La prop quedó con `?` | `item: Entregable`, sin `?` |
