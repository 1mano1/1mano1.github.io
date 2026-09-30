/*
 * Los textos que vienen dentro de los dibujos exportados de Figma
 * (heroIlustracion.json, chipTinyq*.json). El JSON guarda el español; aqui
 * esta su version en ingles. Lo que no aparece aqui (cifras, FP16, INT4...)
 * se queda igual en los dos idiomas.
 */
const EN = {
  '+1.8% de perplejidad': '+1.8% perplexity',
  'contra el original': 'vs. the original',
  'Exporta a GGUF': 'Exports to GGUF',
  'el formato de llama.cpp': "llama.cpp's format",
  Memoria: 'Memory',
  '15.2 GB → 5.7 GB · +1.8% de perplejidad': '15.2 GB → 5.7 GB · +1.8% perplexity',
}

export function textoDibujo(texto, idioma) {
  return idioma === 'en' ? (EN[texto] ?? texto) : texto
}
