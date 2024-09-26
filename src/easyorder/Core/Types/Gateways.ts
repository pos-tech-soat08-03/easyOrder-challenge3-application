import { ClienteGatewayInterface } from '../Gateway/ClienteGatewayInterface';
import { PedidoGatewayInterface } from '../Gateway/PedidoGatewayInterface';
import { ProdutoGatewayInterface } from '../Gateway/ProdutoGatewayInterface';

export type Gateways = {
  clienteGateway: ClienteGatewayInterface;
  produtoGateway: ProdutoGatewayInterface;
  pedidoGateway: PedidoGatewayInterface;
};
