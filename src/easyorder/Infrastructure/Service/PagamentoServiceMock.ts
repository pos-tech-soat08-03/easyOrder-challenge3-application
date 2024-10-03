import { v4 as uuidv4 } from 'uuid';
import { TransactionEntity } from "../../Core/Entity/TransactionEntity";
import { StatusTransacaoValueObject, StatusTransacaoEnum } from "../../Core/Entity/ValueObject/StatusTransacaoValueObject";
import { PagamentoServiceInterface } from "../../Core/Interfaces/Services/PagamentoServiceInterface";

export class PagamentoServiceMock implements PagamentoServiceInterface {

    constructor() {
        // mock connection
    }
    
    
    async processPayment (transaction: TransactionEntity): Promise <TransactionEntity> {
        if (transaction.getStatusTransacao() === StatusTransacaoEnum.PENDENTE) {
            transaction.setStatusTransacao(new StatusTransacaoValueObject(StatusTransacaoEnum.EM_PROCESSAMENTO));
            transaction.setMsgTransacao(`Transacao ID ${transaction.getIdTransacao()} pedido ${transaction.getIdPedido()} valor ${transaction.getValorTransacao()} enviado para pagamento`);
        }
        return transaction;
    }
    
    async handlePaymentResponse (transaction: TransactionEntity): Promise <TransactionEntity> {
        if (transaction.getStatusTransacao() === StatusTransacaoEnum.EM_PROCESSAMENTO) {
            transaction.setStatusTransacao(new StatusTransacaoValueObject(StatusTransacaoEnum.PAGO));
            transaction.setMsgTransacao(`Transacao ID ${transaction.getIdTransacao()} pedido ${transaction.getIdPedido()} valor ${transaction.getValorTransacao()} pago com sucesso`);
            transaction.setHashTransacao(uuidv4());
        }
        return transaction;
    }
    
}