import { TransactionEntity } from "../Entity/TransactionEntity";
import { PedidoGatewayInterface } from "../Interfaces/Gateway/PedidoGatewayInterface";
import { TransactionGatewayInterface } from "../Interfaces/Gateway/TransactionGatewayInterface";

export class PagamentoUsecases {

    public static async ConfirmarPagamentoUsecase(transactionGateway: TransactionGatewayInterface, pedidoGateway: PedidoGatewayInterface, idTransaction: string): Promise<{ transacao: TransactionEntity | undefined, mensagem: string }> {
        return { transacao:undefined, mensagem:"" } // TODO terminar 
    }


    public static async ListarTransacoesUsecase (transactionGateway: TransactionGatewayInterface, pedidoGateway: PedidoGatewayInterface, pedidoId: string): Promise<{ transacoes: TransactionEntity[] | undefined, mensagem: string }> {
        const transactions = await transactionGateway.listarTransactionsPorPedido(pedidoId);
        if (transactions === undefined) { 
            return { transacoes: undefined, mensagem: "Não foram encontradas transações para o pedido." };
        }
        return { transacoes: transactions, mensagem: `Sucesso. ${transactions.length} Transações encontrada(s).` };
    }


}