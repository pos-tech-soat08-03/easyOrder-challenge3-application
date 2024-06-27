import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Olá, mundo com Express e TypeScript!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
