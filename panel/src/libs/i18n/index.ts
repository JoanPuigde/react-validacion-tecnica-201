import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ca from './locales/ca/translation.json' with { type: 'json' }
import es from './locales/es/translation.json' with { type: 'json' }

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    ca: { translation: ca },
  },
  lng: localStorage.getItem('idioma') ?? 'es',
  fallbackLng: 'es',
  interpolation: { escapeValue: false },
})

export default i18n
