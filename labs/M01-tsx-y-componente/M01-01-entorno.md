# M01-01 — Entorno

[← Página anterior](README.md) · [Siguiente página →](M01-02-interfaz.md)

> Práctica de [Entorno, Vite y build](../M01-fundamentos/01-entorno.md).

### Objetivo

Dejar Vite sirviendo la bandeja y comprobar que `build` también pasa los tipos.

### Prerrequisitos

- El repositorio abierto en Codespace y el script de creación del contenedor ya terminado.

### En qué consiste

Dos comandos, en este orden: ver la página y empaquetar. Entre medias se para el servidor a propósito para reconocer el síntoma de un puerto ocupado.

### 1 — Ver Node y entrar en la carpeta

**Dónde:** la terminal del Codespace. No el navegador.

**Qué haces:**

1. Abre una terminal.
2. Ejecuta `node -v` y `npm -v`.
3. Ejecuta `cd bandeja` y `pwd`.

**Experimento:** lanza `npm run dev` sin haber entrado en `bandeja/`, desde la raíz del repositorio.

→ El comando falla: ahí no está el `package.json` de la app. Vuelve con `cd bandeja`.

**Validación:**

- `node -v` empieza por `v22`.
- `pwd` termina en `/bandeja`.
- No sigas si el directorio es la raíz del curso.

### 2 — Arrancar Vite

**Dónde:** la misma terminal, dentro de `bandeja/`.

**Qué haces:**

1. Si no existe `node_modules`, ejecuta `npm ci` y espera a que termine.
2. Ejecuta `npm run dev`.
3. Lee la línea `Local` que imprime Vite.
4. Abre el puerto 5173 en el navegador (el aviso del editor o el globo de la fila en Ports).

**Experimento:** en otra terminal, también dentro de `bandeja/`, lanza `npm run dev` otra vez, sin parar el primero.

→ Vite se niega: `Port 5173 is already in use`. No elige otro puerto. Para ese segundo intento con <kbd>Ctrl</kbd> + <kbd>C</kbd> si llegó a arrancar algo, y deja solo el primero.

**Validación:**

- La página muestra el título «Bandeja de entregables» y la frase «Revisión de lo que entrega el proveedor.»
- La URL del navegador usa el puerto 5173.
- La terminal del primer `dev` sigue ocupada. No la cierres: es la que recarga al guardar.

### 3 — El build

**Dónde:** una terminal nueva. El `dev` del paso 2 sigue en marcha.

**Qué haces:**

1. `cd bandeja`
2. `npm run build`
3. Mira la última línea y si apareció la carpeta `dist/`.

**Experimento:** abre `bandeja/src/App.tsx`, cambia el texto del `<h1>` a `Bandeja`, guarda y mira el navegador del `dev`. Luego vuelve a poner `Bandeja de entregables` y guarda otra vez.

→ El `dev` recarga solo y el título cambia. `dist/` no cambia con ese guardado: el paquete solo se rehace con `npm run build`. Lánzalo otra vez después de restaurar el título.

**Validación:**

- `npm run build` termina sin error de TypeScript.
- El título del navegador, con `dev` activo, vuelve a ser «Bandeja de entregables».
- No hace falta abrir `dist/` en el navegador para seguir.

## Comprueba tu entendimiento

**Quién sirve la página**
Mira la terminal donde corre `npm run dev` y la URL del navegador.
→ Las dos hablan del puerto 5173. Si cierras esa terminal, la página deja de cargar.

## Reto

### 1 — Parar y volver

Para el `dev` con <kbd>Ctrl</kbd> + <kbd>C</kbd>. Recarga el navegador. Vuelve a ejecutar `npm run dev` y recarga otra vez.

<details>
<summary>Ver solución</summary>

Con el proceso parado, el navegador no conecta. Al arrancarlo de nuevo, el título vuelve igual: Vite no guarda datos, vuelve a leer `src/App.tsx`.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `vite: not found` | Falta `node_modules` | `npm ci` dentro de `bandeja/` y repite `npm run dev` |
| El build falla y el navegador sigue bien | `dev` no es `build` | Lee el error de `tsc` en la terminal del build. El `dev` puede estar sirviendo un estado anterior |
| Página en blanco | El script de `index.html` no es `/src/main.tsx` | Déjalo así y recarga |
