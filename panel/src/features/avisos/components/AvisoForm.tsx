import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { avisoSchema, type AvisoNuevo } from '../../../api/aviso.ts'
import { useCrearAviso } from '../../../api/use-avisos.ts'

export function AvisoForm() {
  const { t } = useTranslation()
  const crear = useCrearAviso()
  const formulario = useForm<AvisoNuevo>({
    resolver: zodResolver(avisoSchema),
    defaultValues: { titulo: '', texto: '' },
  })

  function enviar(aviso: AvisoNuevo) {
    crear.mutate(aviso, {
      onSuccess: () => {
        formulario.reset()
      },
    })
  }

  return (
    <form className="space-y-3" onSubmit={formulario.handleSubmit(enviar)}>
      <label className="block">
        <span className="mb-1 block text-sm">{t('avisos.form.titulo')}</span>
        <input
          className="w-full rounded border border-stone-300 px-2 py-1"
          {...formulario.register('titulo')}
        />
        {formulario.formState.errors.titulo && (
          <span className="text-sm text-red-700">
            {t('avisos.form.tituloCorto')}
          </span>
        )}
      </label>
      <label className="block">
        <span className="mb-1 block text-sm">{t('avisos.form.texto')}</span>
        <textarea
          className="w-full rounded border border-stone-300 px-2 py-1"
          {...formulario.register('texto')}
        />
        {formulario.formState.errors.texto && (
          <span className="text-sm text-red-700">
            {t('avisos.form.textoVacio')}
          </span>
        )}
      </label>
      <button
        type="submit"
        className="rounded bg-stone-900 px-3 py-2 text-white disabled:opacity-50"
        disabled={crear.isPending}
      >
        {t('avisos.form.enviar')}
      </button>
      {crear.isError && (
        <p className="text-sm text-red-700">{t('avisos.error')}</p>
      )}
    </form>
  )
}
