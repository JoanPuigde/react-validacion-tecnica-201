module.exports = {
  input: ['src/**/*.{ts,tsx}'],
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: false,
    sort: true,
    func: {
      list: ['t'],
      extensions: ['.ts', '.tsx'],
    },
    lngs: ['ca', 'es'],
    defaultLng: 'es',
    defaultNs: 'translation',
    ns: ['translation'],
    resource: {
      loadPath: 'src/libs/i18n/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/libs/i18n/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false,
    keySeparator: '.',
  },
}
