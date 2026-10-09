const ESTADOS = ['pendiente', 'revisado', 'rechazado']

// La comprobación («guard»): lo que llega de fuera llega «sin abrir».
// Antes de guardarlo en el armario, se mira ficha por ficha.
function esEntregable(x) {
  return (
    typeof x === 'object' &&
    x !== null &&
    typeof x.id === 'string' &&
    typeof x.titulo === 'string' &&
    typeof x.proveedor === 'string' &&
    ESTADOS.includes(x.estado)
  )
}

// El recadero: va al servidor, trae la respuesta y la comprueba.
// «modo» y «comprobar» solo existen para la demostración.
export async function cargarEntregables(modo = 'ok', comprobar = true) {
  const respuesta = await fetch(`/api/entregables?modo=${modo}`)

  // fetch NO falla con un 404 o un 500: hay que mirar respuesta.ok.
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status}`)
  }

  const datos = await respuesta.json() // llega sin abrir

  if (comprobar && (!Array.isArray(datos) || !datos.every(esEntregable))) {
    throw new Error('Los datos recibidos no tienen el formato esperado')
  }

  return datos
}
