import { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react'
import { entregables } from './datos'

function reducir(lista, accion) {
  switch (accion.type) {
    case 'marcar':
      return lista.map((item) =>
        item.id === accion.id ? { ...item, estado: 'revisado' } : item
      )
    default:
      return lista
  }
}

const TiendaContexto = createContext(null)
const AvisosContexto = createContext(null)

// ANTES: un solo armario con todo dentro, también los avisos.
export function TiendaProveedor({ children }) {
  const [items, dispatch] = useReducer(reducir, entregables)
  const [revisor, setRevisor] = useState('Ana')
  const [avisos, setAvisos] = useState(0)

  const marcar = useCallback((id) => {
    dispatch({ type: 'marcar', id })
  }, [])

  const sumar = useCallback(() => setAvisos((n) => n + 1), [])

  const valor = useMemo(
    () => ({ items, marcar, revisor, setRevisor, avisos, sumar }),
    [items, marcar, revisor, avisos, sumar]
  )

  return <TiendaContexto.Provider value={valor}>{children}</TiendaContexto.Provider>
}

// DESPUÉS: dos armarios. Los avisos tienen el suyo y ya no mueven el grande.
export function TiendaFinaProveedor({ children }) {
  const [items, dispatch] = useReducer(reducir, entregables)
  const [revisor, setRevisor] = useState('Ana')
  const [avisos, setAvisos] = useState(0)

  const marcar = useCallback((id) => {
    dispatch({ type: 'marcar', id })
  }, [])

  const sumar = useCallback(() => setAvisos((n) => n + 1), [])

  const valor = useMemo(
    () => ({ items, marcar, revisor, setRevisor }),
    [items, marcar, revisor]
  )
  const valorAvisos = useMemo(
    () => ({ avisos, sumar }),
    [avisos, sumar]
  )

  return (
    <TiendaContexto.Provider value={valor}>
      <AvisosContexto.Provider value={valorAvisos}>{children}</AvisosContexto.Provider>
    </TiendaContexto.Provider>
  )
}

export function useStore() {
  const tienda = useContext(TiendaContexto)
  if (!tienda) throw new Error('useStore fuera de TiendaProveedor')
  return tienda
}

// Abre el armario de los avisos.
// La segunda línea solo existe para poder alternar en clase: sin armario aparte,
// los avisos están dentro del grande. En un proyecto de verdad sobraría.
export function useAvisos() {
  const aparte = useContext(AvisosContexto)
  const tienda = useContext(TiendaContexto)
  return aparte ?? tienda
}
