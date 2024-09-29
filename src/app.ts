import express from "express";
//import { EasyOrderApp } from "./easyorder/api";
import { MySQLConnection } from "./easyorder/Infrastructure/Gateway/Impl/MySQLConnection";
import { CategoriaGatewayMock } from "./easyorder/Infrastructure/Gateway/Mock/CategoriaGatewayMock";
import { DefaultApiEndpoints } from "./easyorder/api/ApisDefaultEndpoints";
import { ApiClientes } from "./easyorder/api/ApiClientes";
import { ApiPedidos } from "./easyorder/api/ApiPedidos";
// import { ProdutoGatewayMock } from './easyorder/Infrastructure/Output/Gateway/Mock/ProdutoGatewayMock';
// import { ClienteGatewayMock } from './easyorder/Infrastructure/Output/Gateway/Mock/ClienteGatewayMock';
// import { PedidoGatewayMock } from './easyorder/Infrastructure/Output/Gateway/Mock/PedidoGatewayMock';

// Inicialização de banco de dados
const categoriaGatewayMock = new CategoriaGatewayMock();
const mysqlConnection = new MySQLConnection({
  hostname: process.env.DATABASE_HOST || "ERROR",
  portnumb: Number(process.env.DATABASE_PORT || "0"),
  database: process.env.DATABASE_NAME || "ERROR",
  username: process.env.DATABASE_USER || "ERROR",
  password: process.env.DATABASE_PASS || "ERROR",
  databaseType: 'mysql'
});

// Inicialização de framework Express 
const port = Number(process.env.SERVER_PORT || "3000");
const app = express();

// Inicialização de endpoints da aplicação
const defaultEndpoints = new DefaultApiEndpoints(app).start();
const clientesEndpoints = new ApiClientes(mysqlConnection, app).start();
const pedidosEndpoints = new ApiPedidos(mysqlConnection, app).start();

// Inicialização do Express server
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});