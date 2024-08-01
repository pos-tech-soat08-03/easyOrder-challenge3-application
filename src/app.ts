import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger-output.json";
import { ListaGenericaEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Exemplo/ListaGenericaEndpoint';
import { CadastrarClienteEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Clientes/CadastrarClienteEndpoint';
import { ListarClientesEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Clientes/ListarClientesEndpoint';
import { RemoverProdutoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Produto/RemoverProdutoEndpoint';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get('/', (req, res) => {
  res.send('Olá, mundo com Express e TypeScript!');
});

app.get('/exemplo/lista-generica', ListaGenericaEndpoint.handle);

app.post('/clientes/cadastrar', CadastrarClienteEndpoint.handle);
app.get('/clientes/listar', ListarClientesEndpoint.handle);

app.delete('/produto/remover', RemoverProdutoEndpoint.handle);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
