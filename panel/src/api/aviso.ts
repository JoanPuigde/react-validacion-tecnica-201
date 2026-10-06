import { z } from 'zod'

export const avisoSchema = z.object({
  titulo: z.string().trim().min(3),
  texto: z.string().trim().min(1),
})

export const avisoRecibidoSchema = avisoSchema.extend({
  id: z.string().min(1),
})

export const listaAvisosSchema = z.array(avisoRecibidoSchema)

export type AvisoNuevo = z.infer<typeof avisoSchema>
export type Aviso = z.infer<typeof avisoRecibidoSchema>
