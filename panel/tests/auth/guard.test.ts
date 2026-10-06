import { describe, expect, it } from 'vitest'
import { puedeEntrar } from '../../src/auth/guard.ts'

describe('puedeEntrar', () => {
  it('espera mientras Keycloak no ha contestado', () => {
    expect(puedeEntrar({ listo: false, autenticado: false })).toBe('espera')
  })

  it('pide entrada si no hay sesión', () => {
    expect(puedeEntrar({ listo: true, autenticado: false })).toBe('entrar')
  })

  it('deja pasar con sesión', () => {
    expect(puedeEntrar({ listo: true, autenticado: true })).toBe('pasa')
  })
})
