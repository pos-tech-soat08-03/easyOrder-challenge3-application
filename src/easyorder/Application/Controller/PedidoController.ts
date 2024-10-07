import { IDbConnection } from "../../Core/Interfaces/IDbConnection";
import { PagamentoServiceInterface } from "../../Core/Interfaces/Services/PagamentoServiceInterface";
import { DataNotFoundException, ValidationErrorException } from "../../Core/Types/ExceptionType";
import { PedidoUsecases } from "../../Core/Usecase/PedidoUsecases";
import { PedidoAdapter } from "../Presenter/PedidoAdapter";

export class PedidoController {

    public static async CadastrarPedido(
        dbConnection: IDbConnection,
        clienteIdentificado: boolean,
        clienteId: string,
    ): Promise<PedidoAdapter> {
        try {
            if (typeof clienteId !== "string") {
                return PedidoAdapter.validateError("Falha ao criar pedido");
            }

            if (typeof clienteIdentificado !== "boolean") {
                return PedidoAdapter.validateError("Falha ao criar pedido");
            }

            const pedido = await PedidoUsecases.CadastrarPedido(clienteIdentificado, clienteId);

            const pedidoGateway = dbConnection.gateways.pedidoGateway;

            const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

            if (!pedidoSalvo) {
                return PedidoAdapter.dataNotFound("Erro ao cadastrar pedido.");
            }

            return PedidoAdapter.successPedido(pedido);

        } catch (error) {
            if (error instanceof DataNotFoundException) {
                return PedidoAdapter.dataNotFound("Erro ao cadastrar pedido.");
            }

            if (error instanceof ValidationErrorException) {
                return PedidoAdapter.validateError("Erro ao cadastrar pedido.");
            }

            return PedidoAdapter.systemError("Erro ao cadastrar pedido.");
        }
    }

