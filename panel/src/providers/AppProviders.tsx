import type { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider.tsx'
import { QueryProvider } from './QueryProvider.tsx'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  )
}
