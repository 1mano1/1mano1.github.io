# Portafolio de Imanol Rodríguez

Sitio personal en React + Vite, publicado en <https://1mano1.github.io>.

Páginas:

- `/`: el portafolio (open source, proyectos, diseños y contacto).
- `/octuma`: la documentación de [Octuma](https://github.com/1mano1/octuma), la
  librería que cuantiza modelos de lenguaje a 4 y 8 bits. `/tinyq`, su nombre
  anterior, redirige ahí.
- `/octuma-app`: la app Android que corre esos modelos en el teléfono.

## Correrlo

```bash
npm install
npm run dev        # http://localhost:5174
npm run lint       # oxlint
npm run build      # genera dist/
```

## Idiomas

Todo el sitio está en español e inglés, con el botón ES | EN de los menús. La
elección se guarda en el navegador; sin elección previa se usa el idioma del
navegador. Cada componente define sus textos en un objeto `TEXTOS` con las
claves `es` y `en`, y los lee con `useTextos` (`src/lib/idioma.js`). Los textos
que vienen dentro de los dibujos exportados de Figma se traducen en
`src/lib/textosDibujos.js`.

## Octuma

La versión de Octuma que muestra el sitio, el número de pruebas y los enlaces
a PyPI y GitHub viven en `src/data/octuma.js`. Al publicar una versión nueva
se cambian ahí.

## Las cifras

Los GB, porcentajes y anchos de barra se calculan en cada componente a partir
de los bytes y perplejidades de `runs/*.json` del repo de Octuma. Si un dato
cambia, se cambia el dato crudo y lo demás se recalcula.

## Despliegue

`.github/workflows/deploy.yml` construye y publica en cada `push` a `main`.
`vite.config.js` copia `index.html` a `404.html` para que GitHub Pages sirva
las rutas de React Router al entrar directo a ellas.
