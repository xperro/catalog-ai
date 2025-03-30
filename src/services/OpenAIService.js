import OpenAI from 'openai';

export class OpenAIService {
  client;

  constructor(apiKey) {
    this.client = new OpenAI({ apiKey });
  }

  async generateProductDetail(prompt) {
    const response = await this.client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices?.[0]?.message?.content || '{}';
  }

  async generateImage(prompt) {
    const image = await this.client.images.generate({
      prompt,
      n: 1,
      size: "512x512",
    });

    return image.data[0]?.url || '';
  }
}
