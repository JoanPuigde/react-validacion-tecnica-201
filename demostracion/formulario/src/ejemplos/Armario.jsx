import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { TiendaFinaProveedor, TiendaProveedor, useAvisos, useStore } from '../tienda'
import { causa, ponerACero, useRepintado } from '../repintado'
import ArmarioExplicacion from './ArmarioExplicacion'
import UltimoCambio from './UltimoCambio'
import './armario.css'

// Qué cajones lee cada componente al abrir el armario con useStore().
const LEE = {
  Controles: ['revisor', 'avisos'],
  Lista: ['items'],
  Ficha: ['revisor'],
}

// Hace lo que hacía App en mi-lista: el campo Revisor y el botón Aviso.
function Controles({ alMover }) {
  const ref = useRepintado('Controles')
  const { revisor, setRevisor } = useStore()
  const { avisos, sumar } = useAvisos()

  return (
    <div ref={ref}>
      <label htmlFor="revisor">Revisor</label>
      <input
        id="revisor"
        value={revisor}
        onChange={(evento) => {
          causa(evento.target.value === '' ? 'Vaciaste el campo Revisor' : `Escribiste «${evento.target.value}» en Revisor`)
          setRevisor(evento.target.value)
          alMover('Controles', 'revisor', 'Controles cambió el revisor. Ficha también lee ese cajón, así que ve el valor nuevo.')
        }}
      />
      <button
        type="button"
        onClick={() => {
          causa('Pulsaste «Aviso»')
          sumar()
          alMover('Controles', 'avisos', `Controles pidió sumar() (ya van ${avisos + 1}). Solo se movió el cajón «avisos», que entre las mesas solo lee Controles.`)
        }}
      >
        Aviso ({avisos})
      </button>
    </div>
  )
}

// Una ficha (el Product de mi-lista): coge marcar y revisor.
function Ficha({ item, alMover }) {
  const ref = useRepintado(`Ficha ${item.id}`)
  const { marcar, revisor } = useStore()

  return (
    <li ref={ref}>
      <span className={`estado ${item.estado}`}>{item.estado}</span>
      <span>
        {item.id} · {item.titulo}
        <small className="sub">Revisor: {revisor}</small>
      </span>
      <button
        type="button"
        disabled={item.estado === 'revisado'}
        onClick={() => {
          causa(`Pulsaste «Anotar» en ${item.id}`)
          marcar(item.id)
          alMover('Ficha', 'items', `La ficha ${item.id} pidió marcar("${item.id}"). Cambia el cajón «items»: Lista lo lee y pinta la ficha nueva.`)
        }}
      >
        {item.estado === 'revisado' ? 'Hecho' : 'Anotar'}
      </button>
    </li>
  )
}

// La lista (el ProductList de mi-lista): coge items y pinta una Ficha por cada uno.
function Lista({ alMover }) {
  const ref = useRepintado('Lista')
  const { items } = useStore()

  return (
    <ul className="lista" ref={ref}>
      {items.map((item) => (
        <Ficha key={item.id} item={item} alMover={alMover} />
      ))}
    </ul>
  )
}

const ListaMemo = memo(Lista)

function Cajon({ nombre, valor }) {
  return (
    <div className="cajon">
      <span className="cajon-nombre">{nombre}</span>
      <span key={String(valor)} className="cajon-valor flash">{valor}</span>
    </div>
  )
}

// El dibujo del armario. Para enseñar los cajones también tiene que abrirlo.
function ArmarioDibujo() {
  const ref = useRepintado('ArmarioDibujo')
  const { items, revisor } = useStore()
  const { avisos } = useAvisos()

  const pendientes = items.filter((i) => i.estado === 'pendiente').length
  const revisados = items.filter((i) => i.estado === 'revisado').length
  const rechazados = items.filter((i) => i.estado === 'rechazado').length

  return (
    <div className="armario" ref={ref}>
      <div className="armario-titulo">ARMARIO (la tienda)</div>
      <Cajon nombre="items" valor={`${pendientes} pendientes · ${revisados} revisados · ${rechazados} rechazados`} />
      <Cajon nombre="revisor" valor={revisor || '(vacío)'} />
      <Cajon nombre="avisos" valor={avisos} />
    </div>
  )
}

