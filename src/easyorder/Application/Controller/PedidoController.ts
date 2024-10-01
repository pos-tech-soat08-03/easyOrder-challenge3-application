import { IDbConnection } from "../../Core/Interfaces/IDbConnection";
import { PedidoUsecases } from "../../Core/Usecase/PedidoUsecases";
import { PedidoAdapter } from "../Presenter/PedidoAdapter";

export class PedidoController {

    public static async CadastrarPedido(
        dbConnection: IDbConnection,
        clienteIdentificado: boolean,
        clienteId: string,
    ): Promise<string> {
        const pedidoGateway = dbConnection.gateways.pedidoGateway;

        const pedido = await PedidoUsecases.CadastrarPedido(pedidoGateway, clienteIdentificado, clienteId);

        const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

        if (!pedidoSalvo) {
            return PedidoAdapter.adaptJsonError("Erro ao cadastrar pedido.");
        }

        return PedidoAdapter.adaptJsonPedido(pedido);
    }
}