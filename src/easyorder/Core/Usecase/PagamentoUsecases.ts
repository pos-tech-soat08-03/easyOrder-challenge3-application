import { TransactionEntity } from "../Entity/TransactionEntity";
import { StatusPagamentoEnum } from "../Entity/ValueObject/StatusPagamentoEnum";
import { StatusPedidoEnum, StatusPedidoValueObject } from "../Entity/ValueObject/StatusPedidoValueObject";
import { StatusTransacaoValueObject, StatusTransacaoEnum } from "../Entity/ValueObject/StatusTransacaoValueObject";
import { PedidoGatewayInterface } from "../Interfaces/Gateway/PedidoGatewayInterface";
import { TransactionGatewayInterface } from "../Interfaces/Gateway/TransactionGatewayInterface";
import { PagamentoServiceInterface } from "../Interfaces/Services/PagamentoServiceInterface";
import { PagamentoDTO } from "../Types/dto/PagamentoDTO";

export class PagamentoUsecases {

    public static async ConfirmarPagamentoUsecase(transactionGateway: TransactionGatewayInterface, pedidoGateway: PedidoGatewayInterface, pagamentoService: PagamentoServiceInterface,transactionDTO: PagamentoDTO): Promise<{ transacao: TransactionEntity | undefined, mensagem: string }> {
        const idTransaction = transactionDTO.id;
        const transactionStatus = transactionDTO.status;
        const payload = transactionDTO.payload;

        const transaction = await transactionGateway.buscarTransactionPorId(idTransaction);
        if (transaction === undefined) {
            return { transacao: undefined, mensagem: "Transação não encontrada." };
        }
        const pedido = await pedidoGateway.buscaPedidoPorId(transaction.getIdPedido());
        if (pedido === undefined || pedido === null) {
            return { transacao: undefined, mensagem: "Pedido associado à transação não foi encontrado." };
        }
        if (transaction.getStatusTransacao() === StatusTransacaoEnum.PAGO) {
            return { transacao: undefined, mensagem: "Transação já confirmada." };
        }

        if (transactionStatus === "approved") {
            transaction.setStatusTransacao(new StatusTransacaoValueObject(StatusTransacaoEnum.PAGO));
            transaction.setMsgRetorno(JSON.stringify(payload));
            const transacaoSalva = await transactionGateway.atualizarTransactionsPorId(idTransaction, transaction);
            if (!transacaoSalva) {
                return { transacao: undefined, mensagem: "Erro ao salvar a transação." };
            }
            pedido.setStatusPagamento(StatusPagamentoEnum.PAGO);
            pedido.setStatusPedido(new StatusPedidoValueObject(StatusPedidoEnum.RECEBIDO)); // TODO: confirmar se vamos manter aqui - já envia para preparação
            await pedidoGateway.salvarPedido(pedido);
            return { transacao:transacaoSalva, mensagem:"Transação confirmada e pedido atualizado" } 
        }

        // TODO: criar os outros casos de tratamento de status de transação - qualquer diferente de approved irá negar
        transaction.setStatusTransacao(new StatusTransacaoValueObject(StatusTransacaoEnum.NEGADO));
        transaction.setMsgRetorno(payload);
        const transacaoSalva = await transactionGateway.atualizarTransactionsPorId(idTransaction, transaction);
        if (!transacaoSalva) {
            return { transacao: undefined, mensagem: "Erro ao salvar a transação." };
        }
        pedido.setStatusPagamento(StatusPagamentoEnum.NEGADO);
        pedido.setStatusPedido(new StatusPedidoValueObject(StatusPedidoEnum.CANCELADO));
        await pedidoGateway.salvarPedido(pedido);
        return { transacao:transacaoSalva, mensagem:"Transação com status diferente de approved - NEGADA e pedido CANCELADO" } 
    }


    public static async ListarTransacoesUsecase (transactionGateway: TransactionGatewayInterface, pedidoGateway: PedidoGatewayInterface, pedidoId: string): Promise<{ transacoes: TransactionEntity[] | undefined, mensagem: string }> {
        const transactions = await transactionGateway.listarTransactionsPorPedido(pedidoId);
        if (transactions === undefined) { 
            return { transacoes: undefined, mensagem: "Não foram encontradas transações para o pedido." };
        }
        return { transacoes: transactions, mensagem: `Sucesso. ${transactions.length} Transações encontrada(s).` };
    }


}