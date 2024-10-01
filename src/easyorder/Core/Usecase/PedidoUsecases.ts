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
}
