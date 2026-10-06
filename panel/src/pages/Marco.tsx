import { Outlet } from 'react-router'
import { useTranslation } from 'react-i18next'

export function Marco() {
  const { t, i18n } = useTranslation()
  const otro = i18n.language === 'ca' ? 'es' : 'ca'

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b border-stone-200 bg-white px-6 py-3">
        <p className="font-medium">{t('marca')}</p>
        <button
          type="button"
          className="rounded border border-stone-300 px-2 py-1 text-sm"
          onClick={() => {
            void i18n.changeLanguage(otro)
            localStorage.setItem('idioma', otro)
          }}
        >
          {otro}
        </button>
      </header>
      <Outlet />
    </div>
  )
}
