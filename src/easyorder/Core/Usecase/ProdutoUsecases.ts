import { ProdutoEntity } from "../Entity/ProdutoEntity";
import { CategoriaEnum } from "../Entity/ValueObject/CategoriaEnum";
import { ProdutoGatewayInterface } from "../Interfaces/Gateway/ProdutoGatewayInterface";

export class ProdutoUsesCases {
    public static async listarProdutosUsecase(produtoGateway: ProdutoGatewayInterface): Promise<{ produtos: ProdutoEntity[] | undefined, mensagem: string }> {
        const produtos = await produtoGateway.listarProdutos();
        if (produtos === undefined) {
            return { produtos: undefined, mensagem: "Não foram encontrados produtos." };
        }
        return { produtos, mensagem: `Sucesso. ${produtos.length} produto(s) retornado(s).` };
    }

    public static async listarProdutosPorCategoriaUsecase(produtoGateway: ProdutoGatewayInterface, categoria: CategoriaEnum): Promise<{ produtos: ProdutoEntity[] | undefined, mensagem: string }> {
        const produtos = await produtoGateway.listarProdutoCategoria(categoria);
        if (produtos === undefined) {
            return { produtos: undefined, mensagem: "Não foram encontrados produtos." };
        }
        return { produtos, mensagem: `Sucesso. ${produtos.length} produto(s) da categoria ${categoria} retornado(s).` };
    }

    public static async salvarProdutoUsecase(produtoGateway: ProdutoGatewayInterface, nome: string, descricao: string, preco: number, categoria: CategoriaEnum, imagemURL: string): Promise<{ produto: ProdutoEntity | undefined, mensagem: string }> {
        const produtoNovo = new ProdutoEntity(nome, descricao, preco, categoria, imagemURL);
        const produto = await produtoGateway.salvarProduto(produtoNovo);
        if (produto === undefined) {
            return { produto: undefined, mensagem: "Erro ao salvar o produto." };
        } else {
            return { produto, mensagem: "Sucesso ao salvar o produto." };
        }
    }

    public static async buscarProdutoPorIdUsecase(produtoGateway: ProdutoGatewayInterface, id: string): Promise<{ produto: ProdutoEntity | undefined, mensagem: string }> {
        const produto = await produtoGateway.buscarProdutoPorId(id);
        if (produto === undefined) {
            return { produto: undefined, mensagem: "Produto não encontrado." };
        }
        return { produto, mensagem: "Sucesso ao buscar o produto." };
    }

    public static async removerProdutoPorIdUsecase(produtoGateway: ProdutoGatewayInterface, id: string): Promise<{ produtoRemovido: ProdutoEntity | undefined, mensagem: string }> {
        const produtoRemovido = await produtoGateway.removerPorId(id);
        if (produtoRemovido === undefined) {
            return { produtoRemovido: undefined, mensagem: "Produto não encontrado." };
        }
        return { produtoRemovido, mensagem: "Sucesso ao remover o produto." };
    }

    public static async atualizarProdutoUsecase(produtoGateway: ProdutoGatewayInterface, id: string, nome: string, descricao: string, preco: number, categoria: CategoriaEnum, imagemURL: string): Promise<{ produto: ProdutoEntity | undefined, mensagem: string }> {
        const produto = await produtoGateway.buscarProdutoPorId(id);
        if (produto === undefined) {
            return { produto, mensagem: "Produto não encontrado." }
        } else {
            const produto = new ProdutoEntity(nome, descricao, preco, categoria, imagemURL, id);

            return { produto, mensagem: "Sucesso ao atualizar o produto." };
        }

    }

}