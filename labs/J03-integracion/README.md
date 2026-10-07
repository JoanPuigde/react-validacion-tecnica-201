# Jornada 3 — Integración, arquitectura y buenas prácticas

[← Página anterior](../../README.md) · [Siguiente página →](demostracion.md)

Al empezar, la lista y el nombre de quien revisa salen de un `useStore`. Después la bandeja deja de llevar la lista dentro del paquete: la pide, distingue tres finales y reparte el código.

La demostración se sigue en [demostracion.md](demostracion.md): ahí está el archivo que se abre, el código que se pega y lo que tiene que verse. Esta página se queda en la idea.

## useContext

El contexto entrega un valor a los componentes de dentro sin pasarlo por cada prop. Quien provee decide el valor. Quien llama a `useContext` lo lee. Si no hay proveedor, el valor por defecto es `null` y el hook propio avisa.

### Demostración

Síguela en [useContext](demostracion.md#usecontext).

→ Laboratorio: [J03-01 — useContext](J03-01-contexto.md).

## HOC

Un HOC es una función. Recibe un componente y devuelve otro. El de fuera puede leer el contexto y pasar el dato como prop. Quien pinta `<Tarjeta>` no escribe `revisor`. `memo`, justo después, es un HOC que ya trae React.

### Demostración

Síguela en [HOC](demostracion.md#hoc).

→ Laboratorio: [J03-02 — HOC](J03-02-hoc.md).

## Memo

`memo` se salta el render de `Tarjeta` si sus props son la misma referencia. Hace falta que `marcar` sea un `useCallback`: si la función es nueva, `memo` no se salta nada. El valor del contexto, si es un objeto nuevo cada vez que el proveedor se pinta, despierta a quien lo lee aunque el nombre no haya cambiado. `useMemo` con `[revisor]` deja esa referencia quieta.

### Demostración

Síguela en [Memo](demostracion.md#memo).

→ Laboratorio: [J03-03 — Memo](J03-03-memo.md).

## useReducer

El estado de la lista deja de ser `useState` más una función `marcar`. Pasa a ser un reductor: el estado de ahora y una acción, y devuelve el estado siguiente. La acción de este momento es `{ type: "marcar", id }`.

### Demostración

Síguela en [useReducer](demostracion.md#reducer).

→ Laboratorio: [J03-04 — useReducer](J03-04-reducer.md).

## useStore

`useStore` es el hook que leen los componentes. Por dentro junta el reductor de la lista y el contexto de la sesión. `App` y `Tarjeta` no importan `useReducer` ni `useContext`: llaman a `useStore()`. Fuera de `TiendaProveedor` el hook lanza.

### Demostración

Síguela en [useStore](demostracion.md#store).

→ Laboratorio: [J03-05 — useStore](J03-05-store.md).

## Consumo de API

`fetch` devuelve una promesa. Hasta comprobarlo, el JSON es `unknown`. Un guarda mira campo a campo y solo entonces el valor es `Entregable[]`. `respuesta.ok` importa: un 404 no lanza solo.

La petición no va en el cuerpo del componente, el que corre en cada pintado. Va en un efecto con `[]`, o en una función de `api/` que ese efecto llama.

### Demostración

Síguela en [Consumo de API](demostracion.md#api).

→ Laboratorio: [J03-06 — Consumo de API](J03-06-fetch.md).

## Loading, error y vacío

Son tres finales distintos.

| Situación | Qué se ve |
|-----------|-----------|
| Cargando | «Cargando entregables…», sin fichas |
| La petición falla | «No se pudo cargar la bandeja.» con `role="alert"` |
| Filtro sin coincidencias | «Ningún entregable coincide.» |
| Respuesta con datos | Las fichas |

### Demostración

Síguela en [Loading, error y vacío](demostracion.md#finales).

→ Laboratorio: [J03-07 — Loading, error y vacío](J03-07-finales.md).

## Estructura del proyecto

Cada tipo de archivo tiene un sitio. La bandeja, al cerrar esta jornada, queda así:

```text
bandeja/src/
  api/entregables.ts      la petición y el guarda
  hooks/useEntregables.ts lista, carga, error, marcar, título de la pestaña
  componentes/Tarjeta.tsx cómo se ve una ficha
  datos.ts                el array de reserva; App ya no lo importa
  modelo.ts               el contrato Entregable
  App.tsx                 filtro y composición
```

### Demostración

Síguela en [Estructura del proyecto](demostracion.md#estructura).

→ Laboratorio: [J03-08 — Estructura del proyecto](J03-08-estructura.md).

## Separación de responsabilidades

`App` decide qué fichas se ven. El hook decide cuál es la lista y cuándo llega. `Tarjeta` decide cómo se pinta una ficha y avisa con `alMarcar`. Ninguno de los tres hace el trabajo de otro.

### Demostración

Síguela en [Separación de responsabilidades](demostracion.md#responsabilidades).

→ Laboratorio: [J03-09 — Separación de responsabilidades](J03-09-responsabilidades.md).

## Componente reutilizable

`Tarjeta` es una función. Seis fichas salen de un `map`, no de seis copias del archivo. `textoBoton` cambia el rótulo sin tocar el componente. `item` es obligatorio: sin esa prop no compila.

### Demostración

Síguela en [Componente reutilizable](demostracion.md#reutilizable).

→ Laboratorio: [J03-10 — Componente reutilizable](J03-10-reutilizable.md).

## Antipatrones

| Qué se ve | Por qué falla |
|-----------|----------------|
| `fetch` en el cuerpo de `App` o de `Tarjeta` | Una petición por pintado |
| `any` en el JSON | El guarda deja de comprobar |
| `item.estado = "revisado"` y el mismo array | A veces no hay repintado |
| `visibles` guardado en otro `useState` | La caja y las fichas se separan |
| Un hook debajo de `if (cargando) return` | La pantalla rompe al cambiar de rama |

### Demostración

Síguela en [Antipatrones](demostracion.md#antipatrones).

→ Laboratorio: [J03-11 — Antipatrones](J03-11-antipatrones.md).
