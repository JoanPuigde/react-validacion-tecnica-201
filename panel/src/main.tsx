import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './libs/i18n/index.ts'
import { AppProviders } from './providers/AppProviders.tsx'
import { AppRouter } from './routes/AppRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>,
)
