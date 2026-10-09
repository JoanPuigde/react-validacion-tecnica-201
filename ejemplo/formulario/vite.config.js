import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { entregables } from './src/datos.js'

// Servidor de mentira para la pestaña «Datos de fuera». Solo existe con `npm run dev`.
// En un proyecto real, esto sería el servidor del proveedor.
function servidorDeMentira() {
  const responder = (req, res) => {
    const modo = new URL(req.url, 'http://localhost').searchParams.get('modo') || 'ok'
    const espera = modo === 'lento' ? 3500 : 800

    setTimeout(() => {
      res.setHeader('Content-Type', 'application/json')

      if (modo === 'error') {
        res.statusCode = 500
        res.end(JSON.stringify({ mensaje: 'Error interno del servidor' }))
        return
      }

      let cuerpo = entregables
      if (modo === 'vacio') cuerpo = []
      if (modo === 'invalidos') {
        // Una ficha con un estado inventado y otra sin título.
        cuerpo = entregables.map((e, i) => {
          if (i === 1) return { ...e, estado: 'a medias' }
          if (i === 3) return { id: e.id, proveedor: e.proveedor, estado: e.estado }
          return e
        })
      }
      res.end(JSON.stringify(cuerpo))
    }, espera)
  }

  return {
    name: 'servidor-de-mentira',
    configureServer(server) {
      server.middlewares.use('/api/entregables', responder)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/entregables', responder)
    },
  }
}

export default defineConfig({
  plugins: [react(), servidorDeMentira()],
})
