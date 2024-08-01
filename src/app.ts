import express from 'express';
import { ListaGenericaEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Exemplo/ListaGenericaEndpoint';
import { CadastrarClienteEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Cliente/CadastrarClienteEndpoint';
import { RemoverProdutoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Produto/RemoverProdutoEndpoint';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo com Express e TypeScript!');
});

app.get('/exemplo/lista-generica', ListaGenericaEndpoint.handle);
app.post('/cliente/cadastrar', CadastrarClienteEndpoint.handle);
app.delete('/produto/remover', RemoverProdutoEndpoint.handle);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
