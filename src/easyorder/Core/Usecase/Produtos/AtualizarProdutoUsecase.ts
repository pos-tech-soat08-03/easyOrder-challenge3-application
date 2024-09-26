import { ProdutoEntity } from "../../Entity/ProdutoEntity";
import { CategoriaEnum } from "../../Entity/ValueObject/CategoriaEnum";
import { ProdutoGatewayInterface } from "../../Gateway/ProdutoGatewayInterface";

export class AtualizarProdutoUsecase {
  constructor(private readonly produtoGateway: ProdutoGatewayInterface) {}

  public async execute(
    nome: string | undefined,
    descricao: string | undefined,
    preco: number | undefined,
    categoria: CategoriaEnum | undefined,
    imagemURL: string | undefined,
    id: string
  ): Promise<AtualizarProdutoUsecaseResponse> {
    try {
      const produtoExistente = await this.produtoGateway.buscarProdutoPorId(id);
      if (!produtoExistente) {
        throw new Error("Produto não encontrada, id: " + id);
      }

      const produto = new ProdutoEntity(
        nome || produtoExistente.getNome(),
        descricao || produtoExistente.getDescricao(),
        preco || produtoExistente.getPreco(),
        categoria || produtoExistente.getCategoria(),
        imagemURL || produtoExistente.getImagemURL(),
        produtoExistente.getId()
      );

      this.produtoGateway.salvarProduto(produto);

      return new AtualizarProdutoUsecaseResponse(
        true,
        "Produto atualizado com sucesso",
        produto
      );
    } catch (error: any) {
      return new AtualizarProdutoUsecaseResponse(false, error.message);
    }
  }
}

export class AtualizarProdutoUsecaseResponse {
  private sucesso_atualizar: boolean;
  private mensagem: string | null = null;
  private produto: ProdutoEntity | null = null;

  constructor(
    sucesso_cadastro: boolean,
    message: string | null,
    produto?: ProdutoEntity | null
  ) {
    this.sucesso_atualizar = sucesso_cadastro;

    if (message) {
      this.mensagem = message;
    }

    this.produto = produto || null;
  }

  public getSucessoCadastro() {
    return this.sucesso_atualizar;
  }

  public getMensagem() {
    return this.mensagem;
  }

  public getProduto() {
    return this.produto;
  }
}
