import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { cargarEntregables } from './api/entregables'

// Empieza «cargando» para no enseñar «vacío» ni un instante antes de la primera petición.
const inicial = { items: [], cargando: true, error: null, peticiones: 0, registro: [] }

// El reductor es puro: recibe papeles y calcula el estado siguiente. NO llama a la red.
function reducir(estado, accion) {
  const registro = [...estado.registro, accion.type].slice(-6)

  switch (accion.type) {
    case 'cargar':
      return { ...estado, items: [], cargando: true, error: null, peticiones: estado.peticiones + 1, registro }
    case 'listo':
      return { ...estado, items: accion.items, cargando: false, registro }
    case 'fallo':
      return { ...estado, items: [], cargando: false, error: accion.mensaje, registro }
    default:
      return estado
  }
}

const TiendaApiContexto = createContext(null)

export function TiendaApiProveedor({ children }) {
  const [estado, dispatch] = useReducer(reducir, inicial)
  const ultima = useRef(0)

  // La función que va a buscar los datos: entrega papeles al cajero al salir y al volver.
  const pedir = useCallback(async (modo = 'ok', comprobar = true) => {
    const miPeticion = ++ultima.current // solo cuenta la última petición
    dispatch({ type: 'cargar' })
    try {
      const items = await cargarEntregables(modo, comprobar)
      if (miPeticion === ultima.current) dispatch({ type: 'listo', items })
    } catch (error) {
      if (miPeticion === ultima.current) dispatch({ type: 'fallo', mensaje: error.message })
    }
  }, [])

  // Al abrir la tienda, el recadero sale una vez.
  useEffect(() => {
    pedir('ok')
  }, [pedir])

  const valor = useMemo(() => ({ ...estado, pedir }), [estado, pedir])

  return <TiendaApiContexto.Provider value={valor}>{children}</TiendaApiContexto.Provider>
}

export function useStoreApi() {
  const tienda = useContext(TiendaApiContexto)
  if (!tienda) throw new Error('useStoreApi fuera de TiendaApiProveedor')
  return tienda
}
