import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import eventoRouter from './router/eventoRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo da requisição
app.use(express.json());

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

// Usar o roteador de eventos
app.use('/eventos', eventoRouter);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando e banco de dados conectado!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
