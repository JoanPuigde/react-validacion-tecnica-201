# M01-02 — JSX y eventos

[← Página anterior](M01-01-entorno.md) · [Siguiente página →](M01-03-componentes.md)

> Práctica del módulo. La teoría y la demo están en el [README del módulo](README.md).

### Objetivo

Añadir un botón por ficha que escribe el identificador en la consola del navegador.

### Prerrequisitos

- [M01-01](M01-01-entorno.md): `npm run dev` en marcha y la bandeja visible.
- El archivo abierto es `bandeja/src/App.jsx`.

### En qué consiste

Editas el JSX de cada ficha y guardas. Vite recarga la página solo.

### 1 — Abrir la consola

**Acción:** en el navegador, abre las herramientas de desarrollo y entra en la pestaña Console. Déjala visible.

**Por qué:** el botón no cambia la pantalla. La prueba está en la consola, no en la ficha.

**Resultado esperado:** la consola está vacía o solo muestra avisos que no vienen de la bandeja.

### 2 — Añadir el botón

**Acción:** en `App.jsx`, dentro del `<li>`, después del párrafo del estado, añade este botón. Guarda con <kbd>Ctrl</kbd> + <kbd>S</kbd>.

```jsx
<button type="button" onClick={() => console.log(item.id)}>
  Anotar {item.id}
</button>
```

**Por qué:** `onClick` recibe una función. La flecha se crea al pintar y solo corre cuando pulsas. `item.id` es el identificador de esa vuelta del `map`.

**Resultado esperado:** cada ficha muestra un botón «Anotar E-10x». Al pulsar el de «Informe de accesibilidad», la consola escribe `E-101`.

> [!WARNING]
> `onClick={console.log(item.id)}` escribe los seis id al cargar y el clic no hace nada útil: la función ya se ejecutó al pintar.

### 3 — Confirmar que no recarga la página

**Acción:** pulsa otro botón «Anotar» y mira la barra de dirección y la consola.

**Por qué:** un `<button>` sin `type="button"` dentro de un formulario enviaría la página. Aquí no hay formulario, y el `type` deja la intención explícita.

**Resultado esperado:** la dirección sigue en la raíz de la bandeja. La consola suma otra línea con el id de esa ficha. La lista no desaparece.

## Comprueba tu entendimiento

**Una ficha, un id**
Pulsa «Anotar E-104».
→ La consola muestra `E-104` y la ficha sigue diciendo «rechazado».

## Reto

### 1 — Incluir el proveedor en el mensaje

Haz que la consola escriba identificador y proveedor en la misma línea, por ejemplo `E-101 Norte`.

<details>
<summary>Ver solución</summary>

```jsx
<button type="button" onClick={() => console.log(item.id, item.proveedor)}>
  Anotar {item.id}
</button>
```

`console.log` acepta varios argumentos. Al pulsar la primera ficha, la consola muestra `E-101 Norte`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Pantalla en blanco y un error de sintaxis | JSX sin cerrar o llave de más | Lee la línea que indica Vite en el navegador y en la terminal |
| El botón no aparece tras guardar | El archivo guardado no es `src/App.jsx` | Comprueba la ruta en la pestaña del editor |
| La consola muestra el id al cargar, seis veces | Paréntesis en el `onClick` | Deja una función: `() => console.log(item.id)` |
