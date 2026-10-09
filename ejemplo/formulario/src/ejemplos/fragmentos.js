// Los trozos de código que enseña la explicación de la pestaña «Tienda».
// No son dibujos: cada «después» está copiado tal cual de los ficheros de verdad
// (tienda.jsx y Armario.jsx), y cada «antes» es el código que había o el que sigue en el fichero.
// Una prueba comprueba que siguen coincidiendo con los ficheros.

export const FRAGMENTOS = [
  {
    id: 'contexto',
    version: 'antes',
    fichero: 'tienda.jsx',
    texto: `
const valor = useMemo(
  () => ({ items, marcar, revisor, setRevisor, avisos, sumar }),
  [items, marcar, revisor, avisos, sumar]
)

return <TiendaContexto.Provider value={valor}>{children}</TiendaContexto.Provider>
`.trim(),
  },
  {
    id: 'contexto',
    version: 'despues',
    fichero: 'tienda.jsx',
    texto: `
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
`.trim(),
  },
  {
    id: 'lector',
    version: 'despues',
    fichero: 'tienda.jsx',
    texto: `
export function useAvisos() {
  const aparte = useContext(AvisosContexto)
  const tienda = useContext(TiendaContexto)
  return aparte ?? tienda
}
`.trim(),
  },
  {
    id: 'controles',
    version: 'antes',
    fichero: 'Armario.jsx',
    texto: `const { revisor, setRevisor, avisos, sumar } = useStore()`,
  },
  {
    id: 'controles',
    version: 'despues',
    fichero: 'Armario.jsx',
    texto: `
const { revisor, setRevisor } = useStore()
const { avisos, sumar } = useAvisos()
`.trim(),
  },
  {
    id: 'dibujo',
    version: 'antes',
    fichero: 'Armario.jsx',
    texto: `const { items, revisor, avisos } = useStore()`,
  },
  {
    id: 'dibujo',
    version: 'despues',
    fichero: 'Armario.jsx',
    texto: `
const { items, revisor } = useStore()
const { avisos } = useAvisos()
`.trim(),
  },
  {
    id: 'mover',
    version: 'antes',
    fichero: 'Armario.jsx',
    texto: `
function moverNueva(nombre, cajonMovido, texto) {
  setQuien(nombre)
  setCajon(cajonMovido)
  setFrase(texto)
}
`.trim(),
  },
  {
    id: 'mover',
    version: 'despues',
    fichero: 'Armario.jsx',
    texto: `
const moverQuieta = useCallback((nombre, cajonMovido, texto) => {
  setQuien(nombre)
  setCajon(cajonMovido)
  setFrase(texto)
}, [])
`.trim(),
  },
  {
    id: 'memo',
    version: 'antes',
    fichero: 'Armario.jsx',
    texto: `<Lista alMover={mover} />`,
  },
  {
    id: 'memo',
    version: 'despues',
    fichero: 'Armario.jsx',
    texto: `const ListaMemo = memo(Lista)`,
  },
  {
    id: 'elegir',
    version: 'despues',
    fichero: 'Armario.jsx',
    texto: `
const mover = conMemo ? moverQuieta : moverNueva
const ListaPintada = conMemo ? ListaMemo : Lista
`.trim(),
  },
]

export function fragmento(id, version) {
  return FRAGMENTOS.find((f) => f.id === id && f.version === version)
}
