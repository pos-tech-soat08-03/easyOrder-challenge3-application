import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger-output.json";
import { ListaGenericaEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Exemplo/ListaGenericaEndpoint';
import { CadastrarClienteEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Cliente/CadastrarClienteEndpoint';
import { RemoverProdutoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Produto/RemoverProdutoEndpoint';
import { CadastrarPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/CadastrarPedidoEndpoint';
import { CancelarPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/CancelarPedidoEndpoint';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get('/', (req, res) => {
  res.send('Olá, mundo com Express e TypeScript!');
});

app.get('/exemplo/lista-generica', ListaGenericaEndpoint.handle);

app.post('/cliente/cadastrar', CadastrarClienteEndpoint.handle);

app.delete('/produto/remover', RemoverProdutoEndpoint.handle);

app.post('/pedido/cadastrar', CadastrarPedidoEndpoint.handle);

app.post('/pedido/cancelar/:pedidoId', CancelarPedidoEndpoint.handle);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
