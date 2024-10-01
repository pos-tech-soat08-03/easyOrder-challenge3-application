import { PedidoEntity } from "../../Entity/PedidoEntity";
import { PedidoGatewayInterface } from "../../Interfaces/Gateway/PedidoGatewayInterface";

export class BuscaPedidoPorIdUsecaseResponse {
  private mensagem: string;
  private pedido?: PedidoEntity;

  constructor(mensagem: string, pedido?: PedidoEntity) {
    this.mensagem = mensagem;
    this.pedido = pedido;
  }

  public getMensagem(): string {
    return this.mensagem;
  }

  public getPedido(): PedidoEntity | undefined {
    return this.pedido;
  }
}

export class BuscaPedidoPorIdUsecase {
  constructor(private readonly pedidoGateway: PedidoGatewayInterface) {}

  public async execute(
    pedidoId: string
  ): Promise<BuscaPedidoPorIdUsecaseResponse> {
    try {
      const pedido = await this.pedidoGateway.buscaPedidoPorId(pedidoId);

      if (!pedido) {
        return new BuscaPedidoPorIdUsecaseResponse("Nenhum pedido encontrado");
      }

      return new BuscaPedidoPorIdUsecaseResponse("Pedido encontrado", pedido);
    } catch (error: any) {
      return new BuscaPedidoPorIdUsecaseResponse(error.message);
    }
  }
}
