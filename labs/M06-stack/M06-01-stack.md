# M06-01 — Montar y usar

[← Página anterior](README.md)

> Práctica de [El stack](README.md).

### Objetivo

Dejar `panel/` sirviendo en el puerto 5174, entrar como `ana`, publicar un aviso y pasar `npm run check`.

### Prerrequisitos

- Docker en marcha. El dev container del curso ya lo tiene.
- El repositorio abierto. Los pasos son dentro de `panel/`, no dentro de `bandeja/`.

### En qué consiste

Primero el árbol y las dependencias. Después Keycloak y Vite. El resto son usos: la lista, el formulario, el idioma, el test y el chequeo. La bandeja, si la tienes abierta, sigue en el 5173 y no se toca.

### 1 — El árbol y las dependencias

**Dónde:** la terminal, en `panel/`.

**Qué haces:**

1. `cd panel`
2. Si no existe `node_modules`, `npm ci`.
3. Lista `src/` y comprueba que no hay carpeta `shared/`.

**Experimento:** abre `src/pages/AvisosPage.tsx` y mira el import de `Avisos`. Luego abre `src/features/avisos/index.tsx`.

→ La página importa la feature. La feature importa la lista y el formulario, que viven en `components/` y no se exportan. `src/api/use-avisos.ts` no importa nada de `features/`.

**Validación:**

- `pwd` termina en `/panel`.
- Existe `src/api/use-avisos.ts`.
- No existe `src/shared`.

### 2 — Keycloak

**Dónde:** otra terminal, también en `panel/`.

**Qué haces:**

1. `docker compose up -d`
2. Espera a que el log diga `Listening on`. Puedes seguirlo con `docker compose logs -f keycloak` y salir con <kbd>Ctrl</kbd> + <kbd>C</kbd> (eso no para el contenedor).
3. Abre `http://localhost:8080`. La consola de administración usa `admin` / `admin`. No hace falta entrar: el reino `curso` ya viene importado.

El usuario de la aplicación es `ana` / `ana`. El reino le exige nombre, apellido y correo; si falta uno, Keycloak responde que la cuenta no está lista y el panel no pasa del botón Entrar.

**Experimento:** con el contenedor en marcha, `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8080/realms/curso`. Luego `docker compose stop`, repite el `curl` y vuelve con `docker compose start`.

→ El primer `curl` responde `200`. Con el contenedor parado, la conexión falla. Tras `start`, el `200` vuelve.

**Validación:**

- `docker compose ps` muestra `keycloak` en marcha.
- `http://localhost:8080/realms/curso` no es un 404.

Si cambias `keycloak/curso-realm.json`, el reino no se relee con un restart. Hay que recrearlo:

```bash
docker compose down
docker compose up -d
```

`down` borra la base del contenedor. El siguiente `up` importa el JSON otra vez.

> [!WARNING]
> En un codespace, el navegador no es `http://localhost:5174`. Si Entrar vuelve con `Invalid parameter: redirect_uri`, añade esa URL (con `/*` en `redirectUris` y sin `/*` en `webOrigins`) en `keycloak/curso-realm.json` y recrea el contenedor como arriba.

### 3 — Vite

**Dónde:** una terminal en `panel/`. Keycloak sigue en la otra.

**Qué haces:**

1. `npm run dev`
2. Abre el puerto **5174**.

Vite puede imprimir que quiere Node `22.12` o superior. Si después de esa línea dice `ready` y el puerto es 5174, sigue. El `strictPort` hace que no se vaya al 5175: si el 5174 está ocupado, el comando falla.

**Experimento:** en el navegador, pulsa `ca`.

→ La cabecera pasa a «Tauler» y el texto de la sesión, a catalán. El botón ofrece ahora `es`.

**Validación:**

- El título de la pestaña es «Panel».
- La URL usa el puerto 5174.
- Se ve el botón Entrar, o «Comprobando la sesión…» un instante antes.

### 4 — La sesión y la lista

**Dónde:** el navegador, con la pestaña Network abierta. Filtra por `avisos`.

**Qué haces:**

1. Pulsa Entrar.
2. En Keycloak, usuario `ana`, contraseña `ana`, Sign In.
3. Cuando vuelvas al panel, mira la petición `avisos`.

La lista la pide `useAvisos` en `src/api/use-avisos.ts`: axios a `GET /api/avisos` y Zod comprueba que cada elemento tiene `id`, `titulo` y `texto`. TanStack Query solo se usa dentro de `src/api/`. El `GET` y el `POST` los responde un plugin de Vite (`avisos-dev.ts`) mientras corre `npm run dev`. Al reiniciar Vite, la lista vuelve a `public/avisos.json`.

**Experimento:** abre `http://localhost:5174/no-hay` sin cerrar la sesión.

→ Lees «Esta ruta no existe.» Sale de `src/pages/errors/NoEncontrada.tsx`. Esa ruta no pasa por el guard. Vuelve a `/` con el enlace «Avisos».

**Validación:**

- La cabecera del aviso tiene «Salir (ana)».
- Network muestra `GET /api/avisos` con estado 200.
- En la lista está «Corte de agua».

### 5 — El formulario

**Dónde:** la ruta `/`, ya con sesión.

**Qué haces:**

1. Título `No`, texto `Hola`, Publicar.
2. Lee el mensaje bajo el título.
3. Cámbialo a `Ruido` y el texto a `Obras en el patio.` Publica.

El schema está en `src/api/aviso.ts`. El formulario, en `features/avisos/components/AvisoForm.tsx`, usa ese schema con React Hook Form. El texto del error sale de i18n, no del mensaje de Zod.

