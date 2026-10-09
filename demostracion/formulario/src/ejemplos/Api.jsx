import { useState } from 'react'
import { TiendaApiProveedor, useStoreApi } from '../tienda-api'

// Qué puede responder el servidor de mentira (solo para la demostración).
const MODOS = [
  { id: 'ok', texto: 'Responde bien' },
  { id: 'vacio', texto: 'Responde, pero sin datos' },
  { id: 'invalidos', texto: 'Responde con datos mal formados' },
  { id: 'error', texto: 'Falla (error 500)' },
  { id: 'lento', texto: 'Responde muy lento (3,5 s)' },
]

const FRASES = {
  cargar: 'Papel «cargar»: el cajón «cargando» pasa a true y «items» se vacía. El recadero sale hacia el servidor.',
  listo: 'Papel «listo»: el recadero volvió con los datos ya comprobados y se guardan en «items».',
  fallo: 'Papel «fallo»: el recadero volvió con un problema. El mensaje se guarda en «error».',
}

// Los controles: piden los datos de nuevo.
function Mando() {
  const { pedir, cargando } = useStoreApi()
  const [modo, setModo] = useState('ok')
  const [comprobar, setComprobar] = useState(true)

  return (
    <div>
      <label htmlFor="modo">Qué responde el servidor (de mentira)</label>
      <select id="modo" value={modo} onChange={(evento) => setModo(evento.target.value)}>
        {MODOS.map((m) => (
          <option key={m.id} value={m.id}>{m.texto}</option>
        ))}
      </select>

      <label className="check">
        <input
          type="checkbox"
          checked={comprobar}
          onChange={(evento) => setComprobar(evento.target.checked)}
        />
        Comprobar los datos al recibirlos
      </label>

      <button type="button" disabled={cargando} onClick={() => pedir(modo, comprobar)}>
        Pedir datos
      </button>
    </div>
  )
}

// La lista decide qué enseñar: cargando, error, vacío o las fichas.
function Lista() {
  const { items, cargando, error } = useStoreApi()

  if (cargando) return <p className="aviso">Cargando entregables…</p>
  if (error) return <p className="aviso error" role="alert">No se pudo cargar: {error}</p>
  if (items.length === 0) return <p className="aviso">No hay entregables todavía.</p>

  return (
    <ul className="lista">
      {items.map((item) => (
        <li key={item.id}>
          <span className={`estado ${item.estado}`}>{item.estado}</span>
          <span>
            {item.id} · {item.titulo}
            <small className="sub">Proveedor: {item.proveedor}</small>
          </span>
        </li>
      ))}
    </ul>
  )
}

// El recorrido del recadero: armario ⇄ recadero ⇄ servidor.
function Recorrido() {
  const { cargando, error, items, peticiones } = useStoreApi()

  let estado = 'reposo'
  let texto = 'El recadero espera en la oficina.'
  if (cargando) {
    estado = 'camino'
    texto = 'El recadero va de camino al servidor…'
  } else if (error) {
    estado = 'error'
    texto = `Volvió con un problema: ${error}`
  } else if (peticiones > 0) {
    estado = 'ok'
    texto = items.length > 0
      ? `Volvió con ${items.length} entregables comprobados.`
      : 'Volvió con las manos vacías: el servidor no tenía datos.'
  }

  return (
    <div className="recorrido">
      <div className="recorrido-fila">
        <div className="recorrido-caja">ARMARIO</div>
        <span>⇄</span>
        <div className={`recorrido-caja recadero ${estado}`}>RECADERO<br />pedir()</div>
        <span>⇄</span>
        <div className="recorrido-caja">SERVIDOR<br />/api/entregables</div>
      </div>
      <p className="recorrido-texto">{texto}</p>
    </div>
  )
}

function Cajon({ nombre, valor }) {
  return (
    <div className="cajon">
      <span className="cajon-nombre">{nombre}</span>
      <span key={String(valor)} className="cajon-valor flash">{valor}</span>
    </div>
  )
}

// El dibujo del armario y de los papeles que han pasado por el cajero.
function ArmarioDibujo() {
  const { items, cargando, error, peticiones, registro } = useStoreApi()
  const ultimo = registro[registro.length - 1]

  return (
    <div>
      <div className="armario">
        <div className="armario-titulo">ARMARIO (la tienda)</div>
        <Cajon nombre="items" valor={items.length > 0 ? `${items.length} entregables` : 'vacío'} />
        <Cajon nombre="cargando" valor={String(cargando)} />
        <Cajon nombre="error" valor={error || '—'} />
        <Cajon nombre="peticiones" valor={peticiones} />
      </div>

      <p className="leyenda">Papeles entregados al cajero, del más antiguo al más nuevo:</p>
      <div className="papeles">
        {registro.map((papel, i) => (
          <span key={`${i}-${papel}`} className="papel">{papel}</span>
        ))}
      </div>

      <p className="frase">{ultimo ? FRASES[ultimo] : 'Esperando el primer papel…'}</p>
      <p className="nota">
        Al abrir la pestaña salen 2 peticiones porque en desarrollo React ejecuta el efecto
        dos veces (StrictMode). Solo cuenta la última.
      </p>
    </div>
  )
}

// Solo un rótulo: el nombre es el de un componente real de arriba.
function Mesa({ nombre, coge }) {
  return (
    <div className="mesa">
      <strong>{nombre}</strong>
      <code>useStoreApi()</code>
      <small>coge: {coge}</small>
    </div>
  )
}

function Pantalla() {
  return (
    <section>
      <h2>Datos de fuera: el armario se llena desde un servidor</h2>
      <p>
        El armario empieza <strong>vacío</strong>. Una función (el recadero) va a buscar los
        datos a un servidor, los comprueba y los guarda. El servidor de aquí es de mentira y solo
        existe con <code>npm run dev</code>.
      </p>

      <div className="columnas">
        <div className="panel">
          <h3>Pruébalo</h3>
          <Mando />
          <Lista />
        </div>

        <div className="panel">
          <h3>Cómo es por dentro</h3>
          <Recorrido />

          <div className="mesas">
            <Mesa nombre="Mando" coge="pedir, cargando" />
            <Mesa nombre="Lista" coge="items, cargando, error" />
            <Mesa nombre="Recorrido" coge="cargando, error, items, peticiones" />
          </div>

          <ArmarioDibujo />
        </div>
      </div>
    </section>
  )
}

function Api() {
  return (
    <TiendaApiProveedor>
      <Pantalla />
    </TiendaApiProveedor>
  )
}

export default Api
