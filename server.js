import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath} from 'url'
import path from 'path';
import eventoRouter from './router/eventoRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

app.use('/eventos', eventoRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'views', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
