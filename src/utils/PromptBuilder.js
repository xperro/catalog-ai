export function createPrompt({ nombre, categoria, caracteristicas }) {
  return `
Estoy creando una ficha enriquecida de producto para un catálogo online.

Producto: ${nombre}
Categoría: ${categoria}
Características: ${caracteristicas.join(", ")}

Genera un objeto JSON con los siguientes campos. Todos son opcionales excepto los 3 primeros. Solo incluye los campos si tienes datos relevantes (no pongas campos vacíos ni null):

{
  "titulo": "string",
  "descripcion": "string",
  "meta": "string",
  "keywords": ["string"],
  "especificaciones": ["string"],
  "beneficios": ["string"],
  "medidas": "string",
  "peso": "string",
  "colores": ["string"],
  "precioEstimado": "string (formato: 'xx USD / xx CLP')",
  "materiales": ["string"],
  "compatibilidad": "string",
  "garantia": "string",
  "instrucciones": "string",
  "recomendaciones": "string"
}

- El campo "precioEstimado" debe estar en formato: "xx USD / xx CLP". Ejemplo: "29.99 USD / 27.000 CLP"
- No agregues explicaciones ni texto adicional fuera del JSON.
- Mantén un tono profesional, claro y útil para el cliente.
`;
}
