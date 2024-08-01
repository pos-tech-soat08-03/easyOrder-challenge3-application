
import { PedidoEntity } from "../../Entity/PedidoEntity";
import { StatusPedidoValueObject } from "../../ValueObject/StatusPedidoValueObject";

export interface PedidoRepositoryInterface {
    salvarPedido(pedido: PedidoEntity): PedidoEntity | null;
    listarPedidosPorStatus(status: StatusPedidoValueObject): PedidoEntity[];
    buscaPedidoPorId(id: string): PedidoEntity | null;
}
