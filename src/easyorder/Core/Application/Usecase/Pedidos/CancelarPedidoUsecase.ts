import { PedidoEntity } from "../../../Domain/Entity/PedidoEntity";
import { PedidoRepositoryInterface } from "../../../Domain/Output/Repository/PedidoRepositoryInterface";
import { StatusPedidoEnum, StatusPedidoValueObject } from "../../../Domain/ValueObject/StatusPedidoValueObject";

export class CancelarPedidoUsecaseResponse {
    private sucesso_cancelamento: boolean;
    private mensagem: string;
    private pedido: PedidoEntity | null = null;

    constructor(sucesso_cancelamento: boolean, mensagem: string, pedido?: PedidoEntity | null) {
        this.sucesso_cancelamento = sucesso_cancelamento;
        this.mensagem = mensagem;
        this.pedido = pedido || null;
    }

    public getSucessoCancelamento(): boolean {
        return this.sucesso_cancelamento;
    }

    public getMensagem(): string {
        return this.mensagem;
    }

    public getPedido(): PedidoEntity | null {
        return this.pedido;
    }
}

export class CancelarPedidoUsecase {

    constructor(
        private readonly pedidoRepository: PedidoRepositoryInterface
    ) { }

    public async execute(pedidoId: string): Promise<CancelarPedidoUsecaseResponse> {

        try {
            const pedido = this.pedidoRepository.buscaPedidoPorId(pedidoId);

            if (!pedido) {
                throw new Error('Pedido não encontrado');
            }

            pedido.setStatusPedido(new StatusPedidoValueObject(StatusPedidoEnum.CANCELADO));

            const pedidoSalvo = this.pedidoRepository.salvarPedido(pedido)

            if (!pedidoSalvo) {
                throw new Error('Erro ao salvar pedido');
            }

            return new CancelarPedidoUsecaseResponse(true, 'Pedido cadastrado com sucesso', pedidoSalvo);
        } catch (error: any) {
            return new CancelarPedidoUsecaseResponse(false, error.message);
        }
    }

}