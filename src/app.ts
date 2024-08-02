import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger-output.json";
import { ClienteRepositoryMock } from './easyorder/Infrastructure/Output/Repository/ClienteRepositoryMock';
import { PedidoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/PedidoRepositoryMock';
import { CadastrarClienteEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Clientes/CadastrarClienteEndpoint';
import { ListarClientesEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Clientes/ListarClientesEndpoint';
import { BuscarClienteEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Clientes/BuscarClienteEndpoint';
import { RemoverProdutoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Produto/RemoverProdutoEndpoint';
import { CadastrarPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/CadastrarPedidoEndpoint';
import { CancelarPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/CancelarPedidoEndpoint';
import { ListarPedidosPorStatusEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/ListarPedidosPorStatusEndpoint';
import { RemoverProdutoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/RemoverProdutoRepositoryMock';
import { PedidoRepositoryMySQL } from './easyorder/Infrastructure/Output/Repository/PedidoRepositoryMySQL';
import { ClienteRepositoryMySQL } from './easyorder/Infrastructure/Output/Repository/ClienteRepositoryMySQL';
import { FecharPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/FecharPedidoEndpoint';
import { CheckoutPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/CheckoutPedidoEndpoint';
import { IniciarPreparacaoPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/IniciarPreparacaoPedidoEndpoint';
import { FinalizarPreparacaoPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/FinalizarPreparacaoPedidoEndpoint';
import { EntregarPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/EntregarPedidoEndpoint';

// const clienteRepository = new ClienteRepositoryMock();
const clienteRepository = new ClienteRepositoryMySQL(
  process.env.DATABASE_HOST || 'ERROR',
  Number(process.env.DATABASE_PORT || '0'),
  process.env.DATABASE_NAME || 'ERROR',
  process.env.DATABASE_USER || 'ERROR',
  process.env.DATABASE_PASS || 'ERROR'
);
const produtoRepository = new RemoverProdutoRepositoryMock();
// const pedidoRepository = new PedidoRepositoryMock();
const pedidoRepository = new PedidoRepositoryMySQL(
  process.env.DATABASE_HOST || 'ERROR',
  Number(process.env.DATABASE_PORT || '0'),
  process.env.DATABASE_NAME || 'ERROR',
  process.env.DATABASE_USER || 'ERROR',
  process.env.DATABASE_PASS || 'ERROR'
);

const app = express();
const port = Number(process.env.SERVER_PORT || '3000');

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

app.get('/cliente/buscar', new BuscarClienteEndpoint(clienteRepository).handle);

app.delete('/produto/remover', new RemoverProdutoEndpoint(produtoRepository).handle);

app.post('/pedido/cadastrar', new CadastrarPedidoEndpoint(pedidoRepository).handle);

app.post('/pedido/cancelar/:pedidoId', new CancelarPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/listar/:statusPedido', new ListarPedidosPorStatusEndpoint(pedidoRepository).handle);

app.get('/pedido/fechar/:pedidoId', new FecharPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/checkout/:pedidoId', new CheckoutPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/iniciar-preparacao/:pedidoId', new IniciarPreparacaoPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/finalizar-preparacao/:pedidoId', new FinalizarPreparacaoPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/entregar/:pedidoId', new EntregarPedidoEndpoint(pedidoRepository).handle);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});