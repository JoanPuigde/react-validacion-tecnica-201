import { entregables } from "./datos"
import Tarjeta from "./componentes/Tarjeta"

export default function App() {
  return (
    <main>
      <h1>Bandeja de entregables</h1>
      <ul className="lista">
        {entregables.map((item) => (
          <li key={item.id}>
            <Tarjeta item={item} />
          </li>
        ))}
      </ul>
    </main>
  )
}
