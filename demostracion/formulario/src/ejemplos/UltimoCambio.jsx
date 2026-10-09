import { useEffect, useState } from 'react'
import { alVaciar } from '../repintado'

const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`

// Cuenta lo que pasó en el último pintado, grupo por grupo.
// No lleva foco a propósito: si se encendiera a sí mismo, el resumen nunca se callaría.
function UltimoCambio() {
  const [cambio, setCambio] = useState(null)

  useEffect(() => alVaciar(setCambio), [])

  if (!cambio) return <p className="aviso">Todavía no ha pasado nada.</p>

  return (
    <div>
      <p className="cambio-causa">
        <strong>Qué lo provocó:</strong> {cambio.causa || 'Todo acaba de nacer: es el primer pintado.'}
      </p>
      {cambio.grupos.map((g) => {
        const partes = []
        if (g.repintados > 0) partes.push(plural(g.repintados, 'repintada', 'repintadas'))
        if (g.nuevos > 0) partes.push(plural(g.nuevos, 'nueva', 'nuevas'))
        if (g.saltados > 0) partes.push(plural(g.saltados, 'saltada', 'saltadas'))
        const clase = g.repintados > 0 ? 'activa' : g.nuevos > 0 ? 'nueva' : 'quieta'
        return (
          <div className={`cambio-fila ${clase}`} key={g.grupo}>
            <strong>{g.grupo}</strong>
            <span>{partes.join(' · ')}</span>
          </div>
        )
      })}
    </div>
  )
}

export default UltimoCambio
