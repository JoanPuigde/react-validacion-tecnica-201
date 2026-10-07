# J04-05 — Chrome DevTools

[← Página anterior](J04-04-lazy.md) · [Siguiente página →](J04-06-profiler.md)

> Laboratorio de [Chrome DevTools](README.md).

### Objetivo

Leer Network y una pasada corta de Performance mientras se filtra.

### Código de partida

La bandeja en el puerto 5173, con la caja «Buscar». `npm run dev` en marcha.

### 1 — Network y Performance

**Dónde:** las herramientas del navegador.

**Qué haces:**

1. Abre Network. Recarga. Localiza el documento HTML.
2. Escribe en «Buscar». Mira si el documento se repite.
3. Si existe la petición a `entregables.json`, mira si se repite al teclear.
4. Abre Performance, graba, escribe `Norte`, borra y para la grabación.
5. Mira si hay un tramo de script. No cambies código.

**Experimento:** recarga con la caja vacía y compara el número de peticiones del documento con el de una letra.

→ El documento se pide al recargar, no al teclear. En seis fichas el tramo de Performance es corto. La lectura es esa, no una optimización.

**Validación:**

- Has visto la petición del documento.
- Has visto que teclear no lo repite.
- La bandeja sigue filtrando.

## Comprueba tu entendimiento

**Qué pregunta contesta Network**
No contesta cuántas veces se ejecutó `Tarjeta`.
→ Contesta qué salió por la red. El contador de la consola contesta lo otro.

## Reto

### 1 — El JSON a mano

Abre `http://localhost:5173/entregables.json` desde la barra de direcciones.
→ El archivo está publicado. Que la app lo pida o no depende de si `App` todavía importa `datos.ts`.

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| Cada letra pide el HTML | No estás en el puerto de Vite | `npm run dev`, puerto 5173 |
| Performance vacío | La grabación no estaba en marcha al teclear | Graba, teclea, para |
