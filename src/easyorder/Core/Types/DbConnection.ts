import { ClienteRepositoryInterface } from "../Repository/ClienteRepositoryInterface";
import { PedidoRepositoryInterface } from "../Repository/PedidoRepositoryInterface";
import { ProdutoRepositoryInterface } from "../Repository/ProdutoRepositoryInterface";

type DbConnection = {
  clienteRepo: ClienteRepositoryInterface;
  produtoRepo: ProdutoRepositoryInterface;
  pedidoRepo: PedidoRepositoryInterface;
};

export { DbConnection };
