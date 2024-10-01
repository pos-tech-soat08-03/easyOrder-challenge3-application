import { PedidoEntity } from "../../Entity/PedidoEntity";
import { PedidoGatewayInterface } from "../../Interfaces/Gateway/PedidoGatewayInterface";

export class RemoverComboDoPedidoUsecaseResponse {
  private sucesso_execucao: boolean;
  private mensagem: string;
  private pedido: PedidoEntity | null = null;

  constructor(
    sucesso_execucao: boolean,
    mensagem: string,
    pedido?: PedidoEntity | null
  ) {
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

export class RemoverComboDoPedidoUsecase {
  constructor(private readonly pedidoGateway: PedidoGatewayInterface) {}

  public async execute(
    pedidoId: string,
    comboId: string
  ): Promise<RemoverComboDoPedidoUsecaseResponse> {
    try {
      const pedido = await this.pedidoGateway.buscaPedidoPorId(pedidoId);

      if (!pedido) {
        throw new Error("Pedido não encontrado");
      }

      pedido.removerCombo(comboId);

      await this.pedidoGateway.salvarPedido(pedido);

      const pedidoSalvo = await this.pedidoGateway.buscaPedidoPorId(pedidoId);

      return new RemoverComboDoPedidoUsecaseResponse(
        true,
        "Combo removido com sucesso",
        pedidoSalvo
      );
    } catch (error: any) {
      return new RemoverComboDoPedidoUsecaseResponse(false, error.message);
    }
  }
}
