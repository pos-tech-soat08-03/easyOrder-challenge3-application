import { ProdutoGatewayInterface } from "../../Interfaces/Gateway/ProdutoGatewayInterface";
import { RemoverProdutoUsecaseInput, RemoverProdutoUsecaseOutput } from "../../Interfaces/Gateway/RemoverProdutoGatewayInterface";

export class RemoverProdutoUsecase {
  private produtoGateway: ProdutoGatewayInterface;

  constructor(produtoGateway: ProdutoGatewayInterface) {
    this.produtoGateway = produtoGateway;
  }

  public async execute(
    input: RemoverProdutoUsecaseInput
  ): Promise<RemoverProdutoUsecaseOutput> {
    try {
      const produtoExistente = await this.produtoGateway.buscarProdutoPorId(
        input.id
      );

      if (!produtoExistente) {
        return { sucesso: false, mensagem: "O produto não foi encontrado." };
      }

      await this.produtoGateway.removerPorId(input.id);

      return { sucesso: true };
    } catch (error) {
      console.error("Erro ao remover o produto:", error);
      return {
        sucesso: false,
        mensagem: "Ocorreu um erro ao remover o produto.",
      };
    }
  }
}
