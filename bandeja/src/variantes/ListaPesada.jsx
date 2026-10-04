import { useMemo, useState } from "react"
import Informe from "./Informe.jsx"

function coste() {
  let total = 0
  for (let i = 0; i < 8000; i += 1) total += Math.sqrt(i)
  return total
}

function Fila({ item, alElegir }) {
  const ruido = coste()
  return (
    <li>
      <button type="button" onClick={() => alElegir(item.id)}>
        {item.titulo}
        <span className="ruido">{ruido.toFixed(0)}</span>
      </button>
    </li>
  )
}

export default function ListaPesada() {
  const [texto, setTexto] = useState("")
  const [elegido, setElegido] = useState("")
  const [informe, setInforme] = useState(false)
  const base = useMemo(
    () =>
      Array.from({ length: 200 }, (_, indice) => ({
        id: `P-${indice + 1}`,
        titulo: `Pieza ${indice + 1}`,
      })),
    [],
  )
  const visibles = base.filter((item) =>
    item.titulo.toLowerCase().includes(texto.toLowerCase()),
  )

  return (
    <main>
      <p className="kicker">Variante de medición</p>
      <h1>Variante lenta</h1>
      <p className="lead">Elegida: {elegido || "ninguna"}</p>
      <label htmlFor="filtro-lento">Filtrar</label>
      <input
        id="filtro-lento"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
      />
      <button type="button" onClick={() => setInforme((valor) => !valor)}>
        Ver informe
      </button>
      {informe ? <Informe /> : null}
      <ul className="lista">
        {visibles.map((item) => (
          <Fila key={item.id} item={item} alElegir={setElegido} />
        ))}
      </ul>
    </main>
  )
}
