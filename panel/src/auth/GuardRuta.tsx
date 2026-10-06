import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../providers/AuthProvider.tsx'
import { puedeEntrar } from './guard.ts'

export function GuardRuta({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const sesion = useAuth()
  const fase = puedeEntrar(sesion)

  if (fase === 'espera') return <p className="p-6">{t('sesion.cargando')}</p>
  if (fase === 'entrar') {
    return (
      <main className="mx-auto max-w-xl p-6">
        <p className="mb-4">
          {sesion.error ? t('sesion.error') : t('sesion.entrarTexto')}
        </p>
        <button
          type="button"
          className="rounded bg-stone-900 px-3 py-2 text-white"
          onClick={sesion.entrar}
        >
          {t('sesion.entrar')}
        </button>
      </main>
    )
  }
  return children
}
