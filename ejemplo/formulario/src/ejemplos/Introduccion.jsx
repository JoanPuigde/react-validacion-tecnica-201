// Pestaña de bienvenida: qué objetivo tiene esta aplicación y cómo se usa.
// Recibe `irA` por props para saltar a otra pestaña desde los botones de abajo.

const OBJETIVOS = [
  {
    titulo: 'Entender',
    texto: 'Cada concepto del curso viene con un dibujo que se toca y se mueve. Primero se ve, después se lee el código.',
  },
  {
    titulo: 'Comprobar',
    texto: 'El dibujo no es una imagen aparte: se pinta con los mismos componentes reales de la aplicación. Si algo cambia en el dibujo, es porque ha cambiado un dato en el código.',
  },
  {
    titulo: 'Explicar',
    texto: 'Cada pestaña se puede contar en un minuto delante de otra persona, con la pantalla como apoyo.',
  },
]

const SIMBOLOS = [
  ['Armario', 'La tienda', 'Guarda todos los datos en un solo sitio.'],
  ['Cajones', 'Los datos (items, revisor, avisos…)', 'Cada dato tiene su propio cajón.'],
  ['Cajero', 'El reductor', 'Recibe un papel y es el único que cambia los cajones.'],
  ['Llave', 'useStore()', 'Abre el armario desde cualquier mesa.'],
  ['Mesas', 'Los componentes', 'Unas piden un cambio, otras leen un dato.'],
  ['Libreta', 'El estado (useState)', 'Lo que un componente recuerda.'],
  ['Recadero', 'La función que va al servidor', 'Trae datos de fuera y los entrega.'],
  ['Paquete sin abrir', 'El JSON recibido (unknown)', 'Hay que comprobarlo antes de fiarse.'],
]

const PESTANAS = [
  { id: 'contador', titulo: 'Estado', resumen: 'Un componente con memoria: la libreta.' },
  { id: 'armario', titulo: 'Tienda (el armario)', resumen: 'Todos los datos en un solo sitio y quién los pide o los lee.' },
  { id: 'api', titulo: 'Datos de fuera (fetch)', resumen: 'El armario se llena desde un servidor: cargando, vacío y error.' },
]

function Introduccion({ irA }) {
  return (
    <section>
      <h2>Introducción: para qué sirve esta aplicación</h2>
      <p>
        Esta aplicación existe para <strong>entender el curso de React y poder presentarlo</strong>.
        Los conceptos se explican con símiles de la vida diaria (un armario, unas mesas, un
        cajero) y cada símil se dibuja en pantalla, enganchado al código.
      </p>

      <h3>Qué buscamos</h3>
      <div className="tarjetas">
        {OBJETIVOS.map((o) => (
          <div className="tarjeta" key={o.titulo}>
            <strong>{o.titulo}</strong>
            <p>{o.texto}</p>
          </div>
        ))}
      </div>

      <h3>Los símiles, uno por uno</h3>
      <table className="simbolos">
        <thead>
          <tr>
            <th>En el dibujo</th>
            <th>En React</th>
            <th>Para qué sirve</th>
          </tr>
        </thead>
        <tbody>
          {SIMBOLOS.map(([dibujo, react, para]) => (
            <tr key={dibujo}>
              <td><strong>{dibujo}</strong></td>
              <td>{react}</td>
              <td>{para}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Cómo se usa</h3>
      <ol className="pasos">
        <li>Elige una pestaña del menú.</li>
        <li>Toca los controles y mira qué mesa se ilumina y qué cajón cambia.</li>
        <li>Lee la frase que cuenta lo que acaba de pasar y busca esa pieza en el código.</li>
      </ol>

      <h3>Qué hay hasta ahora</h3>
      <ul className="indice">
        {PESTANAS.map((p) => (
          <li key={p.id}>
            <div>
              <strong>{p.titulo}</strong>
              <span className="sub">{p.resumen}</span>
            </div>
            <button type="button" onClick={() => irA(p.id)}>Ir a esta pestaña</button>
          </li>
        ))}
      </ul>

      <p className="nota">
        Los datos de la pestaña «Datos de fuera» vienen de un servidor de mentira que vive en el
        propio proyecto y solo existe con <code>npm run dev</code>. Sirve para provocar a
        propósito la carga, el vacío y el error. Irán entrando más conceptos, una pestaña por cada
        uno.
      </p>
    </section>
  )
}

export default Introduccion