**Experimento:** en Network, mira el `POST /api/avisos` del segundo intento. Recarga la página.

→ El POST responde 201 y el aviso nuevo queda el primero. Tras recargar, sigue ahí: lo guarda el proceso de Vite, no el `public/avisos.json`.

**Validación:**

- Con título `No` no aparece una ficha nueva.
- Con `Ruido` sí, y los campos quedan vacíos.
- El `POST` es 201.

### 6 — El scanner

**Dónde:** `src/pages/Marco.tsx` y una terminal en `panel/`. El `dev` puede seguir.

**Qué haces:**

1. En la cabecera, junto a `{t('marca')}`, añade un nodo que no se vea: `<span className="hidden">{t('prueba.clave')}</span>`.
2. Guarda.
3. `npm run i18n:scan`
4. Abre `src/libs/i18n/locales/es/translation.json` y el de `ca`.

**Experimento:** rellena `prueba.clave` en los dos JSON (una frase en cada idioma), guarda y mira el navegador. No verás la frase: el `span` está oculto. Quita el `span` y las dos claves, y vuelve a guardar. El scanner no borra claves que ya no se usan (`removeUnusedKeys` está a false); por eso las quitas a mano.

→ Tras el scan, las dos locales tienen `"prueba": { "clave": "" }`. Las traducciones que ya existían siguen.

**Validación:**

- Los dos JSON tienen la clave vacía antes de rellenarla.
- Al terminar el experimento, `prueba` ya no está en ninguno de los dos ficheros y `Marco.tsx` no llama a `t('prueba.clave')`.

### 7 — El espejo de tests

**Dónde:** `tests/`, que repite `src/`.

**Qué haces:**

1. `npm test`
2. Abre `tests/api/aviso.test.ts` y `tests/auth/guard.test.ts`.

No hay test de componente. El espejo cubre lo que decide: el schema del aviso y si el guard deja pasar.

**Experimento:** en `src/api/aviso.ts`, cambia el mínimo del título de `3` a `8`. Guarda y lanza `npm test`. Lee el fallo. Vuelve a dejar `3`.

→ Falla el caso que usa el título `Corte` (cinco letras). `npm test` vuelve a salir en verde al restaurar el `3`.

**Validación:**

- `npm test` termina con 5 tests en verde.
- El `3` del schema ha quedado como estaba.

### 8 — ESLint, Prettier y el hook

**Dónde:** `panel/`.

**Qué haces:**

1. `npm run check`
2. Abre `.husky/pre-commit`.

Ese fichero es el hook: lanza el mismo `npm run check` (tipos, ESLint, Prettier y Vitest). No ejecutes `npx husky` desde aquí. Instalaría el hook en el git del curso y sustituiría los que ya tenga el repositorio. En este laboratorio el chequeo se lanza a mano.

**Experimento:** en `src/utils/logger.ts`, pon un punto y coma al final de una línea. `npm run check`. Luego `npm run format` y vuelve a lanzar `check`.

→ Prettier falla en el primer `check`. Tras `format`, el punto y coma desaparece (la config del panel no usa punto y coma) y `check` pasa.

**Validación:**

- `npm run check` termina sin error.
- `.husky/pre-commit` contiene `npm run check`.

## Comprueba tu entendimiento

**Quién pide los avisos**
En `src/features/avisos/components/ListaAvisos.tsx`, mira el import de `useAvisos`. En `src/pages/AvisosPage.tsx`, busca la palabra `useAvisos`.
→ La lista importa el hook. La página no: compone `Avisos` y el salir.

**Qué sobrevive a un restart**
Reinicia `npm run dev` y recarga `/`.
→ «Corte de agua» sigue. El aviso que publicaste en el paso 5 ya no está.

## Reto

### 1 — El texto también tiene un mínimo

El schema acepta un texto de un carácter. Exige al menos 5, y haz que el test lo demuestre.

<details>
<summary>Ver solución</summary>

En `src/api/aviso.ts`, `texto` queda en `z.string().trim().min(5)`.

En `tests/api/aviso.test.ts`, añade un caso:

```ts
it('rechaza un texto corto', () => {
  const resultado = avisoSchema.safeParse({ titulo: 'Corte', texto: 'Hoy' })
  expect(resultado.success).toBe(false)
})
```

`npm test` pasa. En el formulario, un texto de una letra sigue mostrando `avisos.form.textoVacio`: esa frase sale de i18n. El panel queda con el mínimo en 5.

</details>

## Errores frecuentes

| Síntoma | Causa probable | Cómo arreglarlo |
|---------|----------------|-----------------|
| `Port 5174 is already in use` | Ya hay un `npm run dev` | Deja ese proceso. No abras otro |
| Entrar no abre Keycloak y el texto dice que no responde | El contenedor está parado | `docker compose start` en `panel/` |
| Keycloak dice que la cuenta no está lista | Al usuario le falta correo, nombre o apellido | `ana` en el JSON del reino ya los trae. Si editaste el usuario, vuelve a importar con `docker compose down` y `up -d` |
| `Invalid parameter: redirect_uri` | La URL del navegador no es `localhost:5174` | Añádela al reino y recrea el contenedor |
| La lista nueva desaparece al reiniciar Vite | El POST vive en memoria del `dev` | Es lo esperado. `public/avisos.json` no cambia |
| `npm run check` falla solo en Prettier | Una línea no sigue `prettier.config.js` | `npm run format` y repite `check` |
| Vite avisa de la versión de Node y aun así dice `ready` | El Node del entorno es anterior a 22.12 | Puedes seguir: el aviso no para el servidor |
