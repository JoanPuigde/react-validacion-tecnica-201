import type { Entregable } from "../modelo"

interface TarjetaProps {
  item: Entregable
  textoBoton?: string
}

export default function Tarjeta({ item, textoBoton = "Anotar" }: TarjetaProps) {
  function anotar(id: string): void {
    console.log(id)
  }

  return (
    <article>
      <p>{item.titulo}</p>
      <p>
        {item.id} · {item.proveedor}
      </p>
      <p className={`estado ${item.estado}`}>{item.estado}</p>
      {item.estado === "pendiente" ? <p>Falta revisión</p> : null}
      <button type="button" onClick={() => anotar(item.id)}>
        {textoBoton} {item.id}
      </button>
    </article>
  )
}
