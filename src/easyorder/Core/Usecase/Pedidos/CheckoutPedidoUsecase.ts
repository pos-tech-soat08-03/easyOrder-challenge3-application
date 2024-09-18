import { PedidoEntity } from "../../Entity/PedidoEntity";
import { StatusPagamentoEnum } from "../../Entity/ValueObject/StatusPagamentoEnum";
import { StatusPedidoValueObject, StatusPedidoEnum } from "../../Entity/ValueObject/StatusPedidoValueObject";
import { PedidoRepositoryInterface } from "../../Repository/PedidoRepositoryInterface";

export class CheckoutPedidoUsecaseResponse {
    private sucesso_execucao: boolean;
    private mensagem: string;
    private pedido: PedidoEntity | null = null;

    constructor(sucesso_execucao: boolean, mensagem: string, pedido?: PedidoEntity | null) {
        this.sucesso_execucao = sucesso_execucao;
        this.mensagem = mensagem;
        this.pedido = pedido || null;
    }

    public getSucessoExecucao(): boolean {
        return this.sucesso_execucao;
    }

    public getMensagem(): string {
        return this.mensagem;
    }

    public getPedido(): PedidoEntity | null {
        return this.pedido;
    }
}

export class CheckoutPedidoUsecase {

    constructor(
        private readonly pedidoRepository: PedidoRepositoryInterface
    ) { }

    public async execute(pedidoId: string): Promise<CheckoutPedidoUsecaseResponse> {

        try {
            const pedido = await this.pedidoRepository.buscaPedidoPorId(pedidoId);

            if (!pedido) {
                throw new Error('Pedido não encontrado');
            }

            pedido.setStatusPedido(new StatusPedidoValueObject(StatusPedidoEnum.RECEBIDO));
            pedido.setStatusPagamento(StatusPagamentoEnum.PAGO);

            const pedidoSalvo = await this.pedidoRepository.salvarPedido(pedido)

            if (!pedidoSalvo) {
                throw new Error('Erro ao salvar pedido');
            }

            return new CheckoutPedidoUsecaseResponse(true, 'Pedido fechado com sucesso', pedidoSalvo);
        } catch (error: any) {
            return new CheckoutPedidoUsecaseResponse(false, error.message);
        }
    }

}