import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

export function NoEncontrada() {
  const { t } = useTranslation()
  return (
    <main className="mx-auto max-w-xl p-6">
      <p className="mb-4">{t('errores.noEncontrada')}</p>
      <Link className="underline" to="/">
        {t('avisos.titulo')}
      </Link>
    </main>
  )
}
