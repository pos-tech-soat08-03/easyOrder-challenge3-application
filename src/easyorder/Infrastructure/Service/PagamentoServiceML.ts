import { TransactionEntity } from "../../Core/Entity/TransactionEntity";
import { PagamentoServiceInterface } from "../../Core/Interfaces/Services/PagamentoServiceInterface";

export class PagamentoServiceML implements PagamentoServiceInterface {

    async processPayment (transaction: TransactionEntity): Promise <TransactionEntity> {
        // todo: implement
        return transaction;
    }
    
    async handlePaymentResponse (transaction: TransactionEntity): Promise <TransactionEntity> {
        // todo: implement
        return transaction;
    }

    
}