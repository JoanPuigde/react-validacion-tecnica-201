# M01-01 — Entorno

[← Página anterior](README.md) · [Siguiente página →](M01-02-interfaz.md)

> Un paso. Comprobar que el proyecto TypeScript arranca.

### Objetivo

Ver la bandeja en el navegador desde `bandeja/`.

### Prerrequisitos

- Repositorio abierto en Codespace, con el post-create terminado.

### 1 — Arrancar Vite

**Qué agregamos:** nada en el código. En la terminal:

```bash
cd bandeja
npm run dev
```

**Con esto conseguimos:** Vite compila `src/main.tsx` y sirve el puerto 5173.

**Validar:** la página muestra el título «Bandeja de entregables» y la frase de debajo. La terminal no imprime un error de TypeScript.

> [!TIP]
> Si falta `node_modules`, ejecuta `npm ci` dentro de `bandeja/` y vuelve a `npm run dev`.

## Comprueba tu entendimiento

**El fichero de entrada es TSX**
Abre `bandeja/index.html` y localiza el script del módulo.
→ Apunta a `/src/main.tsx`.

## Reto

### 1 — El build también mira los tipos

En otra terminal, dentro de `bandeja/`, lanza `npm run build`.

<details>
<summary>Ver solución</summary>

El comando pasa `tsc` y después empaqueta. Termina sin error. Si `tsc` se queja, el fallo está en `src/` y hay que leer la línea que indica, no seguir al laboratorio siguiente.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `Port 5173 is already in use` | Ya hay un Vite | Usa esa terminal o párala con <kbd>Ctrl</kbd> + <kbd>C</kbd> |
| Página en blanco | El script del HTML no es `main.tsx` | Déjalo en `/src/main.tsx` |
