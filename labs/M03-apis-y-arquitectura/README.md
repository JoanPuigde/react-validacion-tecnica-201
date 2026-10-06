# M03 — APIs y arquitectura

[← Página anterior](../M02-estado-y-hooks/03-efecto.md) · [Siguiente página →](01-peticion.md)

> [!NOTE]
> Guía del módulo. La práctica de cada idea está enlazada al final de la página.

## Qué aprenderás

- Sustituir el array importado por una petición y distinguir carga, error y vacío.
- Leer la respuesta como `unknown` hasta comprobar que es `Entregable[]`.
- Dejar la petición fuera de la ficha y reconocer un árbol revisable.

## De qué va

Hasta ahora la lista vive en el paquete. En una entrega real llega por HTTP. La pantalla pinta antes de que la respuesta exista, y quien revisa tiene que poder separar «está cargando», «falló» y «no hay coincidencias».

## Páginas

1. [La petición y los tres finales](01-peticion.md)
2. [Estructura](02-estructura.md)

## Demostración guiada

Punto de partida: el final del módulo de estado. Buscador, pastilla, pestaña «Pendientes: 3», lista en `bandeja/src/datos.ts`. `public/entregables.json` ya está y la app no lo pide.

Los laboratorios no siguen el orden de estas dos páginas. Primero se saca la lista de `App` ([estructura](02-estructura.md), carpeta `M04-hooks`, desde M04-03). Después el hook deja `datos.ts` y pide el JSON ([petición](01-peticion.md), carpeta `M05-datos`, M05-01 y M05-02). El guion de cada gesto está en esas páginas.

→ Sigue en **[La petición y los tres finales](01-peticion.md)**.
