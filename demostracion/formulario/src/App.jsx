import { useState } from 'react'
import Introduccion from './ejemplos/Introduccion'
import Contador from './ejemplos/Contador'
import Armario from './ejemplos/Armario'
import Api from './ejemplos/Api'

const ejemplos = [
  { id: 'introduccion', titulo: 'Introducción', componente: Introduccion },
  { id: 'contador', titulo: 'Estado', componente: Contador },
  { id: 'armario', titulo: 'Tienda (el armario)', componente: Armario },
  { id: 'api', titulo: 'Datos de fuera (fetch)', componente: Api },
]

function App() {
  const [actual, setActual] = useState('introduccion')
  const Ejemplo = ejemplos.find((e) => e.id === actual).componente

  return (
    <div className="app">
      <h1>Formación React Interactivo</h1>
      <nav>
        {ejemplos.map((e) => (
          <button
            key={e.id}
            type="button"
            className={e.id === actual ? 'activo' : ''}
            onClick={() => setActual(e.id)}
          >
            {e.titulo}
          </button>
        ))}
      </nav>
      <Ejemplo irA={setActual} />
    </div>
  )
}

export default App
