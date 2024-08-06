import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger-output.json";

import { ProdutoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/ProdutoRepositoryMock';
import { ClienteRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/ClienteRepositoryMock';
import { PedidoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/PedidoRepositoryMock';
import { CategoriaRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/CategoriaRepositoryMock';
import { RemoverProdutoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/RemoverProdutoRepositoryMock';

import { PedidoRepositoryMySQL } from './easyorder/Infrastructure/Output/Repository/PedidoRepositoryMySQL';
import { ClienteRepositoryMySQL } from './easyorder/Infrastructure/Output/Repository/ClienteRepositoryMySQL';

import { CadastrarProdutoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Produto/CadastrarProdutoEndpoint';
import { RemoverProdutoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Produto/RemoverProdutoEndpoint';

import { CadastrarClienteEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Clientes/CadastrarClienteEndpoint';
import { ListarClientesEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Clientes/ListarClientesEndpoint';
import { BuscarClienteEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Clientes/BuscarClienteEndpoint';

import { CadastrarPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/CadastrarPedidoEndpoint';
import { CancelarPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/CancelarPedidoEndpoint';
import { ListarPedidosPorStatusEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/ListarPedidosPorStatusEndpoint';
import { FecharPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/FecharPedidoEndpoint';
import { IniciarPreparacaoPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/IniciarPreparacaoPedidoEndpoint';
import { FinalizarPreparacaoPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/FinalizarPreparacaoPedidoEndpoint';
import { EntregarPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/EntregarPedidoEndpoint';

import { ListaCategoriasEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Produto/ListarCategoriasEndpoint';
import { CheckoutPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/CheckoutPedidoEndpoint';
import { ProdutoRepositoryMySQL } from './easyorder/Infrastructure/Output/Repository/ProdutoRepositoryMySQL';
import { AdicionarComboAoPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/AdicionarComboAoPedidoEndpoint';
import { RemoverComboDoPedidoEndpoint } from './easyorder/Infrastructure/Input/Endpoint/Pedido/RemoverComboDoPedidoEndpoint';

const clienteRepository = new ClienteRepositoryMySQL(
  process.env.DATABASE_HOST || 'ERROR',
  Number(process.env.DATABASE_PORT || '0'),
  process.env.DATABASE_NAME || 'ERROR',
  process.env.DATABASE_USER || 'ERROR',
  process.env.DATABASE_PASS || 'ERROR'
);

const produtoRepository = new ProdutoRepositoryMySQL(
  process.env.DATABASE_HOST || 'ERROR',
  Number(process.env.DATABASE_PORT || '0'),
  process.env.DATABASE_NAME || 'ERROR',
  process.env.DATABASE_USER || 'ERROR',
  process.env.DATABASE_PASS || 'ERROR'
);


const pedidoRepository = new PedidoRepositoryMySQL(
  process.env.DATABASE_HOST || 'ERROR',
  Number(process.env.DATABASE_PORT || '0'),
  process.env.DATABASE_NAME || 'ERROR',
  process.env.DATABASE_USER || 'ERROR',
  process.env.DATABASE_PASS || 'ERROR'
);

// Instanciar o mock e o use case para categorias
const categoriaRepositoryMock = new CategoriaRepositoryMock();
const listaCategoriasEndpoint = new ListaCategoriasEndpoint(categoriaRepositoryMock);

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

app.post('/produto/cadastrar', new CadastrarProdutoEndpoint(produtoRepository).handle);

app.post('/pedido/cadastrar', new CadastrarPedidoEndpoint(pedidoRepository).handle);

app.post('/pedido/cancelar/:pedidoId', new CancelarPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/listar/:statusPedido', new ListarPedidosPorStatusEndpoint(pedidoRepository).handle);

app.get('/pedido/fechar/:pedidoId', new FecharPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/checkout/:pedidoId', new CheckoutPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/iniciar-preparacao/:pedidoId', new IniciarPreparacaoPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/finalizar-preparacao/:pedidoId', new FinalizarPreparacaoPedidoEndpoint(pedidoRepository).handle);

app.get('/pedido/entregar/:pedidoId', new EntregarPedidoEndpoint(pedidoRepository).handle);

app.post('/pedido/:pedidoId/combo/adicionar', new AdicionarComboAoPedidoEndpoint(pedidoRepository).handle);

app.delete('/pedido/:pedidoId/combo/:comboId', new RemoverComboDoPedidoEndpoint(pedidoRepository).handle);

app.get('/categoria/listar', new ListaCategoriasEndpoint(categoriaRepositoryMock).handle);

app.get('/categoria/listar', listaCategoriasEndpoint.handle);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});