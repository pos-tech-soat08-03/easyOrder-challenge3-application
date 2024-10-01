import { PedidoComboEntity } from "../../Entity/PedidoComboEntity";
import { PedidoEntity } from "../../Entity/PedidoEntity";
import { CategoriaEnum } from "../../Entity/ValueObject/CategoriaEnum";
import { PedidoGatewayInterface } from "../../Interfaces/Gateway/PedidoGatewayInterface";
import { ProdutoGatewayInterface } from "../../Interfaces/Gateway/ProdutoGatewayInterface";

export class AdicionarComboAoPedidoUsecaseResponse {
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

export class AdicionarComboAoPedidoUsecase {
  constructor(
    private readonly pedidoGateway: PedidoGatewayInterface,
    private readonly produtoGateway: ProdutoGatewayInterface
  ) {}

  public async execute(
    pedidoId: string,
    lancheId: string | null,
    bebidaId: string | null,
    sobremesaId: string | null,
    acompanhamentoId: string | null
  ): Promise<AdicionarComboAoPedidoUsecaseResponse> {
    try {
      let produtoLanche = null;
      if (lancheId) {
        produtoLanche = await this.produtoGateway.buscarProdutoPorId(lancheId);

        if (!produtoLanche) {
          throw new Error("Lanche informado não encontrado");
        }

        // RN3. Quando adicionar um produto ao combo, devemos verificar se o tipo do produto informado corresponde ao tipo de produto solicitando a inserção no combo
        if (produtoLanche.getCategoria() !== CategoriaEnum.LANCHE) {
          throw new Error("Produto informado não é um lanche");
        }
      }

      let produtoBebida = null;
      if (bebidaId) {
        produtoBebida = await this.produtoGateway.buscarProdutoPorId(bebidaId);

        if (!produtoBebida) {
          throw new Error("Bebida informada não encontrada");
        }

        // RN3. Quando adicionar um produto ao combo, devemos verificar se o tipo do produto informado corresponde ao tipo de produto solicitando a inserção no combo
        if (produtoBebida.getCategoria() !== CategoriaEnum.BEBIDA) {
          throw new Error("Produto informado não é uma bebida");
        }
      }

      let produtoSobremesa = null;
      if (sobremesaId) {
        produtoSobremesa = await this.produtoGateway.buscarProdutoPorId(
          sobremesaId
        );

        if (!produtoSobremesa) {
          throw new Error("Sobremesa informada não encontrada");
        }

        // RN3. Quando adicionar um produto ao combo, devemos verificar se o tipo do produto informado corresponde ao tipo de produto solicitando a inserção no combo
        if (produtoSobremesa.getCategoria() !== CategoriaEnum.SOBREMESA) {
          throw new Error("Produto informado não é uma sobremesa");
        }
      }

      let produtoAcompanhamento = null;
      if (acompanhamentoId) {
        produtoAcompanhamento = await this.produtoGateway.buscarProdutoPorId(
          acompanhamentoId
        );

        if (!produtoAcompanhamento) {
          throw new Error("Acompanhamento informado não encontrado");
        }

        // RN3. Quando adicionar um produto ao combo, devemos verificar se o tipo do produto informado corresponde ao tipo de produto solicitando a inserção no combo
        if (
          produtoAcompanhamento.getCategoria() !== CategoriaEnum.ACOMPANHAMENTO
        ) {
          throw new Error("Produto informado não é um acompanhamento");
        }
      }

      const pedidoCombo = new PedidoComboEntity(
        produtoLanche,
        produtoBebida,
        produtoSobremesa,
        produtoAcompanhamento
      );

      const pedido = await this.pedidoGateway.buscaPedidoPorId(pedidoId);

      if (!pedido) {
        throw new Error("Pedido não encontrado");
      }

      pedido.adicionarCombos([pedidoCombo]);

      await this.pedidoGateway.salvarPedido(pedido);

      const pedidoSalvo = await this.pedidoGateway.buscaPedidoPorId(pedidoId);

      return new AdicionarComboAoPedidoUsecaseResponse(
        true,
        "Combo adicionado com sucesso",
        pedidoSalvo
      );
    } catch (error: any) {
      return new AdicionarComboAoPedidoUsecaseResponse(false, error.message);
    }
  }
}
