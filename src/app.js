import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { OpenAIService } from './services/OpenAIService.js';
import { createProductController } from './controllers/ProductController.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

const openaiService = new OpenAIService(process.env.OPENAI_API_KEY);
const productController = createProductController(openaiService);

app.get('/', (req, res) => {
  res.render('index', { resultado: null, imagenUrl: null, galeria: [] });
});

app.post('/generar', productController.generateProductDetail);

export default app;
