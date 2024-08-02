import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger-output.json";
import { CadastrarClienteEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Clientes/CadastrarClienteEndpoint';
import { ListarClientesEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Clientes/ListarClientesEndpoint';
import { RemoverProdutoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Produto/RemoverProdutoEndpoint';
import { CadastrarPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/CadastrarPedidoEndpoint';
import { CancelarPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/CancelarPedidoEndpoint';
import { ListarPedidosPorStatusEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/ListarPedidosPorStatusEndpoint';
import { ClienteRepositoryMock } from './easyorder/Infrastructure/Output/Repository/ClienteRepositoryMock';
import { RemoverProdutoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/RemoverProdutoRepositoryMock';
import { PedidoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/PedidoRepositoryMock';

const clienteRepository = new ClienteRepositoryMock();
const produtoRepository = new RemoverProdutoRepositoryMock();
const pedidoRepository = new PedidoRepositoryMock();

const app = express();
const port = 3000;

app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get('/', (req, res) => {
  res.send('Tudo ok por aqui. Pode seguir viajem!');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'UP'
  });
});

app.post('/cliente/cadastrar', new CadastrarClienteEndpoint(clienteRepository).handle);
app.get('/cliente/listar', new ListarClientesEndpoint(clienteRepository).handle);

app.delete('/produto/remover', new RemoverProdutoEndpoint(produtoRepository).handle);

app.post('/pedido/cadastrar', new CadastrarPedidoEndpoint(pedidoRepository).handle);

app.post('/pedido/cancelar/:pedidoId', new CancelarPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/listar/:statusPedido', new ListarPedidosPorStatusEndpoint(pedidoRepository).handle);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});