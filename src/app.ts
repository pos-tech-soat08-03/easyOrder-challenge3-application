import express from 'express';
import { ListaGenericaEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Exemplo/ListaGenericaEndpoint';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Olá, mundo com Express e TypeScript!');
});

app.get('/exemplo/lista-generica', ListaGenericaEndpoint.handle);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
