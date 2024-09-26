import { PedidoEntity } from "../../../Entity/PedidoEntity";
import {
  StatusPedidoValueObject,
  StatusPedidoEnum,
} from "../../../Entity/ValueObject/StatusPedidoValueObject";
import {
  PedidoGatewayInterface,
  PedidoGatewayInterfaceFilterOrderField,
  PedidoGatewayInterfaceFilterOrderDirection,
} from "../../../Gateway/PedidoGatewayInterface";

export class BuscaProximoPedidoParaPreparacaoUsecaseResponse {
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

export class BuscaProximoPedidoParaPreparacaoUsecase {
  constructor(private readonly pedidoGateway: PedidoGatewayInterface) {}

  public async execute(): Promise<BuscaProximoPedidoParaPreparacaoUsecaseResponse> {
    try {
      const pedidos = await this.pedidoGateway.listarPedidosPorStatus(
        new StatusPedidoValueObject(StatusPedidoEnum.RECEBIDO),
        {
          page: 1,
          limit: 1,
          orderField: PedidoGatewayInterfaceFilterOrderField.DATA_CADASTRO,
          orderDirection: PedidoGatewayInterfaceFilterOrderDirection.ASC,
        }
      );

      if (!pedidos) {
        throw new Error("Erro ao listar pedidos");
      }

      if (!pedidos.length) {
        return new BuscaProximoPedidoParaPreparacaoUsecaseResponse(
          "Nenhum pedido encontrado"
        );
      }

      return new BuscaProximoPedidoParaPreparacaoUsecaseResponse(
        "Pedido encontrado",
        pedidos[0]
      );
    } catch (error: any) {
      return new BuscaProximoPedidoParaPreparacaoUsecaseResponse(error.message);
    }
  }
}
