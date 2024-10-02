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

    public static async BuscaPedidoPorId(
        dbConnection: IDbConnection,
        pedidoId: string,
    ): Promise<string> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;

            const pedido = await PedidoUsecases.BuscaPedidoPorId(pedidoGateway, pedidoId);

            if (!pedido) {
                return PedidoAdapter.adaptJsonError("Pedido não encontrado.");
            }

            return PedidoAdapter.adaptJsonPedido(pedido);
        } catch (error) {
            return PedidoAdapter.adaptJsonError("Erro ao buscar pedido.");
        }
    }

    public static async CancelarPedido(
        dbConnection: IDbConnection,
        pedidoId: string,
    ): Promise<string> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;

            const pedido = await PedidoUsecases.CancelarPedido(pedidoGateway, pedidoId);

            if (!pedido) {
                return PedidoAdapter.adaptJsonError("Pedido não encontrado.");
            }

            const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

            if (!pedidoSalvo) {
                return PedidoAdapter.adaptJsonError("Erro ao cancelar pedido.");
            }

            return PedidoAdapter.adaptJsonPedido(pedido);
        } catch (error) {
            return PedidoAdapter.adaptJsonError("Erro ao cancelar pedido.");
        }
    }

    public static async CheckoutPedido(
        dbConnection: IDbConnection,
        pedidoId: string,
    ): Promise<string> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;

            const pedido = await PedidoUsecases.CheckoutPedido(pedidoGateway, pedidoId);

            if (!pedido) {
                return PedidoAdapter.adaptJsonError("Pedido não encontrado.");
            }

            const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

            if (!pedidoSalvo) {
                return PedidoAdapter.adaptJsonError("Erro ao finalizar pedido.");
            }

            return PedidoAdapter.adaptJsonPedido(pedido, "Pedido fechado com sucesso");
        } catch (error) {
            return PedidoAdapter.adaptJsonError("Erro ao finalizar pedido.");
        }
    }

    public static async FecharPedido(
        dbConnection: IDbConnection,
        pedidoId: string,
    ): Promise<string> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;

            const pedido = await PedidoUsecases.FecharPedido(pedidoGateway, pedidoId);

            if (!pedido) {
                return PedidoAdapter.adaptJsonError("Pedido não encontrado.");
            }

            const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

            if (!pedidoSalvo) {
                return PedidoAdapter.adaptJsonError("Erro ao fechar pedido.");
            }

            return PedidoAdapter.adaptJsonPedido(pedido, "Pedido fechado com sucesso");
        } catch (error) {
            return PedidoAdapter.adaptJsonError("Erro ao fechar pedido.");
        }
    }

    public static async AdicionarComboAoPedido(
        dbConnection: IDbConnection,
        pedidoId: string,
        lancheId: string,
        bebidaId: string,
        sobremesaId: string,
        acompanhamentoId: string,
    ): Promise<string> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;
            const produtoGateway = dbConnection.gateways.produtoGateway;

            const pedido = await PedidoUsecases.AdicionarComboAoPedido(
                pedidoGateway,
                produtoGateway,
                pedidoId,
                lancheId,
                bebidaId,
                sobremesaId,
                acompanhamentoId
            );

            if (!pedido) {
                return PedidoAdapter.adaptJsonError("Pedido não encontrado.");
            }

            const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

            if (!pedidoSalvo) {
                return PedidoAdapter.adaptJsonError("Erro ao adicionar combo ao pedido.");
            }

            return PedidoAdapter.adaptJsonPedido(pedido, "Combo adicionado com sucesso");
        } catch (error) {
            return PedidoAdapter.adaptJsonError("Erro ao adicionar combo ao pedido.");
        }
    }

}