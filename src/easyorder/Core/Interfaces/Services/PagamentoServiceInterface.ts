import { TransactionEntity } from "../../Entity/TransactionEntity";

export interface PagamentoServiceInterface {
    processPayment (transaction: TransactionEntity): Promise<TransactionEntity>;
    handlePaymentResponse (transaction: TransactionEntity): Promise<TransactionEntity>;
}