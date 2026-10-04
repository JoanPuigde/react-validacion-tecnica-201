import { entregables } from "./datos.js"
import ListaPesada from "./variantes/ListaPesada.jsx"

export default function App() {
  const lenta = new URLSearchParams(window.location.search).has("lenta")
  if (lenta) return <ListaPesada />
  return <Bandeja />
}

function Bandeja() {
  return (
    <main>
      <p className="kicker">Validación de proveedor</p>
      <h1>Bandeja de entregables</h1>
      <p className="lead">Revisión de lo que entrega el proveedor.</p>
      <ul className="lista">
        {entregables.map((item) => (
          <li key={item.id}>
            <h2>{item.titulo}</h2>
            <p>
              {item.id} · {item.proveedor}
            </p>
            <p className={`estado ${item.estado}`}>{item.estado}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
