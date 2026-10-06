import { describe, expect, it } from 'vitest'
import { avisoSchema } from '../../src/api/aviso.ts'

describe('avisoSchema', () => {
  it('acepta un aviso con título y texto', () => {
    const resultado = avisoSchema.safeParse({
      titulo: 'Corte',
      texto: 'De 8 a 10.',
    })
    expect(resultado.success).toBe(true)
  })

  it('rechaza un título corto', () => {
    const resultado = avisoSchema.safeParse({
      titulo: 'Ok',
      texto: 'De 8 a 10.',
    })
    expect(resultado.success).toBe(false)
  })
})
