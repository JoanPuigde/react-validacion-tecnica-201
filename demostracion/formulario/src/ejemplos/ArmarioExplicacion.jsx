import { fragmento } from './fragmentos'

// Lo que se midió al pulsar «Aviso» una vez en cada combinación (las pruebas lo repiten).
const FILAS = [
  {
    fino: false,
    memo: false,
    nombre: 'Ninguno',
    fichas: '6 de 6',
    porque: 'El armario grande cambia (lleva los avisos dentro) y Pantalla arrastra a la Lista.',
  },
  {
    fino: true,
    memo: false,
    nombre: 'Solo el 1',
    fichas: '6 de 6',
    porque: 'El armario grande ya no cambia, pero Pantalla se repinta para apuntar la frase y, sin memo, arrastra a la Lista y a las fichas.',
  },
  {
    fino: false,
    memo: true,
    nombre: 'Solo el 2',
    fichas: '6 de 6',
    porque: 'Pantalla ya no arrastra a la Lista, pero la Lista y las fichas abren el armario grande y este cambió: memo no lo impide.',
  },
  {
    fino: true,
    memo: true,
    nombre: 'Los dos',
    fichas: '0 de 6',
    porque: 'El armario grande no cambia y Pantalla ya no arrastra a nadie.',
  },
]

function Codigo({ id, version }) {
  const f = fragmento(id, version)
  return (
    <figure className={`codigo ${version === 'antes' ? 'antes' : 'despues'}`}>
      <figcaption>
        <strong>{version === 'antes' ? 'Antes' : 'Después'}</strong>
        <span>{f.fichero}</span>
      </figcaption>
      <pre>
        <code>{f.texto}</code>
      </pre>
    </figure>
  )
}

function Par({ id }) {
  return (
    <div className="dos-codigos">
      <Codigo id={id} version="antes" />
      <Codigo id={id} version="despues" />
    </div>
  )
}