// Solo un rótulo: el nombre es el de un componente real de arriba.
// estado: 'pide' (ha pedido el cambio) · 'lee' (lee el cajón que se ha movido) · null
function Mesa({ nombre, coge, estado }) {
  return (
    <div className={`mesa ${estado || ''}`}>
      <strong>{nombre}</strong>
      <code>useStore()</code>
      <small>coge: {coge}</small>
      <small className="etiqueta">
        {estado === 'pide' ? 'Pide el cambio' : estado === 'lee' ? 'Lee ese cajón: ve el valor nuevo' : ' '}
      </small>
    </div>
  )
}

// Pantalla NO abre el armario: solo coloca las piezas y apunta quién se ha movido.
function Pantalla({ conMemo }) {
  const ref = useRepintado('Pantalla')
  const [quien, setQuien] = useState(null)
  const [cajon, setCajon] = useState(null)
  const [frase, setFrase] = useState('Pulsa algo a la izquierda y mira qué cajón se mueve.')

  // ANTES: una función nueva en cada pintado de Pantalla.
  function moverNueva(nombre, cajonMovido, texto) {
    setQuien(nombre)
    setCajon(cajonMovido)
    setFrase(texto)
  }

  // DESPUÉS: la misma función siempre.
  const moverQuieta = useCallback((nombre, cajonMovido, texto) => {
    setQuien(nombre)
    setCajon(cajonMovido)
    setFrase(texto)
  }, [])

  // El interruptor elige cuál de las dos versiones usar (solo para poder compararlas).
  const mover = conMemo ? moverQuieta : moverNueva
  const ListaPintada = conMemo ? ListaMemo : Lista

  function estadoDe(nombre) {
    if (quien === nombre) return 'pide'
    if (cajon && LEE[nombre].includes(cajon)) return 'lee'
    return null
  }

  return (
    <div ref={ref}>
      <div className="columnas">
        <div className="panel">
          <h3>Pruébalo</h3>
          <Controles alMover={mover} />
          <ListaPintada alMover={mover} />
        </div>

        <div className="panel">
          <h3>Cómo es por dentro</h3>

          <p className="leyenda">
            <strong>Azul</strong>: quien pide el cambio · <strong>Verde</strong>: quien lee ese cajón y ve el valor nuevo
          </p>

          <div className="mesas">
            <Mesa nombre="Controles" coge="revisor, setRevisor, avisos, sumar" estado={estadoDe('Controles')} />
            <Mesa nombre="Lista" coge="items" estado={estadoDe('Lista')} />
            <Mesa nombre="Ficha" coge="marcar, revisor" estado={estadoDe('Ficha')} />
          </div>

          <ArmarioDibujo />

          <p className="frase">{frase}</p>
        </div>
      </div>

      <div className="panel resumen">
        <h3>Qué ha pasado en el último pintado</h3>
        <UltimoCambio />
        <p className="muestras">
          <span><span className="muestra repinta" />se repinta</span>
          <span><span className="muestra nace" />aparece</span>
          <span>«saltada»: React no la ejecutó</span>
        </p>
      </div>
    </div>
  )
}

// Lo que dice el panel de interruptores según lo que esté marcado.
function Resultado({ contextoFino, conMemo }) {
  let texto =
    'Sin arreglos, «Aviso» repinta casi todo: los avisos viven dentro del armario grande, que cambia con cada aviso, y Pantalla (que apunta la frase) arrastra a la Lista y a las fichas.'
  if (contextoFino && !conMemo) {
    texto =
      'Con los avisos en su armario, el armario grande ya no cambia. Pero Pantalla sigue repintándose para apuntar la frase y, sin memo, arrastra a la Lista y a las fichas.'
  }
  if (!contextoFino && conMemo) {
    texto =
      'Con memo, la Lista y las fichas se saltarían el pintado de Pantalla. Pero siguen abriendo el armario grande, que cambia con cada aviso, y React las avisa igual: memo no lo impide.'
  }
  if (contextoFino && conMemo) {
    texto =
      'Con los dos arreglos, «Aviso» solo repinta lo que de verdad enseña algo que cambia: Pantalla (la frase), Controles (el número del botón) y el dibujo del armario (el cajón avisos). Las fichas se quedan quietas.'
  }
  return <p className="frase">{texto}</p>
}

