import { useTranslation } from 'react-i18next'
import { Avisos } from '../features/avisos/index.tsx'
import { useAuth } from '../providers/AuthProvider.tsx'

export function AvisosPage() {
  const { t } = useTranslation()
  const sesion = useAuth()

  return (
    <main className="mx-auto max-w-xl p-6">
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">{t('avisos.titulo')}</h1>
        <button
          type="button"
          className="text-sm underline"
          onClick={sesion.salir}
        >
          {t('sesion.salir')}
          {sesion.nombre ? ` (${sesion.nombre})` : ''}
        </button>
      </div>
      <Avisos />
    </main>
  )
}
