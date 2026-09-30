import { revelado, useRevelar } from '../../lib/useRevelar'
import BotonCopiar from './BotonCopiar'
import { PYPI, REPO, VERSION } from '../../data/octuma'
import { useIdioma, useTextos } from '../../lib/idioma'

const CHIPS = ['MIT', 'GPTQ + AWQ', 'GGUF · .tq']
const COMANDO = 'octuma quantize Qwen/Qwen2.5-3B-Instruct'

const TEXTOS = {
  es: {
    version: 'Versión actual en PyPI',
    titulo: ['Modelos ', '2.5× más chicos', ', perdiendo 2.4% de calidad.'],
    bajada:
      'Librería de Python que cuantiza modelos de lenguaje a INT4 e INT8 con GPTQ + AWQ, mide cuánta calidad se perdió y exporta a GGUF para llama.cpp y Android, o a .tq para PyTorch.',
    github: 'Ver en GitHub',
    docs: 'Documentación',
  },
  en: {
    version: 'Current version on PyPI',
    titulo: ['Models ', '2.5× smaller', ', losing 2.4% of quality.'],
    bajada:
      'A Python library that quantizes language models to INT4 and INT8 with GPTQ + AWQ, measures how much quality was lost, and exports to GGUF for llama.cpp and Android, or to .tq for PyTorch.',
    github: 'View on GitHub',
    docs: 'Documentation',
  },
}

/* El README en ingles vive en README.en.md. */
const README = { es: `${REPO}#readme`, en: `${REPO}/blob/main/README.en.md` }

/* Hero de Octuma. */
export default function HeroTinyq() {
  const [ref, visible] = useRevelar()
  const t = useTextos(TEXTOS)
  const { idioma } = useIdioma()

  return (
    <section className="herotq" ref={ref}>
      <div className="contenedor herotq__interior">
        <ul {...revelado(visible, 'herotq__chips')}>
          <li className="herotq__chip mono">
            <a href={PYPI} target="_blank" rel="noreferrer" title={t.version}>
              v{VERSION}
            </a>
          </li>
          {CHIPS.map((c) => (
            <li key={c} className="herotq__chip mono">
              {c}
            </li>
          ))}
        </ul>

        <h1 {...revelado(visible, 'herotq__titulo', 60)}>
          {t.titulo[0]}
          <em>{t.titulo[1]}</em>
          {t.titulo[2]}
        </h1>

        <p {...revelado(visible, 'herotq__bajada', 120)}>{t.bajada}</p>

        <div {...revelado(visible, 'herotq__acciones', 180)}>
          <div className="herotq__comando">
            <code className="herotq__linea mono">
              <span className="herotq__signo" aria-hidden="true">
                $
              </span>
              {COMANDO}
            </code>
            <BotonCopiar texto={COMANDO} />
          </div>

          <div className="herotq__botones">
            <a className="boton boton--primario herotq__boton" href={REPO} target="_blank" rel="noreferrer">
              <span className="icono-github herotq__github" aria-hidden="true" />
              {t.github}
            </a>
            <a
              className="boton boton--secundario herotq__boton"
              href={README[idioma]}
              target="_blank"
              rel="noreferrer"
            >
              {t.docs}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
