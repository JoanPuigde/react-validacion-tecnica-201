import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  avisoRecibidoSchema,
  avisoSchema,
  listaAvisosSchema,
  type AvisoNuevo,
} from './aviso.ts'
import { cliente } from './cliente.ts'

async function leerAvisos() {
  const respuesta = await cliente.get<unknown>('/api/avisos')
  return listaAvisosSchema.parse(respuesta.data)
}

export function useAvisos() {
  return useQuery({
    queryKey: ['avisos'],
    queryFn: leerAvisos,
  })
}

export function useCrearAviso() {
  const cache = useQueryClient()
  return useMutation({
    mutationFn: async (aviso: AvisoNuevo) => {
      const respuesta = await cliente.post<unknown>(
        '/api/avisos',
        avisoSchema.parse(aviso),
      )
      return avisoRecibidoSchema.parse(respuesta.data)
    },
    onSuccess: () => {
      void cache.invalidateQueries({ queryKey: ['avisos'] })
    },
  })
}
