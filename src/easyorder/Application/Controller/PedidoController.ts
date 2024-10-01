import { IDbConnection } from "../../Core/Interfaces/IDbConnection";
import { PedidoUsecases } from "../../Core/Usecase/PedidoUsecases";
import { PedidoAdapter } from "../Presenter/PedidoAdapter";

export class PedidoController {

    public static async CadastrarPedido(
        dbConnection: IDbConnection,
        clienteIdentificado: boolean,
        clienteId: string,
    ): Promise<string> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;

            const pedido = await PedidoUsecases.CadastrarPedido(pedidoGateway, clienteIdentificado, clienteId);

            const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

            if (!pedidoSalvo) {
                return PedidoAdapter.adaptJsonError("Erro ao cadastrar pedido.");
            }

            return PedidoAdapter.adaptJsonPedido(pedido);
        } catch (error) {
            return PedidoAdapter.adaptJsonError("Erro ao cadastrar pedido.");
        }
    }

    public static async ListarPedidosPorStatus(
        dbConnection: IDbConnection,
        statusPedido: string,
        page: number,
        limit: number,
        orderField: string,
        orderDirection: string,
    ): Promise<string> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;

            const pedidos = await PedidoUsecases.ListarPedidosPorStatus(
                pedidoGateway,
                statusPedido,
                page,
                limit,
                orderField,
                orderDirection
            );

            return PedidoAdapter.adaptJsonPedidos(pedidos);
        } catch (error) {
            return PedidoAdapter.adaptJsonError("Erro ao cadastrar pedido.");
        }
    }
}