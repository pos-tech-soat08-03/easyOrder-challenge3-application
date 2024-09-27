// TODO: REFATORAR PARA INICIALIZAÇÃO

// import { ProdutoGatewayMock } from './easyorder/Infrastructure/Output/Gateway/Mock/ProdutoGatewayMock';
// import { ClienteGatewayMock } from './easyorder/Infrastructure/Output/Gateway/Mock/ClienteGatewayMock';
// import { PedidoGatewayMock } from './easyorder/Infrastructure/Output/Gateway/Mock/PedidoGatewayMock';
import { CategoriaGatewayMock } from "./easyorder/Infrastructure/Gateway/Mock/CategoriaGatewayMock";
import { EasyOrderApp } from "./easyorder/api";
import { MySQLConnection } from "./easyorder/Infrastructure/Gateway/Impl/MySQLConnection";

// Instanciar o mock e o use case para categorias
const categoriaGatewayMock = new CategoriaGatewayMock();
const mysqlConnection = new MySQLConnection({
  hostname: process.env.DATABASE_HOST || "ERROR",
  portnumb: Number(process.env.DATABASE_PORT || "0"),
  database: process.env.DATABASE_NAME || "ERROR",
  username: process.env.DATABASE_USER || "ERROR",
  password: process.env.DATABASE_PASS || "ERROR",
  databaseType: 'mysql'
});

const app = new EasyOrderApp(mysqlConnection);

app.start();
