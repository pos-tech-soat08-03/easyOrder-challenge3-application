import { ProdutoEntity } from "../../Entity/ProdutoEntity";
import { ProdutoGatewayInterface } from "../../Interfaces/Gateway/ProdutoGatewayInterface";

export class BuscarProdutoPorIdUseCase {
  private produtoGateway: ProdutoGatewayInterface;

  constructor(produtoGateway: ProdutoGatewayInterface) {
    this.produtoGateway = produtoGateway;
  }

  public async execute(id: string): Promise<ProdutoEntity | null> {
    try {
      if (!id) {
        throw new Error("ID inválido");
      }

      const produto = await this.produtoGateway.buscarProdutoPorId(id);

      if (!produto) {
        return null;
      }

      return produto;
    } catch (error) {
      throw error;
    }
  }
}
