# M01-01 — Entorno

[← Página anterior](README.md) · [Siguiente página →](M01-02-jsx-y-eventos.md)

> Práctica del módulo. La teoría y la demo están en el [README del módulo](README.md).

### Objetivo

Dejar la bandeja abierta en el navegador desde el Codespace.

### Prerrequisitos

- El repositorio abierto como Codespace (Code → Create codespace on main).
- El post-create del contenedor ha terminado: en la terminal de creación no queda el script a medias.

### En qué consiste

Compruebas Node, entras en `bandeja/` y arrancas Vite. El puerto 5173 es el de la aplicación.

### 1 — Comprobar Node

**Acción:** abre la terminal del Codespace y ejecuta:

```bash
node -v
npm -v
```

**Por qué:** las herramientas del curso corren sobre Node 22. Si el contenedor no llegó a prepararse, estos comandos fallan y no tiene sentido seguir.

**Resultado esperado:** una versión de Node que empieza por `v22` y una versión de npm.

### 2 — Arrancar la bandeja

**Acción:** en la misma terminal:

```bash
cd bandeja
npm run dev
```

Si `node_modules` no existe, antes ejecuta `npm ci`.

**Por qué:** `npm run dev` lee el script de `package.json` y levanta Vite en el puerto 5173, accesible desde fuera del contenedor (`--host 0.0.0.0`).

**Resultado esperado:** Vite imprime una línea `Local` con `http://localhost:5173/`. El editor avisa de que el puerto 5173 está reenviado. Ábrelo en el navegador.

> [!TIP]
> Si el aviso del puerto no aparece, en el panel Ports pulsa el globo de la fila 5173.

### 3 — Reconocer la pantalla

**Acción:** en la página, localiza el título y cuenta las fichas.

**Por qué:** esta es la aplicación de toda la semana. Lo que añadas después parte de esta lista.

**Resultado esperado:** se lee «Bandeja de entregables» y hay seis fichas, de E-101 a E-106. La de E-104 dice «rechazado».

## Comprueba tu entendimiento

**El puerto es el de Vite**
En la terminal donde corre `npm run dev`, lee la URL que imprimió Vite.
→ El puerto es 5173. Si otro proceso lo ocupa, Vite se detiene: `strictPort` no elige otro puerto en silencio.

## Reto

### 1 — Parar y volver a levantar

Para el proceso con <kbd>Ctrl</kbd> + <kbd>C</kbd>. Vuelve a ejecutar `npm run dev`. Abre de nuevo la página.

<details>
<summary>Ver solución</summary>

La bandeja vuelve a mostrarse igual. Vite no guarda los datos en un servidor: la lista sale de `src/datos.js` cada vez que el navegador carga el módulo.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `vite: not found` o falta `node_modules` | El `npm ci` del contenedor no terminó | Dentro de `bandeja/`, `npm ci` y otra vez `npm run dev` |
| La página no carga y el puerto no sale | El comando se lanzó fuera de `bandeja/` | `cd bandeja` y repite `npm run dev` |
| `Port 5173 is already in use` | Ya hay un Vite en marcha | Usa esa terminal, o párala con <kbd>Ctrl</kbd> + <kbd>C</kbd> |