    public static async ListarPedidosPorStatus(
        dbConnection: IDbConnection,
        statusPedido: string,
        page: number,
        limit: number,
        orderField: string,
        orderDirection: string,
    ): Promise<PedidoAdapter> {
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

            return PedidoAdapter.successPedidos(pedidos);
        } catch (error) {
            if (error instanceof DataNotFoundException) {
                return PedidoAdapter.dataNotFound(error.message);
            }

            if (error instanceof ValidationErrorException) {
                return PedidoAdapter.validateError(error.message);
            }

            return PedidoAdapter.systemError("Erro ao listar pedido.");
        }
    }

    public static async BuscaPedidoPorId(
        dbConnection: IDbConnection,
        pedidoId: string,
    ): Promise<PedidoAdapter> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;

            const pedido = await PedidoUsecases.BuscaPedidoPorId(pedidoGateway, pedidoId);

            if (!pedido) {
                throw new DataNotFoundException("Pedido não encontrado.");
            }

            return PedidoAdapter.successPedido(pedido);
        } catch (error) {
            if (error instanceof DataNotFoundException) {
                return PedidoAdapter.dataNotFound(error.message);
            }

            if (error instanceof ValidationErrorException) {
                return PedidoAdapter.validateError(error.message);
            }

            return PedidoAdapter.systemError("Erro ao buscar pedido.");
        }
    }

    public static async CancelarPedido(
        dbConnection: IDbConnection,
        pedidoId: string,
    ): Promise<PedidoAdapter> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;

            const pedido = await PedidoUsecases.CancelarPedido(pedidoGateway, pedidoId);

            if (!pedido) {
                throw new DataNotFoundException("Pedido não encontrado.");
            }

            const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

            if (!pedidoSalvo) {
                throw new Error("Erro ao cancelar pedido.");
            }

            return PedidoAdapter.successPedido(pedido, "Pedido cancelado com sucesso");
        } catch (error) {
            if (error instanceof DataNotFoundException) {
                return PedidoAdapter.dataNotFound(error.message);
            }

            if (error instanceof ValidationErrorException) {
                return PedidoAdapter.validateError(error.message);
            }

            return PedidoAdapter.systemError("Erro ao cancelar pedido.");
        }
    }

    public static async CheckoutPedido(
        dbConnection: IDbConnection,
        servicoPagamento: PagamentoServiceInterface,
        pedidoId: string,
    ): Promise<PedidoAdapter> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;
            const transactionGateway = dbConnection.gateways.transactionGateway;

            const pedido = await PedidoUsecases.CheckoutPedido(pedidoGateway, pedidoId);

            if (!pedido) {
                throw new DataNotFoundException("Pedido não encontrado.");
            }

            const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

            if (!pedidoSalvo) {
                throw new Error("Erro ao finalizar pedido.");
            }

            return PedidoAdapter.successPedido(pedido, "Pedido fechado com sucesso");
        } catch (error) {
            if (error instanceof DataNotFoundException) {
                return PedidoAdapter.dataNotFound(error.message);
            }

            if (error instanceof ValidationErrorException) {
                return PedidoAdapter.validateError(error.message);
            }

            return PedidoAdapter.systemError("Erro ao finalizar pedido.");
        }
    }

    public static async FecharPedido(
        dbConnection: IDbConnection,
        servicoPagamento: PagamentoServiceInterface,
        pedidoId: string,
    ): Promise<PedidoAdapter> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;
            const transactionGateway = dbConnection.gateways.transactionGateway;

            const pedido = await PedidoUsecases.FecharPedido(pedidoGateway, transactionGateway, servicoPagamento, pedidoId);

            if (!pedido) {
                throw new DataNotFoundException("Pedido não encontrado.");
            }

            return PedidoAdapter.successPedido(pedido, "Pedido fechado com sucesso");

        } catch (error:any) {
            if (error instanceof DataNotFoundException) {
                return PedidoAdapter.dataNotFound(error.message);
            }

            if (error instanceof ValidationErrorException) {
                return PedidoAdapter.validateError(error.message);
            }
            console.log("Erro encontrado: "+error.message);
            return PedidoAdapter.systemError("Erro ao fechar pedido.");
        }

    }

    public static async AdicionarComboAoPedido(
        dbConnection: IDbConnection,
        pedidoId: string,
        lancheId: string,
        bebidaId: string,
        sobremesaId: string,
        acompanhamentoId: string,
    ): Promise<PedidoAdapter> {
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
                throw new DataNotFoundException("Pedido não encontrado.");
            }

            const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

            if (!pedidoSalvo) {
                throw new Error("Erro ao adicionar combo ao pedido.");
            }

            return PedidoAdapter.successPedido(pedido, "Combo adicionado com sucesso");
        } catch (error) {
            if (error instanceof DataNotFoundException) {
                return PedidoAdapter.dataNotFound(error.message);
            }

            if (error instanceof ValidationErrorException) {
                return PedidoAdapter.validateError(error.message);
            }

            return PedidoAdapter.systemError("Erro ao adicionar combo ao pedido.");
        }
    }

    public static async RemoverComboDoPedido(
        dbConnection: IDbConnection,
        pedidoId: string,
        comboId: string,
    ): Promise<PedidoAdapter> {
        try {
            const pedidoGateway = dbConnection.gateways.pedidoGateway;

            const pedido = await PedidoUsecases.RemoverComboDoPedido(pedidoGateway, pedidoId, comboId);

            if (!pedido) {
                throw new DataNotFoundException("Pedido não encontrado.");
            }

            const pedidoSalvo = await pedidoGateway.salvarPedido(pedido);

            if (!pedidoSalvo) {
                throw new Error("Erro ao remover combo do pedido.");
            }

            return PedidoAdapter.successPedido(pedido, "Combo removido com sucesso");
        } catch (error) {
            if (error instanceof DataNotFoundException) {
                return PedidoAdapter.dataNotFound(error.message);
            }

            if (error instanceof ValidationErrorException) {
                return PedidoAdapter.validateError(error.message);
            }

            return PedidoAdapter.systemError("Erro ao remover combo do pedido.");
        }
    }

}