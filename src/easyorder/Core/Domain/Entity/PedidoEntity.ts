
import { v4 as uuidv4 } from 'uuid';
import { StatusPagamentoEnum } from '../ValueObject/StatusPagamentoEnum';
import { StatusPedidoEnum, StatusPedidoValueObject } from '../ValueObject/StatusPedidoValueObject';

export class PedidoEntity {
    private id: string;
    private dataPedido: Date;
    private clienteId: string;
    private statusPedido: StatusPedidoValueObject;
    private statusPagamento: StatusPagamentoEnum;

    constructor(
        clienteId: string,
        dataPedido?: Date,
        statusPedido?: StatusPedidoValueObject,
        statusPagamento?: StatusPagamentoEnum,
        id?: string
    ) {
        if (!id) {
            id = uuidv4();
            dataPedido = new Date();
            statusPedido = new StatusPedidoValueObject(StatusPedidoEnum.RASCUNHO);
            statusPagamento = StatusPagamentoEnum.PENDENTE;
        }

        if (!dataPedido || dataPedido instanceof Date === false) {
            throw new Error('Data do pedido não informada ou inválida na montagem do pedido');
        }

        if (!clienteId) {
            throw new Error('Cliente não informado na montagem do pedido');
        }

        if (!statusPedido) {
            throw new Error('Status do pedido não informado na montagem do pedido');
        }

        if (!statusPagamento) {
            throw new Error('Status do pagamento não informado na montagem do pedido');
        }

        this.dataPedido = dataPedido;
        this.clienteId = clienteId;
        this.statusPedido = statusPedido;
        this.statusPagamento = statusPagamento;
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    public getDataPedido(): Date {
        return this.dataPedido;
    }

    public getClienteId(): string {
        return this.clienteId;
    }

    public getStatusPedido(): StatusPedidoValueObject {
        return this.statusPedido;
    }

    public getStatusPagamento(): StatusPagamentoEnum {
        return this.statusPagamento;
    }

    public setStatusPedido(status: StatusPedidoValueObject): void {
        if (!status) {
            throw new Error('Status do pedido não informado');
        }

        if (status.getValue() === StatusPedidoEnum.CANCELADO) {
            const statusPermitidos = [
                StatusPedidoEnum.RASCUNHO,
                StatusPedidoEnum.EM_ABERTO,
                StatusPedidoEnum.AGUARDANDO_PAGAMENTO,
            ];

            if (!statusPermitidos.includes(this.statusPedido.getValue())) {
                throw new Error('Status do pedido não permite cancelamento');
            }

        }

        this.statusPedido = status;
    }
}