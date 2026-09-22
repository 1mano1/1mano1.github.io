/**
 * Las tres ilustraciones de "Cómo funciona". Figma 206:6022, 206:7063 y
 * 206:7313, dentro del frame 84:6075.
 *
 * Van en SVG con el lienzo exacto del Figma (408.67x200) para poder escalarlas
 * sin recalcular nada. Los numeros que aparecen dibujados salen de constantes,
 * no del SVG a mano.
 */

const AZUL_50 = '#e3e8ff'
const AZUL_300 = '#9aaeff'
const AZUL_MEDIO = '#5b78ff'
const AZUL_OSCURO = '#1a36b8'
const APAGADO = '#c9d1e6'

/* --- 01 Calibrar: el histograma de activaciones y el rango que se guarda --- */

const ALTURAS = [5.6, 11.2, 19.6, 33.6, 53.2, 78.4, 100.8, 112, 100.8, 78.4, 53.2, 33.6, 19.6, 11.2, 5.6, 4.2, 2.8]
const PRIMERA_DENTRO = 4
const ULTIMA_DENTRO = 12
const SUELO = 160

export function IlustracionCalibrar() {
  return (
    <svg className="pasotq__svg" viewBox="0 0 408.67 200" role="img" aria-label="Histograma de activaciones con el rango calibrado marcado en el centro">
      {ALTURAS.map((alto, i) => {
        const dentro = i >= PRIMERA_DENTRO && i <= ULTIMA_DENTRO
        return (
          <rect
            key={i}
            x={47.83 + i * 17}
            y={SUELO - alto}
            width="14"
            height={alto}
            rx="3"
            fill={dentro ? AZUL_MEDIO : APAGADO}
          />
        )
      })}
      <rect x="24" y="168" width="336.67" height="1" fill="#e6e8ec" />
      <line x1="113.83" y1="34" x2="113.83" y2="164" stroke="#0e0f12" strokeWidth="1.5" />
      <line x1="266.83" y1="34" x2="266.83" y2="164" stroke="#0e0f12" strokeWidth="1.5" />
      <text x="201.33" y="27" textAnchor="middle" className="pasotq__texto-svg">
        rango calibrado
      </text>
    </svg>
  )
}

/* --- 02 Cuantizar por grupos: cuatro bloques, una escala cada uno --- */

/* Cada letra es un tono: a el mas claro, d el mas oscuro. Transcritos del
   Figma tal cual; son 64 pesos de adorno, no datos. */
const BLOQUES = [
  'badb cbdb bbdc bcca',
  'dcda abdc dbbc accc',
  'bcab baba ddca adac',
  'cbda adcd cdda addd',
]
const TONOS = { a: AZUL_50, b: AZUL_300, c: AZUL_MEDIO, d: AZUL_OSCURO }
const ESCALAS = ['s=0.012', 's=0.016', 's=0.020', 's=0.024']
const BLOQUE_ELEGIDO = 1

export function IlustracionGrupos() {
  return (
    <svg className="pasotq__svg" viewBox="0 0 408.67 200" role="img" aria-label="Cuatro bloques de 16 pesos, cada uno con su propia escala">
      <text x="112.33" y="33" className="pasotq__texto-svg">
        grupo de 32 pesos → 1 escala
      </text>
      {BLOQUES.map((bloque, b) => {
        const x0 = 43.33 + b * 76
        const elegido = b === BLOQUE_ELEGIDO
        return (
          <g key={b}>
            <rect
              x={x0 + (elegido ? 0.75 : 0.5)}
              y={54 + (elegido ? 0.75 : 0.5)}
              width={66 - (elegido ? 1.5 : 1)}
              height={66 - (elegido ? 1.5 : 1)}
              rx="8"
              fill="none"
              stroke={elegido ? '#2d55ff' : '#e6e8ec'}
              strokeWidth={elegido ? 1.5 : 1}
            />
            {bloque.replace(/ /g, '').split('').map((tono, c) => (
              <rect
                key={c}
                x={x0 + 4 + (c % 4) * 15}
                y={58 + Math.floor(c / 4) * 15}
                width="12"
                height="12"
                rx="2.5"
                fill={TONOS[tono]}
              />
            ))}
            <text x={x0 + 6} y={149} className="pasotq__texto-svg pasotq__texto-svg--chico">
              {ESCALAS[b]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* --- 03 Evaluar y exportar: la perplejidad medida y los dos formatos --- */

/* runs/qwen3b__fp16__w20s2048_float16.json y __gptq-awq-int4__: 8.347 y 8.549.
   El ancho de la barra es la proporcion entre las dos, no un dibujo. */
const MEDIDAS = [
  { id: 'fp16', etiqueta: 'FP16', ppl: 8.347, color: AZUL_300 },
  { id: 'int4', etiqueta: 'INT4', ppl: 8.549, color: AZUL_OSCURO },
]
const PEOR = Math.max(...MEDIDAS.map((m) => m.ppl))
const BARRA_MAX = 182.15
const FORMATOS = [
  { id: 'gguf', texto: '.gguf', x: 40, ancho: 59 },
  { id: 'tq', texto: '.tq', x: 101, ancho: 44 },
]

export function IlustracionEvaluar() {
  return (
    <svg className="pasotq__svg" viewBox="0 0 408.67 200" role="img" aria-label="Perplejidad de Qwen2.5 3B: 8.35 en FP16 y 8.55 en INT4">
      <text x="40" y="35" className="pasotq__texto-svg">
        Perplejidad · Qwen2.5 3B
      </text>
      {MEDIDAS.map((m, i) => {
        const ancho = (m.ppl / PEOR) * BARRA_MAX
        const y = 52 + i * 34
        return (
          <g key={m.id}>
            <text x="40" y={y + 13} className="pasotq__texto-svg pasotq__texto-svg--dato">
              {m.etiqueta}
            </text>
            <rect x="86" y={y} width={ancho} height="14" rx="4" fill={m.color} />
            <text x={86 + ancho + 7} y={y + 13} className="pasotq__texto-svg pasotq__texto-svg--dato">
              {m.ppl.toFixed(2)}
            </text>
          </g>
        )
      })}
      {FORMATOS.map((f) => (
        <g key={f.id}>
          <rect x={f.x} y="140" width={f.ancho} height="29" rx="8" fill="#0e0f12" />
          <text x={f.x + f.ancho / 2} y="159" textAnchor="middle" className="pasotq__texto-svg pasotq__texto-svg--invertido">
            {f.texto}
          </text>
        </g>
      ))}
    </svg>
  )
}
