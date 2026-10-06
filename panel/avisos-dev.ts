import fs from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'

interface AvisoGuardado {
  id: string
  titulo: string
  texto: string
}

function responder(res: ServerResponse, status: number, cuerpo: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(cuerpo))
}

function leerCuerpo(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const trozos: Buffer[] = []
    req.on('data', (trozo: Buffer) => {
      trozos.push(trozo)
    })
    req.on('end', () => {
      resolve(Buffer.concat(trozos).toString('utf8'))
    })
    req.on('error', reject)
  })
}

function esAvisoNuevo(
  valor: unknown,
): valor is Pick<AvisoGuardado, 'titulo' | 'texto'> {
  if (typeof valor !== 'object' || valor === null) return false
  const candidato = valor as Record<string, unknown>
  return (
    typeof candidato.titulo === 'string' &&
    candidato.titulo.trim().length >= 3 &&
    typeof candidato.texto === 'string' &&
    candidato.texto.trim().length >= 1
  )
}

export function avisosDev(): Plugin {
  const fichero = new URL('./public/avisos.json', import.meta.url)
  const inicial = JSON.parse(
    fs.readFileSync(fichero, 'utf8'),
  ) as AvisoGuardado[]
  const avisos = [...inicial]

  return {
    name: 'avisos-dev',
    configureServer(server) {
      server.middlewares.use('/api/avisos', (req, res, next) => {
        const ruta = req.url?.split('?')[0] ?? ''
        if (ruta !== '/' && ruta !== '') {
          next()
          return
        }
        if (req.method === 'GET') {
          responder(res, 200, avisos)
          return
        }
        if (req.method === 'POST') {
          void leerCuerpo(req)
            .then((cuerpo) => {
              const datos: unknown = JSON.parse(cuerpo)
              if (!esAvisoNuevo(datos)) {
                responder(res, 400, { error: 'aviso inválido' })
                return
              }
              const creado: AvisoGuardado = {
                id: crypto.randomUUID(),
                ...datos,
              }
              avisos.unshift(creado)
              responder(res, 201, creado)
            })
            .catch(() => {
              responder(res, 400, { error: 'JSON inválido' })
            })
          return
        }
        res.statusCode = 405
        res.end()
      })
    },
  }
}
