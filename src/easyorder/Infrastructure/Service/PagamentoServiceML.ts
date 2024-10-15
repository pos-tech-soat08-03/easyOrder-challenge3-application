import { TransactionEntity } from "../../Core/Entity/TransactionEntity";
import { StatusTransacaoValueObject, StatusTransacaoEnum } from "../../Core/Entity/ValueObject/StatusTransacaoValueObject";
import { PagamentoServiceInterface } from "../../Core/Interfaces/Services/PagamentoServiceInterface";
import { PagamentoDTO } from '../../Core/Types/dto/PagamentoDTO';
import { RetornoPagamentoEnum } from '../../Core/Entity/ValueObject/RetornoPagamentoEnum';

export class PagamentoServiceML implements PagamentoServiceInterface {

    constructor() {
    }
    
    async processPayment (transaction: TransactionEntity): Promise <TransactionEntity> {
        // Utilizando QRCode Modelo Dinamico ML
        // Documentacao geral https://www.mercadopago.com.br/developers/pt/docs/qr-code/integration-configuration/qr-dynamic/integration
        // Referencia API https://www.mercadopago.com.br/developers/pt/reference/qr-dynamic/_instore_orders_qr_seller_collectors_user_id_pos_external_pos_id_qrs/post

        const ML_USER_ID = process.env.ML_USER_ID || '';
        const ML_POS_ID = process.env.ML_POS_ID || '';
        const ML_ACCESS_TOKEN = process.env.ML_ACCESS_TOKEN || '';
        const NGROK_URL = process.env.NGROK_URL || '';

        if (transaction.getStatusTransacao() === StatusTransacaoEnum.PENDENTE) {
            
            transaction.setStatusTransacao(new StatusTransacaoValueObject(StatusTransacaoEnum.EM_PROCESSAMENTO));

            const bodyChamada = JSON.stringify({
                external_reference: transaction.getIdTransacao(),
                title: 'Pagamento pedido: ' + transaction.getIdPedido(),
                description: 'Pagamento pedido ' + transaction.getIdPedido() + ' no valor de R$ ' + transaction.getValorTransacao() + ' transação ' + transaction.getIdTransacao(),
                notification_url: "https://e3ca-179-98-8-98.ngrok-free.app/pagamento/webhook/",
                total_amount: transaction.getValorTransacao(),
                "items": [
                    {
                      "sku_number": "A123K9191938",
                      "category": "marketplace",
                      "title": "easyOrder",
                      "description": "easyOrder",
                      "unit_price": transaction.getValorTransacao(),
                      "quantity": 1,
                      "unit_measure": "unit",
                      "total_amount": transaction.getValorTransacao()
                    }
                  ],
                  "cash_out": {
                    "amount": 0
                  }
            });
            console.log("BODY CHAMADA: ", bodyChamada);

            const response = await fetch(`https://api.mercadopago.com/instore/orders/qr/seller/collectors/${ML_USER_ID}/pos/${ML_POS_ID}/qrs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ML_ACCESS_TOKEN}`
                },
                body: bodyChamada
            });
            // if (!response.ok) {
            //     throw new Error('Erro na criação do QRCode. Status: ' + response.status + ' ' + response.json());
            // }
            const data = await response.json();
            transaction.setHash_EMVCo(data.qr_code);
            transaction.setMsgEnvio(JSON.stringify(bodyChamada));
        }
        return transaction;
    }
    
    async handlePaymentResponse (payload: string): Promise <PagamentoDTO> {

        // {
        //     action: "payment.updated",
        //     api_version: "v1",
        //     data: {"id":"123456"},
        //     date_created: "2021-11-01T02:02:02Z",
        //     id: "123456",
        //     live_mode: false,
        //     type: "payment",
        //     user_id: 79847537
        //   }

        try {
            console.log("PAYLOAD RECEIVED (WEBHOOK): ", JSON.stringify(payload));
            payload = JSON.stringify(payload);
            const parsedPayload = JSON.parse(payload);
            
            const transactionId = parsedPayload.id;
            const receivedStatus = parsedPayload.status;
            let transactionStatus: RetornoPagamentoEnum;

            if (receivedStatus === "approved") transactionStatus = RetornoPagamentoEnum.APROVADO;
            else if (receivedStatus === "denied") transactionStatus = RetornoPagamentoEnum.NEGADO;
            else transactionStatus = RetornoPagamentoEnum.PENDENTE; 

            const pagamentoDto: PagamentoDTO = {
                id: transactionId,
                status: transactionStatus,
                payload: parsedPayload
            };
            
            return pagamentoDto;
        } 
        catch (error: any) {
            throw new Error("Erro parsing transaction");
        }

    }
    
}