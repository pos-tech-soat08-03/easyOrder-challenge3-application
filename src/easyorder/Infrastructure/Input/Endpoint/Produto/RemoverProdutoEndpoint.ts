import express from 'express';
import { Request, Response } from 'express';
import { RemoverProdutoUsecase } from '../../../../Core/Application/Usecase/Produtos/RemoverProdutosUseCase';
import { RemoverProdutoRepositoryMock } from '../../../Output/Repository/RemoverProdutoRepositoryMock';

export class RemoverProdutoEndpoint {
    private static removerProdutoUsecase = new RemoverProdutoUsecase(new RemoverProdutoRepositoryMock());

    public static async handle(req: Request, res: Response): Promise<void> {
        const id = req.params.id as string;

        try {
            const result = await this.removerProdutoUsecase.execute({ id });

            if (req.body.id === id) {
                res.status(200).json({ sucesso: true, mensagem: `Produto com ID ${id} removido com sucesso.` });
            } else {
                res.status(404).json({ sucesso: false, mensagem: 'Erro'});
            }
        } catch (error) {
            // Em caso de erro inesperado, enviar um erro genérico
            res.status(500).json({ sucesso: false, mensagem: 'Ocorreu um erro inesperado.' });
        }
    }

}
