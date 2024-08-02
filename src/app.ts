import express from 'express';
import { BeansManager } from './BeansManager';
import { CadastrarClienteEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Cliente/CadastrarClienteEndpoint';
import { CadastrarProdutoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Cliente/CadastrarProdutoEndpoint';
import { ListaGenericaEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Exemplo/ListaGenericaEndpoint';
import { ProdutoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/ProdutoRepositoryMock';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, mundo com Express e TypeScript!');
});

app.get('/exemplo/lista-generica', ListaGenericaEndpoint.handle);
app.post('/cliente/cadastrar', CadastrarClienteEndpoint.handle);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

const beansManger = new BeansManager();
beansManger.addSingleton<CadastrarProdutoEndpoint>(CadastrarClienteEndpoint, ProdutoRepositoryMock);