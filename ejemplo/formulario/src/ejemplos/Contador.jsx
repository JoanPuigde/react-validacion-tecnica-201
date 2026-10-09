import { useState } from 'react'

function Contador() {
  const [n, setN] = useState(0)

  return (
    <section>
      <h2>Estado: el componente tiene memoria</h2>
      <p>El número vive en el estado. Al cambiarlo, React vuelve a pintar la pantalla.</p>
      <div className="libreta">{n}</div>
      <button type="button" onClick={() => setN(n + 1)}>Sumar</button>
      <button type="button" onClick={() => setN(0)}>Borrar</button>
    </section>
  )
}

export default Contador