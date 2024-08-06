import express, { Request, Response } from "express";
import { BuscarProdutoPorIdUseCase } from "../../../../Core/Application/Usecase/Produtos/BuscaProdutoUsecase";
import { ProdutoRepositoryInterface } from "../../../../Core/Domain/Output/Repository/ProdutoRepositoryInterface";

export class BuscarProdutoEndpoint {

    private buscarProdutoPorIdUseCase: BuscarProdutoPorIdUseCase;

    public constructor(produtoRepository: ProdutoRepositoryInterface) {
        this.buscarProdutoPorIdUseCase = new BuscarProdutoPorIdUseCase(produtoRepository);
        this.handle = this.handle.bind(this);
    }

    public async handle(req: express.Request, res: express.Response): Promise<void> {
        try {
            const id_produto: string = req.params.id;


            if (!id_produto) {
                res.status(400).json({ mensagem: 'ID não informado', produto: null });
                return;
            }


            const produto = await this.buscarProdutoPorIdUseCase.execute(id_produto);


            if (produto) {
                res.status(200).json({
                    produto: {
                        id: produto.getId(),
                        nome: produto.getNome(),
                        preco: produto.getPreco(),
                        categoria: produto.getCategoria()
                    }
                });
            } else {
                res.status(404).json({ mensagem: 'Produto não encontrado', produto: null });
            }
        } catch (error) {

            res.status(500).json({ mensagem: 'Erro interno do servidor', produto: null });
        }
    }
}