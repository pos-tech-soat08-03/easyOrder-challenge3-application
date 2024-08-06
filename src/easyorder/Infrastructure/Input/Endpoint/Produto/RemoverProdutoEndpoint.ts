import express from 'express';
import { Request, Response } from 'express';
import { RemoverProdutoUsecase } from '../../../../Core/Application/Usecase/Produtos/RemoverProdutosUseCase';
import { ProdutoRepositoryInterface } from '../../../../Core/Domain/Output/Repository/ProdutoRepositoryInterface';

export class RemoverProdutoEndpoint {

    public constructor(private produtoRepository: ProdutoRepositoryInterface) {
        this.handle = this.handle.bind(this);
    }


    public async handle(req: Request, res: Response): Promise<void> {
        const removerProdutoUsecase = new RemoverProdutoUsecase(this.produtoRepository);

        const id = req.params.id as string;

        try {
            const result = await removerProdutoUsecase.execute({ id });

            if (req.body.id === id) {
                res.status(200).json({ sucesso: true, mensagem: `Produto com ID ${id} removido com sucesso.` });
            } else {
                // Atualizacao na mensagem de erro
                res.status(404).json({ sucesso: false, mensagem: 'Erro na remoção do produto.' });
            }
        } catch (error) {
            // Em caso de erro inesperado, enviar um erro genérico
            res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro inesperado.' });
        }
    }

}
