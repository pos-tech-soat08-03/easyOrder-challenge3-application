import { v4 as uuidv4 } from 'uuid';
import { TransactionEntity } from "../../Core/Entity/TransactionEntity";
import { StatusTransacaoValueObject, StatusTransacaoEnum } from "../../Core/Entity/ValueObject/StatusTransacaoValueObject";
import { PagamentoServiceInterface } from "../../Core/Interfaces/Services/PagamentoServiceInterface";

export class PagamentoServiceMock implements PagamentoServiceInterface {

    constructor() {
    }
    
    async processPayment (transaction: TransactionEntity): Promise <TransactionEntity> {
        if (transaction.getStatusTransacao() === StatusTransacaoEnum.PENDENTE) {
            transaction.setStatusTransacao(new StatusTransacaoValueObject(StatusTransacaoEnum.EM_PROCESSAMENTO));
            transaction.setMsgEnvio(
                JSON.stringify({
                    idTransacao: transaction.getIdTransacao(),
                    idPedido: transaction.getIdPedido(),
                    valorTransacao: transaction.getValorTransacao(),
                    dataCriacaoTransacao: transaction.getDataCriacaoTransacao().toISOString(),
                    dataEnvioTransacao: new Date().toISOString(),
                    statusTransacao: StatusTransacaoEnum.EM_PROCESSAMENTO
                })
            );
            transaction.setHash_EMVCo("MOCK####021243650016COM.MERCADOLIBRE02013063638f1192a-5fd1-4180-a180-8bcae3556bc35204000053039865802BR5925IZABEL AAAA DE MELO6007BARUERI62070503***63040B6D");
        }
        return transaction;
    }
    
    async handlePaymentResponse (transaction: TransactionEntity): Promise <TransactionEntity> {
        if (transaction.getStatusTransacao() === StatusTransacaoEnum.EM_PROCESSAMENTO) {
            transaction.setStatusTransacao(new StatusTransacaoValueObject(StatusTransacaoEnum.PAGO));
            transaction.setMsgRetorno(
                JSON.stringify({
                    idTransacao: transaction.getIdTransacao(),
                    idPedido: transaction.getIdPedido(),
                    valorTransacao: transaction.getValorTransacao(),
                    dataCriacaoTransacao: transaction.getDataCriacaoTransacao().toISOString(),
                    dataRetornoTransacao: new Date().toISOString(),
                    statusTransacao: StatusTransacaoEnum.PAGO
                })
            );
        }
        return transaction;
    }
    
}