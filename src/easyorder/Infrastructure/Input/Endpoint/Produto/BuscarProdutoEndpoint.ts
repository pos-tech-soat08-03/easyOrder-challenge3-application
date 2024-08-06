import express, { Request, Response } from "express";
import { BuscaProdutoUsecase, BuscarProdutoPorIdUseCase } from "../../../../Core/Application/Usecase/Produtos/BuscaProdutoUsecase";
import { ProdutoRepositoryInterface } from "../../../../Core/Domain/Output/Repository/ProdutoRepositoryInterface";
import { CategoriaEnum } from "../../../../Core/Domain/ValueObject/CategoriaEnum";

export class BuscarProdutoEndpoint {

    public constructor(
        private produtoRepository: ProdutoRepositoryInterface) {
        this.handle = this.handle.bind(this);
    }


    public async handle(req: Request, res: Response): Promise<void> {
        /**
            #swagger.summary = 'Buscar um produto específico'
            #swagger.description = 'Endpoint para buscar um produto especifico no catalogo'
        */

        const buscaPorIdUseCase = new BuscarProdutoPorIdUseCase(this.produtoRepository);


        try {
            const result = await buscaPorIdUseCase.execute(req.body);

            if (result !== null) {

            }
            if (req.body.id === result!.getId()) {
                res.status(200).json(result);
            } else {

                res.status(404).json({ sucesso: false, mensagem: 'Erro ao localizar o ID do produto.' });
            }

        } catch (error) {
            res.status(500).json({ id: [], mensagem: 'Erro ao buscar o ID.' });

            const buscaPorCategoriaUsecase = new BuscaProdutoUsecase(this.produtoRepository);


            try {

                const result = await buscaPorCategoriaUsecase.execute(req.body);

                if (req.body.categoria !== 0) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ categorias: [], mensagem: 'Erro ao buscar categoria de produto.' });
                }

            } catch (error) {
                res.status(500).json({ categorias: [], mensagem: 'Ocorreu um erro ao buscar as categorias.' });

            }
        }
    }

}