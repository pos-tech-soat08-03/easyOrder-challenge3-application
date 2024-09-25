import { ProdutoEntity } from "../../Entity/ProdutoEntity";
import { CategoriaEnum } from "../../Entity/ValueObject/CategoriaEnum";
import { ProdutoGatewayInterface } from "../../Gateway/ProdutoGatewayInterface";

export class CadastrarProdutoUsecase {
  constructor(private readonly produtoGateway: ProdutoGatewayInterface) {}

  public async execute(
    nome: string,
    descricao: string,
    preco: number,
    categoria: CategoriaEnum,
    imagemURL: string
  ): Promise<CadastrarProdutoUsecaseResponse> {
    try {
      const produto = new ProdutoEntity(
        nome,
        descricao,
        preco,
        categoria,
        imagemURL
      );
      await this.produtoGateway.salvarProduto(produto);

      return new CadastrarProdutoUsecaseResponse(
        true,
        "Produto cadastrado com sucesso",
        produto
      );
    } catch (error: any) {
      return new CadastrarProdutoUsecaseResponse(false, error.message);
    }
  }
}

export class CadastrarProdutoUsecaseResponse {
  private sucesso_cadastro: boolean;
  private mensagem: string | null = null;
  private produto: ProdutoEntity | null = null;

  constructor(
    sucesso_cadastro: boolean,
    message: string | null,
    produto?: ProdutoEntity | null
  ) {
    this.sucesso_cadastro = sucesso_cadastro;

    if (message) {
      this.mensagem = message;
    }

    this.produto = produto || null;
  }

  public getSucessoCadastro() {
    return this.sucesso_cadastro;
  }

  public getMensagem() {
    return this.mensagem;
  }

  public getProduto() {
    return this.produto;
  }
}
