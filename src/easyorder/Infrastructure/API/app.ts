// TODO: REFATORAR PARA FUNÇÃO DE API - CAMADA INFRAESTRUTURA


import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../../../swagger-output.json";

// import { ProdutoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/ProdutoRepositoryMock';
// import { ClienteRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/ClienteRepositoryMock';
// import { PedidoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/PedidoRepositoryMock';
import { CategoriaRepositoryMock } from '../Repository/Mock/CategoriaRepositoryMock';

import { PedidoRepositoryMySQL } from '../Repository/PedidoRepositoryMySQL';
import { ClienteRepositoryMySQL } from '../Repository/ClienteRepositoryMySQL';

import { CadastrarProdutoController } from './easyorder/Infrastructure/Controller/Produto/CadastrarProdutoController';
import { RemoverProdutoController } from './easyorder/Infrastructure/Controller/Produto/RemoverProdutoController';
import { BuscarProdutoController } from './easyorder/Infrastructure/Controller/Produto/BuscarProdutoController';

import { CadastrarClienteController } from '../Controller/Clientes/CadastrarClienteController';
import { AtualizarClienteController } from '../Controller/Clientes/AtualizarClienteController';
import { ListarClientesController } from '../Controller/Clientes/ListarClientesController';
import { BuscarClienteController } from '../Controller/Clientes/BuscarClienteController';

import { CadastrarPedidoController } from './easyorder/Infrastructure/Controller/Pedido/CadastrarPedidoController';
import { CancelarPedidoController } from './easyorder/Infrastructure/Controller/Pedido/CancelarPedidoController';
import { ListarPedidosPorStatusController } from './easyorder/Infrastructure/Controller/Pedido/ListarPedidosPorStatusController';
import { FecharPedidoController } from './easyorder/Infrastructure/Controller/Pedido/FecharPedidoController';
import { IniciarPreparacaoPedidoController } from './easyorder/Infrastructure/Controller/Preparacao/Pedido/IniciarPreparacaoPedidoController';
import { FinalizarPreparacaoPedidoController } from './easyorder/Infrastructure/Controller/Preparacao/Pedido/FinalizarPreparacaoPedidoController';
import { EntregarPedidoController } from './easyorder/Infrastructure/Controller/Preparacao/Pedido/EntregarPedidoController';

import { ListaCategoriasController } from './easyorder/Infrastructure/Controller/Produto/ListarCategoriasController';
import { CheckoutPedidoController } from './easyorder/Infrastructure/Controller/Pedido/CheckoutPedidoController';
import { ProdutoRepositoryMySQL } from '../Repository/ProdutoRepositoryMySQL';
import { AtualizarProdutoController } from './easyorder/Infrastructure/Controller/Produto/AtualizarProdutoController';

import { AdicionarComboAoPedidoController, AdicionarComboAoPedidoControllerParam } from '../Controller/Pedido/AdicionarComboAoPedidoController';
import { RemoverComboDoPedidoController } from './easyorder/Infrastructure/Controller/Pedido/RemoverComboDoPedidoController';
import { BuscaProximoPedidoParaPreparacaoController } from './easyorder/Infrastructure/Controller/Preparacao/Pedido/BuscaProximoPedidoParaPreparacaoController';
import { ListarProdutoController } from './easyorder/Infrastructure/Controller/Produto/ListarProdutoController';
import { BuscaPedidoPorIdController } from './easyorder/Infrastructure/Controller/Pedido/BuscaPedidoPorIdController';

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

const app = express();
const port = Number(process.env.SERVER_PORT || '3000');

app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get('/health', (req, res) => {
  /** #swagger.tags = ['Health']
      #swagger.summary = 'Health check'
  */
  res.json({
    status: 'UP'
  });
});

app.get('/', (req, res) => {
  res.send(`Acesse a documentação do Swagger em <A HREF="http://localhost:${port}/doc/">http://localhost:${port}/doc/</A>`);
});

// Contexto de cliente
app.post('/cliente/cadastrar', new CadastrarClienteController(clienteRepository).handle);
app.put('/cliente/atualizar', new AtualizarClienteController(clienteRepository).handle);
app.get('/cliente/listar', new ListarClientesController(clienteRepository).handle);
app.get('/cliente/buscar/:cpf', new BuscarClienteController(clienteRepository).handle);

// Contexto de produto
app.delete('/produto/remover/:id', new RemoverProdutoController(produtoRepository).handle);
app.get('/produto/categoria/listar', new ListaCategoriasController(categoriaRepositoryMock).handle);
app.get('/produto/buscar/:id', new BuscarProdutoController(produtoRepository).handle);
app.post('/produto/cadastrar', new CadastrarProdutoController(produtoRepository).handle);
app.put('/produto/atualizar', new AtualizarProdutoController(produtoRepository).handle);
app.get('/produto/listar', new ListarProdutoController(produtoRepository).handle);

// Contexto de pedido
app.post('/pedido', new CadastrarPedidoController(pedidoRepository).handle);
app.get('/pedido/listar/:statusPedido', new ListarPedidosPorStatusController(pedidoRepository).handle);
app.get('/pedido/:pedidoId', new BuscaPedidoPorIdController(pedidoRepository).handle);
app.put('/pedido/:pedidoId/cancelar', new CancelarPedidoController(pedidoRepository).handle);
app.put('/pedido/:pedidoId/checkout', new CheckoutPedidoController(pedidoRepository).handle);
app.put('/pedido/:pedidoId/fechar', new FecharPedidoController(pedidoRepository).handle);
const adicionarComboAoPedidoControllerParam = new AdicionarComboAoPedidoControllerParam(pedidoRepository, produtoRepository);
app.post('/pedido/:pedidoId/combo', new AdicionarComboAoPedidoController(adicionarComboAoPedidoControllerParam).handle);
app.delete('/pedido/:pedidoId/combo/:comboId', new RemoverComboDoPedidoController(pedidoRepository).handle);

// Contexto de preparação
app.get('/preparacao/pedido/proximo', new BuscaProximoPedidoParaPreparacaoController(pedidoRepository).handle);
app.put('/preparacao/pedido/:pedidoId/iniciar-preparacao', new IniciarPreparacaoPedidoController(pedidoRepository).handle);
app.put('/preparacao/pedido/:pedidoId/finalizar-preparacao', new FinalizarPreparacaoPedidoController(pedidoRepository).handle);
app.put('/preparacao/pedido/:pedidoId/entregar', new EntregarPedidoController(pedidoRepository).handle);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});