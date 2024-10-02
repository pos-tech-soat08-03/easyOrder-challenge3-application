import { PedidoEntity } from "../Entity/PedidoEntity";
import { StatusPedidoEnum, StatusPedidoValueObject } from "../Entity/ValueObject/StatusPedidoValueObject";
import { PedidoGatewayInterface, PedidoGatewayInterfaceFilter, PedidoGatewayInterfaceFilterOrderDirection, PedidoGatewayInterfaceFilterOrderField } from "../Interfaces/Gateway/PedidoGatewayInterface";

export class PedidoUsecases {

    public static async CadastrarPedido(
        pedidoGateway: PedidoGatewayInterface,
        cliente_identificado: boolean,
        clientId: string,
    ): Promise<PedidoEntity> {

        if (!cliente_identificado) {
            clientId = "NAO_IDENTIFICADO";
        }

        return new PedidoEntity(clientId);

    }

    public static async ListarPedidosPorStatus(
        pedidoGateway: PedidoGatewayInterface,
        statusPedido: string,
        page: number,
        limit: number,
        orderField: string,
        orderDirection: string,
    ): Promise<PedidoEntity[]> {
        const filter = {
            page: page,
            limit: limit,
            orderField: orderField as PedidoGatewayInterfaceFilterOrderField,
            orderDirection: orderDirection as PedidoGatewayInterfaceFilterOrderDirection
        };

        const filterStatusPedido = new StatusPedidoValueObject(statusPedido as StatusPedidoEnum);

        const pedidos = await pedidoGateway.listarPedidosPorStatus(filterStatusPedido, filter);

        if (!pedidos) {
            throw new Error("Erro ao listar pedidos");
        }

        if (!pedidos.length) {
            return [];
        }

        return pedidos;
    }

    public static async BuscaPedidoPorId(
        pedidoGateway: PedidoGatewayInterface,
        pedidoId: string,
    ): Promise<PedidoEntity | null> {
        const pedido = await pedidoGateway.buscaPedidoPorId(pedidoId);

        if (!pedido) {
            return null;
        }

        return pedido;
    }

    public static async CancelarPedido(
        pedidoGateway: PedidoGatewayInterface,
        pedidoId: string,
    ): Promise<PedidoEntity> {
        const pedido = await pedidoGateway.buscaPedidoPorId(pedidoId);

        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }

        if (pedido.getStatusPedido().getValue() === StatusPedidoEnum.CANCELADO) {
            throw new Error("Pedido já cancelado");
        }

        pedido.setStatusPedido(
            new StatusPedidoValueObject(StatusPedidoEnum.CANCELADO)
        );

        return pedido;
    }
}