function Interruptores({ contextoFino, conMemo, alCambiar, alElegir, alPonerACero }) {
  return (
    <div className="interruptores">
      <label className="check">
        <input
          type="checkbox"
          checked={contextoFino}
          onChange={(evento) => alCambiar('contexto', evento.target.checked)}
        />
        <span><strong>Arreglo 1</strong> · los avisos en un armario aparte</span>
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={conMemo}
          onChange={(evento) => alCambiar('memo', evento.target.checked)}
        />
        <span><strong>Arreglo 2</strong> · <code>memo</code> en la Lista y <code>useCallback</code> en <code>mover</code></span>
      </label>
      <div className="botonera">
        <button type="button" onClick={() => alElegir(false, false)}>Sin arreglo</button>
        <button type="button" onClick={() => alElegir(true, true)}>Con arreglo</button>
        <button type="button" onClick={alPonerACero}>Contadores a cero</button>
      </div>
      <Resultado contextoFino={contextoFino} conMemo={conMemo} />
      <p className="nota">
        El Arreglo 1 cambia de armario, así que avisos, revisor y fichas anotadas vuelven a empezar.
        El Arreglo 2 no toca los datos.
      </p>
    </div>
  )
}

function Armario() {
  const contenedor = useRef(null)
  const [contextoFino, setContextoFino] = useState(false)
  const [conMemo, setConMemo] = useState(false)

  // Al cambiar un interruptor se empieza una cuenta nueva (los hijos ya han contado antes).
  useEffect(() => {
    ponerACero(contenedor.current)
  }, [contextoFino, conMemo])

  function cambiar(cual, valor) {
    const nombre = cual === 'contexto' ? 'Arreglo 1 (avisos aparte)' : 'Arreglo 2 (memo y useCallback)'
    causa(`${valor ? 'Marcaste' : 'Desmarcaste'} el ${nombre}`)
    if (cual === 'contexto') setContextoFino(valor)
    else setConMemo(valor)
  }

  function elegir(fino, memo) {
    if (fino === contextoFino && memo === conMemo) return
    causa(fino ? 'Pulsaste «Con arreglo»' : 'Pulsaste «Sin arreglo»')
    setContextoFino(fino)
    setConMemo(memo)
  }

  const Proveedor = contextoFino ? TiendaFinaProveedor : TiendaProveedor

  return (
    <section ref={contenedor}>
      <h2>Tienda: un armario para toda la oficina</h2>
      <p>
        Los datos viven en un solo sitio (el armario). Cada componente lo abre con
        <code> useStore()</code> y coge lo que necesita.
      </p>
      <p>
        Con el foco encendido se ve lo que React vuelve a ejecutar: cada recuadro se enciende y el
        numerito dice cuántas veces. Pulsa «Aviso» y mira las fichas: no enseñan los avisos y aun
        así se encienden. Debajo está explicado por qué y cómo se arregla; con los dos interruptores
        puedes verlo tú.
      </p>

      <Interruptores
        contextoFino={contextoFino}
        conMemo={conMemo}
        alCambiar={cambiar}
        alElegir={elegir}
        alPonerACero={() => ponerACero(contenedor.current)}
      />

      <Proveedor>
        <Pantalla conMemo={conMemo} />
      </Proveedor>

      <ArmarioExplicacion contextoFino={contextoFino} conMemo={conMemo} />
    </section>
  )
}

export default Armario
