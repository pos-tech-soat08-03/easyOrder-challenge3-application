import { v4 as uuidv4 } from 'uuid';
import { StatusTransacaoValueObject, StatusTransacaoEnum } from './ValueObject/StatusTransacaoValueObject';

export class TransactionEntity {
    private idTransacao: string;
    private idPedido: string;
    private dataCriacaoTransacao: Date;
    private statusTransacao: StatusTransacaoValueObject;
    private valorTransacao: number;
    private msgTransacao: string;
    private hashTransacao: string;

    constructor(idPedido: string, valorTransacao: number) {
        if (idPedido === undefined) {
            throw new Error('Pedido ID é obrigatório');
        }
        if (valorTransacao === undefined || valorTransacao <= 0) {
            throw new Error('Valor da transação é obrigatório e deve ser maior que zero');
        }
        try {
            this.idTransacao = uuidv4();
            this.idPedido = idPedido;
            this.dataCriacaoTransacao = new Date();
            this.statusTransacao = new StatusTransacaoValueObject(StatusTransacaoEnum.PENDENTE);
            this.valorTransacao = valorTransacao;
            this.msgTransacao = '';
            this.hashTransacao = '';
        }
        catch (error: any) {
            throw new Error("Erro ao instanciar a transacao: " + error.message);
        }
    }

    public getIdTransacao(): string {
        return this.idTransacao;
    }

    public getIdPedido(): string {
        return this.idPedido;
    }

    public getDataCriacaoTransacao(): Date {
        return this.dataCriacaoTransacao;
    }

    public setStatusTransacao(novoStatus: StatusTransacaoValueObject): void {
        if (novoStatus === undefined) {
            throw new Error('Status da transação é obrigatório');
        }        
        if (novoStatus.getValue() === StatusTransacaoEnum.PENDENTE) {
            throw new Error('Não é possível retornar o status de transacao para PENDENTE');
        }
        if (novoStatus.getValue() === StatusTransacaoEnum.EM_PROCESSAMENTO) {
            if (this.statusTransacao.getValue() === StatusTransacaoEnum.PENDENTE) {
                this.statusTransacao = novoStatus;
            }
            throw new Error('Não é possível retornar o status de transacao finalizada para EM PROCESSAMENTO');
        }
        if (novoStatus.getValue() === StatusTransacaoEnum.PAGO) {
            if (this.statusTransacao.getValue() === StatusTransacaoEnum.EM_PROCESSAMENTO) {
                this.statusTransacao = novoStatus;
            }
            throw new Error('Não é possível forçar a transação para status PAGO');
        }
        if (novoStatus.getValue() === StatusTransacaoEnum.NEGADO) {
            if (this.statusTransacao.getValue() === StatusTransacaoEnum.EM_PROCESSAMENTO) {
                this.statusTransacao = novoStatus;
            }
            throw new Error('Não é possível forçar a transação para status NEGADO');
        }
        this.statusTransacao = novoStatus;
    }

    public getStatusTransacao(): StatusTransacaoEnum {
        return this.statusTransacao.getValue();
    }

    public setMsgTransacao(msgTransacao: string): void {
        this.msgTransacao = msgTransacao;        
    }

    public setHashTransacao(hashTransacao: string): void {
        this.hashTransacao = hashTransacao;
    }

    public getValorTransacao(): number {
        return this.valorTransacao;
    }



}