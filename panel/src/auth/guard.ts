export interface FaseSesion {
  listo: boolean
  autenticado: boolean
}

export function puedeEntrar(sesion: FaseSesion): 'espera' | 'entrar' | 'pasa' {
  if (!sesion.listo) return 'espera'
  if (!sesion.autenticado) return 'entrar'
  return 'pasa'
}
