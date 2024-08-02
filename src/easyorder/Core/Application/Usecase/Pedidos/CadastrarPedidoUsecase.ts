import { PedidoEntity } from "../../../Domain/Entity/PedidoEntity";
import { PedidoRepositoryInterface } from "../../../Domain/Output/Repository/PedidoRepositoryInterface";

export class CadastrarPedidoUsecaseResponse {
    private sucesso_cadastro: boolean;
    private mensagem: string;
    private pedido: PedidoEntity | null = null;

    constructor(sucesso_cadastro: boolean, mensagem: string, pedido?: PedidoEntity | null) {
        this.sucesso_cadastro = sucesso_cadastro;
        this.mensagem = mensagem;
        this.pedido = pedido || null;
    }

    public getSucessoCadastro(): boolean {
        return this.sucesso_cadastro;
    }

    public getMensagem(): string {
        return this.mensagem;
    }

    public getPedido(): PedidoEntity | null {
        return this.pedido;
    }
}

export class CadastrarPedidoUsecase {

    constructor(
        private readonly pedidoRepository: PedidoRepositoryInterface
    ) { }

    public async execute(clientId: string): Promise<CadastrarPedidoUsecaseResponse> {

        try {
            const pedido = new PedidoEntity(clientId);

            const pedidoSalvo = await this.pedidoRepository.salvarPedido(pedido)

            if (!pedidoSalvo) {
                throw new Error('Erro ao salvar pedido');
            }

            return new CadastrarPedidoUsecaseResponse(true, 'Pedido cadastrado com sucesso', pedidoSalvo);
        } catch (error: any) {
            return new CadastrarPedidoUsecaseResponse(false, error.message);
        }
    }

}