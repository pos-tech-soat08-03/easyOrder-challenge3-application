
import { PedidoComboEntity } from "../../../Domain/Entity/PedidoComboEntity";
import { PedidoEntity } from "../../../Domain/Entity/PedidoEntity";
import { PedidoRepositoryInterface } from "../../../Domain/Output/Repository/PedidoRepositoryInterface";
import { StatusPedidoEnum, StatusPedidoValueObject } from "../../../Domain/ValueObject/StatusPedidoValueObject";

export class AdicionarComboAoPedidoUsecaseResponse {
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

export class AdicionarComboAoPedidoUsecase {

    constructor(
        private readonly pedidoRepository: PedidoRepositoryInterface
    ) { }

    public async execute(
        pedidoId: string,
        lancheId: string | null,
        bebidaId: string | null,
        sobremesaId: string | null,
        acompanhamentoId: string | null
    ): Promise<AdicionarComboAoPedidoUsecaseResponse> {

        try {

            const pedidoCombo = new PedidoComboEntity(
                lancheId,
                bebidaId,
                sobremesaId,
                acompanhamentoId,
            );

            const pedido = await this.pedidoRepository.buscaPedidoPorId(pedidoId);

            if (!pedido) {
                throw new Error('Pedido não encontrado');
            }

            pedido.adicionarCombos([pedidoCombo]);

            await this.pedidoRepository.salvarPedido(pedido);

            return new AdicionarComboAoPedidoUsecaseResponse(true, 'Combo adicionado com sucesso');
        } catch (error: any) {
            return new AdicionarComboAoPedidoUsecaseResponse(false, error.message);
        }

    }
}