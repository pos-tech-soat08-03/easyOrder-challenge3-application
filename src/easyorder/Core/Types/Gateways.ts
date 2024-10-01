import { ClienteGatewayInterface } from "../Interfaces/Gateway/ClienteGatewayInterface";
import { PedidoGatewayInterface } from "../Interfaces/Gateway/PedidoGatewayInterface";
import { ProdutoGatewayInterface } from "../Interfaces/Gateway/ProdutoGatewayInterface";

export type Gateways = {
  clienteGateway: ClienteGatewayInterface;
  produtoGateway: ProdutoGatewayInterface;
  pedidoGateway: PedidoGatewayInterface;
};
