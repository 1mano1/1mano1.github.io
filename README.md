# Portafolio — Imanol Rodríguez

Sitio personal en React + Vite. Se publica solo en <https://1mano1.github.io>.

Dos páginas:

- `/` — el portafolio: proyectos, diseños, open source y contacto.
- `/tinyq` — la documentación de [TinyQ](https://github.com/1mano1/TinyQ), la
  librería que cuantiza modelos de lenguaje a 4 y 8 bits.

## Correrlo

```bash
npm install
npm run dev        # http://localhost:5174
npm run lint       # oxlint
npm run build      # genera dist/
```

## La regla de los números

**Ninguna cifra derivada se escribe a mano.** Los GB, los porcentajes y el
ancho de las barras se calculan en el componente a partir de los bytes crudos
y de las perplejidades que están en `runs/*.json` del repo de TinyQ. Si un
número cambia, se cambia el dato crudo y lo demás se recalcula solo.

Viene de un problema real: los benchmarks del diseño original de Figma estaban
inventados —hablaban de Llama-3, Mistral y Phi-3, modelos que nunca se
midieron— y parecían mediciones de verdad. Cada componente lleva en su
comentario de cabecera de qué archivo sale cada dato.

Lo que todavía no se puede verificar está marcado con `TODO(Imanol)` en el
propio componente, en vez de rellenarse con algo verosímil.

## Despliegue

`.github/workflows/deploy.yml` construye y publica en cada `push` a `main`.
El único detalle no obvio es el `404.html`: GitHub Pages no conoce las rutas
de React Router, así que `vite.config.js` copia ahí el `index.html` para que
entrar directo a `/tinyq` funcione.
