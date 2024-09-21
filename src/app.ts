// TODO: REFATORAR PARA INICIALIZAÇÃO

// import { ProdutoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/ProdutoRepositoryMock';
// import { ClienteRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/ClienteRepositoryMock';
// import { PedidoRepositoryMock } from './easyorder/Infrastructure/Output/Repository/Mock/PedidoRepositoryMock';
import { CategoriaRepositoryMock } from "./easyorder/Infrastructure/Repository/Mock/CategoriaRepositoryMock";

import { PedidoRepositoryMySQL } from "./easyorder/Infrastructure/Repository/PedidoRepositoryMySQL";
import { ClienteRepositoryMySQL } from "./easyorder/Infrastructure/Repository/ClienteRepositoryMySQL";
import { ProdutoRepositoryMySQL } from "./easyorder/Infrastructure/Repository/ProdutoRepositoryMySQL";
import { EasyOrderApp } from "./easyorder/Infrastructure/API";

const clienteRepository = new ClienteRepositoryMySQL(
  process.env.DATABASE_HOST || "ERROR",
  Number(process.env.DATABASE_PORT || "0"),
  process.env.DATABASE_NAME || "ERROR",
  process.env.DATABASE_USER || "ERROR",
  process.env.DATABASE_PASS || "ERROR"
);

const produtoRepository = new ProdutoRepositoryMySQL(
  process.env.DATABASE_HOST || "ERROR",
  Number(process.env.DATABASE_PORT || "0"),
  process.env.DATABASE_NAME || "ERROR",
  process.env.DATABASE_USER || "ERROR",
  process.env.DATABASE_PASS || "ERROR"
);

const pedidoRepository = new PedidoRepositoryMySQL(
  process.env.DATABASE_HOST || "ERROR",
  Number(process.env.DATABASE_PORT || "0"),
  process.env.DATABASE_NAME || "ERROR",
  process.env.DATABASE_USER || "ERROR",
  process.env.DATABASE_PASS || "ERROR"
);

// Instanciar o mock e o use case para categorias
const categoriaRepositoryMock = new CategoriaRepositoryMock();

const app = new EasyOrderApp({
  clienteRepo: clienteRepository,
  produtoRepo: produtoRepository,
  pedidoRepo: pedidoRepository,
});

app.start();
