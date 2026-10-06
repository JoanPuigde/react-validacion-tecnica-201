import Keycloak from 'keycloak-js'

const url = import.meta.env.VITE_KEYCLOAK_URL
if (!url) throw new Error('Falta VITE_KEYCLOAK_URL')

export const keycloak = new Keycloak({
  url,
  realm: 'curso',
  clientId: 'panel',
})

let arranque: Promise<boolean> | undefined

export function arrancarKeycloak(): Promise<boolean> {
  arranque ??= keycloak.init({
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    checkLoginIframe: false,
  })
  return arranque
}
