import { ProdutoEntity } from "../../Entity/ProdutoEntity";
import { ProdutoGatewayInterface } from "../../Interfaces/Gateway/ProdutoGatewayInterface";

export class ListarProdutosUsecase {
  private produtoGateway: ProdutoGatewayInterface;

  constructor(produtoGateway: ProdutoGatewayInterface) {
    this.produtoGateway = produtoGateway;
  }

  public async execute(): Promise<ListarProdutosUsecaseResponse> {
    try {
      const lista_produtos: ProdutoEntity[] =
        await this.produtoGateway.listarProdutos();
      if (lista_produtos === undefined) {
        throw new Error("Erro: Não foi possível obter lista de produtos.");
      }

      return new ListarProdutosUsecaseResponse(
        `Sucesso. ${lista_produtos.length} produtos retornados.`,
        lista_produtos
      );
    } catch (error: any) {
      return new ListarProdutosUsecaseResponse(error.message, null);
    }
  }
}

export class ListarProdutosUsecaseResponse {
  private mensagem: string | null = null;
  private produtos: ProdutoEntity[] | null = null;

  constructor(message: string | null, produtos?: ProdutoEntity[] | null) {
    if (message) {
      this.mensagem = message;
    }

    this.produtos = produtos || null;
  }

  public getMensagem() {
    return this.mensagem;
  }

  public getProdutos() {
    return this.produtos;
  }
}
