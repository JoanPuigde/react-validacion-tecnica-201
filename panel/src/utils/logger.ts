export const logger = {
  error(mensaje: string, detalle?: unknown): void {
    console.error(mensaje, detalle)
  },
}
