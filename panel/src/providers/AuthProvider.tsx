import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { arrancarKeycloak, keycloak } from '../auth/keycloak.ts'

interface Sesion {
  listo: boolean
  autenticado: boolean
  nombre: string | undefined
  error: string | undefined
  entrar: () => void
  salir: () => void
}

const Contexto = createContext<Sesion | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [listo, setListo] = useState(false)
  const [autenticado, setAutenticado] = useState(false)
  const [nombre, setNombre] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    let vivo = true
    arrancarKeycloak()
      .then((ok) => {
        if (!vivo) return
        setAutenticado(ok && keycloak.authenticated === true)
        setNombre(keycloak.tokenParsed?.preferred_username)
        setListo(true)
      })
      .catch((motivo: unknown) => {
        if (!vivo) return
        setError(motivo instanceof Error ? motivo.message : 'keycloak')
        setListo(true)
      })
    return () => {
      vivo = false
    }
  }, [])

  const valor = useMemo<Sesion>(
    () => ({
      listo,
      autenticado,
      nombre,
      error,
      entrar: () => {
        void keycloak.login()
      },
      salir: () => {
        void keycloak.logout()
      },
    }),
    [listo, autenticado, nombre, error],
  )

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}

export function useAuth(): Sesion {
  const valor = useContext(Contexto)
  if (!valor) throw new Error('useAuth fuera de AuthProvider')
  return valor
}
