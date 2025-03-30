export function parserResponse(raw) {
  try {
    const resultado = JSON.parse(raw);

    const defaultResultado = {
      titulo: '',
      descripcion: '',
      meta: '',
      keywords: [],
      especificaciones: [],
      beneficios: [],
      medidas: '',
      peso: '',
      colores: [],
      precioEstimado: '',
      materiales: [],
      compatibilidad: '',
      garantia: '',
      instrucciones: '',
      recomendaciones: ''
    };

    const normalize = (valor) => Array.isArray(valor) ? valor : (typeof valor === 'string' ? [valor] : []);

    return {
      ...defaultResultado,
      ...resultado,
      keywords: normalize(resultado.keywords),
      especificaciones: normalize(resultado.especificaciones),
      beneficios: normalize(resultado.beneficios),
      colores: normalize(resultado.colores),
      materiales: normalize(resultado.materiales),
    };
  } catch (e) {
    throw new Error("La respuesta de OpenAI no es un JSON válido.");
  }
}
