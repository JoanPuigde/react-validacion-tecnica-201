# M01 — Fundamentos

[← Página anterior](../../README.md) · [Siguiente página →](01-entorno.md)

> [!NOTE]
> Esta es la guía del módulo. Se lee página a página. Al final de cada página hay un laboratorio, por si toca practicar ese concepto. El laboratorio no sustituye a la página.

## Qué aprenderás

- Arrancar la bandeja con Vite y dejar un paquete con `build`.
- Leer TSX: interfaz, expresión y `className`.
- Pasar datos con props, reaccionar a un clic y componer con `children`.

## De qué va

La bandeja es la aplicación de la semana: una lista de entregables de proveedor que se revisa en el navegador. El documento se descarga una vez. Cuando más adelante el filtro o una pastilla cambien, React vuelve a pintar ese trozo. No hay una petición nueva de toda la página.

Hoy el recorrido es el cimiento: el entorno que la sirve, el fichero que la describe y las tres formas de componer una ficha —props, evento y children—.

## Páginas

1. [Entorno, Vite y build](01-entorno.md)
2. [TSX](02-tsx.md)
3. [Props](03-props.md)
4. [Eventos](04-eventos.md)
5. [Children](05-children.md)

## Demostración guiada

Al abrir el Codespace, `bandeja/` ya tiene dependencias. `npm run dev` deja Vite en el puerto 5173. La primera pantalla es el título «Bandeja de entregables». A partir de ahí se construye la ficha: un objeto tipado, un componente, una prop, un botón y un marco que envuelve lo que lleve dentro.

→ Sigue en **[Entorno, Vite y build](01-entorno.md)**.
