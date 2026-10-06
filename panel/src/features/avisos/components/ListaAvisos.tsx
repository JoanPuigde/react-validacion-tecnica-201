import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAvisos } from '../../../api/use-avisos.ts'
import { logger } from '../../../utils/logger.ts'

export function ListaAvisos() {
  const { t } = useTranslation()
  const consulta = useAvisos()

  useEffect(() => {
    if (consulta.isError) logger.error('avisos', consulta.error)
  }, [consulta.isError, consulta.error])

  if (consulta.isPending) return <p>{t('avisos.cargando')}</p>
  if (consulta.isError) return <p>{t('avisos.error')}</p>
  if (consulta.data.length === 0) return <p>{t('avisos.vacio')}</p>

  return (
    <ul className="mb-8 space-y-2">
      {consulta.data.map((aviso) => (
        <li
          key={aviso.id}
          className="rounded border border-stone-200 bg-white p-3"
        >
          <p className="font-medium">{aviso.titulo}</p>
          <p className="text-stone-600">{aviso.texto}</p>
        </li>
      ))}
    </ul>
  )
}
