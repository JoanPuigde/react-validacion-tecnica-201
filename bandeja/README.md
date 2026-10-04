# Bandeja de entregables

Aplicación de la semana. Vite sirve la interfaz en el puerto **5173**.

```bash
cd bandeja
npm ci
npm run dev
```

La misma bandeja con la variante lenta: `http://127.0.0.1:5173/?lenta=1`.

Prueba de humo, con la app parada (el script la arranca):

```bash
npm run test:e2e
```