function ArmarioExplicacion({ contextoFino, conMemo }) {
  return (
    <div className="explicacion">
      <h2>Qué hemos arreglado, con el código</h2>
      <p className="nota">
        En los ficheros conviven las dos versiones (<code>TiendaProveedor</code> y{' '}
        <code>TiendaFinaProveedor</code>, <code>moverNueva</code> y <code>moverQuieta</code>,{' '}
        <code>Lista</code> y <code>ListaMemo</code>) para que los interruptores puedan alternar. En
        tu proyecto dejarías solo la buena.
      </p>

      <h3>El síntoma</h3>
      <p>
        Pulsas «Aviso» y solo cambia un número. Pero con el foco encendido se ven las seis fichas
        iluminadas (×1 cada una), aunque ninguna enseña los avisos. No hay nada roto: React hace
        justo lo que le han pedido. Hay dos motivos distintos y hacen falta los dos arreglos para
        que las fichas se queden quietas.
      </p>

      <h3>Lo que hemos medido</h3>
      <p>
        Cada fila es una combinación de los interruptores de arriba: cuántas fichas se repintan al
        pulsar «Aviso» una vez. La fila que tienes puesta ahora está marcada.
      </p>
      <table className="tabla-medida">
        <thead>
          <tr>
            <th>Arreglos puestos</th>
            <th>Fichas repintadas</th>
            <th>Por qué</th>
          </tr>
        </thead>
        <tbody>
          {FILAS.map((fila) => (
            <tr
              key={fila.nombre}
              className={fila.fino === contextoFino && fila.memo === conMemo ? 'activa' : ''}
            >
              <td>{fila.nombre}</td>
              <td className="cifra">{fila.fichas}</td>
              <td>{fila.porque}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Con un solo arreglo no cambia nada: cada causa, por sí sola, basta para repintar las seis
        fichas. Por eso cuesta tanto encontrarlo.
      </p>

      <h3>Causa 1 · Un armario para todo: cualquier cambio avisa a todas las mesas</h3>
      <p>
        El armario guarda <code>items</code>, <code>revisor</code> y <code>avisos</code>. Cada
        componente que lo abre con <code>useStore()</code> queda apuntado en una lista: cuando
        React ve un armario distinto, avisa a todos los apuntados, aunque solo se haya movido un
        cajón que ellos no usan.
      </p>
      <p>
        En el código: <code>avisos</code> estaba dentro del objeto <code>valor</code>. Cuando los
        avisos suben, <code>useMemo</code> fabrica un <code>valor</code> nuevo y React compara el
        valor del contexto entero (con <code>Object.is</code>), no cajón por cajón. Las fichas
        llaman a <code>useStore()</code>, así que se repintan, aunque solo lean{' '}
        <code>marcar</code> y <code>revisor</code>.
      </p>
      <Par id="contexto" />
      <p>
        La solución es sacar los avisos a un armario propio. El grande ya no cambia cuando alguien
        pulsa «Aviso», y solo abre el pequeño quien necesita los avisos.
      </p>
      <Codigo id="lector" version="despues" />
      <p>
        <code>useAvisos()</code> abre el armario pequeño. La parte de <code>tienda</code> solo está
        para poder alternar con el interruptor: sin armario aparte, los avisos están dentro del
        grande. En un proyecto de verdad bastaría la primera línea.
      </p>
      <p>
        Y quienes necesitan los avisos los abren por ahí. En cada componente cambian dos líneas:
      </p>
      <Par id="controles" />
      <Par id="dibujo" />

      <h3>Causa 2 · Pantalla se repinta y arrastra a lo que lleva dentro</h3>
      <p>
        Pantalla apunta quién se ha movido y qué frase mostrar (tres <code>useState</code>). Al
        pulsar «Aviso», <code>mover(...)</code> cambia esos estados y Pantalla se vuelve a ejecutar.
        Regla de la Jornada 4: cuando un padre se repinta, sus hijos se repintan también, aunque
        sus props no hayan cambiado. Así se encienden la Lista y las seis fichas.
      </p>
      <p>
        La herramienta es <code>memo</code>: «si mis props son iguales, sáltame». Pero{' '}
        <code>memo</code> compara props, y <code>mover</code> era una función nueva en cada pintado
        de Pantalla, así que nunca eran iguales. Por eso hace falta también{' '}
        <code>useCallback</code>, que da la misma función siempre. <code>memo</code> solo no basta.
      </p>
      <Par id="mover" />
      <Par id="memo" />
      <p>
        <code>memo</code> va en la Lista y no en cada ficha: si la Lista no se ejecuta, tampoco se
        ejecutan las fichas que lleva dentro.
      </p>

      <h3>Por qué hacen falta los dos</h3>
      <p>
        Son dos puertas distintas por las que React llega a las fichas: por arriba (el padre se
        repinta) y por el armario (el contexto cambia). Cerrar una deja abierta la otra. La
        documentación de React lo dice así: «Even when a component is memoized, it will still
        re-render when a context that it&apos;s using changes» (aunque un componente tenga{' '}
        <code>memo</code>, se repinta igual si cambia un contexto que usa).{' '}
        <a href="https://react.dev/reference/react/memo" target="_blank" rel="noreferrer">
          react.dev/reference/react/memo
        </a>
      </p>

      <h3>Lo que sigue repintándose, y está bien</h3>
      <p>
        Con los dos arreglos, «Aviso» sigue encendiendo Pantalla, Controles y el dibujo del armario.
        Es correcto: cambian de verdad (la frase, el número del botón, el cajón «avisos»). Que algo
        se repinte no es un fallo; lo es que se repinte sin que cambie lo que enseña.
      </p>

      <h3>Lo que no hemos arreglado</h3>
      <p>
        Con los dos arreglos puestos, pulsa «Anotar» en una ficha: se encienden las seis, no solo la
        que anotas. Escribir en Revisor hace lo mismo. Motivo: <code>items</code> y{' '}
        <code>revisor</code> siguen dentro del armario grande y las fichas lo abren, así que cuando
        cambia cualquiera de los dos React las avisa a todas. En Revisor es lo correcto, porque
        todas las fichas enseñan el revisor. En «Anotar» sobran cinco. Arreglarlo pediría repartir
        el armario en más armarios pequeños.
      </p>

      <h3>Cómo alternan los interruptores</h3>
      <p>
        El Arreglo 1 decide qué armario se monta: <code>TiendaFinaProveedor</code> o el de antes,{' '}
        <code>TiendaProveedor</code>. El Arreglo 2 lo decide Pantalla con estas dos líneas. Esto solo
        existe para poder comparar en clase: en un proyecto de verdad quedaría únicamente la
        versión buena.
      </p>
      <Codigo id="elegir" version="despues" />

      <h3>Pruébalo tú</h3>
      <ol className="pasos-foco">
        <li>Pulsa «Sin arreglo» y después «Aviso»: se encienden las seis fichas y el resumen dice «Ficha: 6 repintadas».</li>
        <li>Marca solo el Arreglo 1 y pulsa «Aviso»: siguen las seis. Las arrastra Pantalla.</li>
        <li>Desmarca el 1, marca el 2 y pulsa «Aviso»: siguen las seis. Ahora las avisa el armario.</li>
        <li>Marca los dos y pulsa «Aviso»: el resumen dice «Ficha: 6 saltadas», y la Lista también.</li>
        <li>Con los dos puestos, pulsa «Anotar» o escribe en Revisor: vuelven a encenderse las seis.</li>
      </ol>

      <h3>¿Merece la pena en la vida real?</h3>
      <p>
        Aquí no: son seis fichas y no hay nada que acelerar. Que un componente se repinte no quiere
        decir que la página vaya lenta (el <code>console.count</code> de la Jornada 4 cuenta
        ejecuciones, no tiempo). <code>memo</code>, <code>useCallback</code> y un segundo armario
        añaden código que alguien tiene que mantener, y que se rompe sin avisar: basta una función
        nueva en las props para anular <code>memo</code>. Se usan cuando se ha medido un problema,
        por ejemplo con el Profiler de las React DevTools, y no antes. Lo valioso de este ejercicio
        es entender por qué se repinta, para saber leer un resultado raro cuando aparezca.
      </p>
    </div>
  )
}

export default ArmarioExplicacion
