import express from "express";
import { ProdutoEntity } from "../../../Domain/Entity/ProdutoEntity";
import { ProdutoRepositoryInterface } from "../../../Domain/Output/Repository/ProdutoRepositoryInterface";
import { CategoriaEnum } from "../../../Domain/ValueObject/CategoriaEnum";

export class BuscarProdutoPorIdUseCase {
    private produtoRepository: ProdutoRepositoryInterface;

    constructor(produtoRepository: ProdutoRepositoryInterface) {
        this.produtoRepository = produtoRepository;
    }

    public async execute(id: string): Promise<ProdutoEntity | null> {
        try {
            if (!id) {
                throw new Error("ID inválido");
            }
            const produto = this.produtoRepository.buscarProdutoPorId(id);
            if (!produto) {
                throw new Error(`Produto com ID ${id} não encontrado`);
            }
            return produto;
        } catch (error) {

            throw error;
        }
    }
}



export class BuscaProdutoUsecase {
    private produtoRepository: ProdutoRepositoryInterface;

    constructor(produtoRepository: ProdutoRepositoryInterface) {
        this.produtoRepository = produtoRepository;
    }

    public async execute(categoria: CategoriaEnum): Promise<ProdutoEntity[]> {
        try {
            if (!Object.values(CategoriaEnum).includes(categoria)) {
                throw new Error(`Categoria ${categoria} não encontrada`);
            }
            const produtos = await this.produtoRepository.listarProdutoCategoria(categoria);
            if (produtos.length === 0) {
                throw new Error(`Nenhum produto encontrado para a categoria ${categoria}`);
            }
            return produtos;
        } catch (error) {

            throw error;
        }
    }
}