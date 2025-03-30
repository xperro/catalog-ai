import { createPrompt } from '../utils/PromptBuilder.js';
import { parserResponse } from '../utils/ResponseParser.js';

export function createProductController(openaiService) {
  return {
    async generateProductDetail(req, res) {
      const { nombre, categoria, caracteristicas } = req.body;
      const producto = {
        nombre,
        categoria,
        caracteristicas: caracteristicas.split(',').map(c => c.trim())
      };

      try {
        const prompt = createPrompt(producto);
        const raw = await openaiService.generateProductDetail(prompt);
        const resultado = parserResponse(raw);

        const imagenPrompt = `Foto de producto en fondo blanco, sin texto, sin personas, solo el producto: ${producto.nombre}, ${resultado.keywords.join(', ')}`;
        const imagenUrl = await openaiService.generateImage(imagenPrompt);

        res.render('index', { resultado, imagenUrl, galeria: [] });
      } catch (error) {
        console.error('Error:', error);
        res.render('index', {
          resultado: {
            titulo: 'Error',
            descripcion: error.message,
            meta: '',
            keywords: [],
            especificaciones: [],
            beneficios: []
          },
          imagenUrl: null,
          galeria: []
        });
      }
    }
  };
}
