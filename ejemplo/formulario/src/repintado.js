// El «foco» de repintados.
// Enciende un componente cada vez que React vuelve a ejecutarlo y cuenta las veces.
// Es la versión a la vista del console.count del curso y del «Highlight updates» de las DevTools.
//
// Cómo funciona:
//  - Cada componente llama a useRepintado('Nombre') y pone el ref en su elemento raíz.
//  - Un efecto SIN lista de dependencias corre después de cada pintado de ESE componente.
//    Si React se salta el componente (por ejemplo con memo), el efecto no corre y no se enciende.
//  - El contador vive en el propio elemento (data-pintadas), así no hace falta estado
//    y el foco nunca provoca un repintado nuevo.
//  - Todo lo que se pinta en el mismo golpe se agrupa en un «lote» para poder resumirlo.

import { useEffect, useRef } from 'react'

const COLOR_REPINTA = '#e8590c' // el componente ya estaba y React lo volvió a ejecutar
const COLOR_NACE = '#3f6fc4' // el componente aparece por primera vez

let numeroDeLote = 0
let lote = null
let causaPendiente = ''
const oyentes = new Set()

// Un evento (teclear, pulsar) anuncia aquí qué ha provocado el cambio.
export function causa(texto) {
  causaPendiente = texto
}

// Quien quiera enterarse de cada lote se apunta aquí. Devuelve la función para desapuntarse.
export function alVaciar(oyente) {
  oyentes.add(oyente)
  return () => {
    oyentes.delete(oyente)
  }
}

// Pone los contadores a cero (solo cambia el DOM, no repinta nada).
export function ponerACero(contenedor) {
  if (!contenedor) return
  contenedor.querySelectorAll('[data-pintadas]').forEach((el) => {
    el.dataset.pintadas = '0'
  })
}

function loteActual() {
  if (!lote) {
    lote = { id: ++numeroDeLote, causa: causaPendiente, entradas: new Map() }
    causaPendiente = ''
    // Todos los efectos de un mismo pintado corren seguidos, antes de este temporizador.
    setTimeout(vaciar, 0)
  }
  return lote
}

function vaciar() {
  const actual = lote
  lote = null
  if (!actual) return
  const resumen = resumir(actual.causa, actual.entradas)
  oyentes.forEach((oyente) => oyente(resumen))
}

// Para cada grupo de componentes (Tarjeta, Buscador…): cuántos se repintaron,
// cuántos son nuevos y cuántos se saltó React.
function resumir(causaDelCambio, entradas) {
  const cuenta = {}
  entradas.forEach((nace, nombre) => {
    const grupo = nombre.split(' ')[0]
    cuenta[grupo] = cuenta[grupo] || { repintados: 0, nuevos: 0 }
    if (nace) cuenta[grupo].nuevos += 1
    else cuenta[grupo].repintados += 1
  })

  const grupos = []
  const vistos = new Set()
  document.querySelectorAll('[data-grupo]').forEach((el) => {
    const grupo = el.dataset.grupo
    if (vistos.has(grupo)) return
    vistos.add(grupo)
    const total = document.querySelectorAll(`[data-grupo="${grupo}"]`).length
    const { repintados = 0, nuevos = 0 } = cuenta[grupo] || {}
    grupos.push({
      grupo,
      total,
      repintados,
      nuevos,
      saltados: Math.max(total - repintados - nuevos, 0),
    })
  })

  return { causa: causaDelCambio, grupos }
}

export function useRepintado(nombre) {
  const ref = useRef(null)

  // Sin lista de dependencias: corre tras cada pintado de este componente.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const actual = loteActual()
    // En desarrollo StrictMode repite el efecto al nacer: dentro del mismo lote cuenta una vez.
    if (el.dataset.lote === String(actual.id)) return
    el.dataset.lote = String(actual.id)

    const nace = el.dataset.pintadas === undefined
    el.dataset.pintadas = String(Number(el.dataset.pintadas || 0) + 1)
    el.dataset.nombre = nombre
    el.dataset.grupo = nombre.split(' ')[0]
    actual.entradas.set(nombre, nace)

    const color = nace ? COLOR_NACE : COLOR_REPINTA
    // En jsdom (las pruebas) no existe animate: se omite sin error.
    el.animate?.(
      [
        { outline: `3px solid ${color}`, outlineOffset: '2px' },
        { outline: '3px solid transparent', outlineOffset: '2px' },
      ],
      { duration: 900, easing: 'ease-out' },
    )
  })

  return ref
}
