import express, { Request, Response } from 'express';
import { CategoriaRepositoryMock } from '../../../Output/Repository/CategoriaRepositoryMock';
import { ListarCategoriasUsecase } from '../../../../Core/Application/Usecase/Produtos/ListarCategoriasUsecase';


export class ListaCategoriasEndpoint {

    public constructor(
        private listaCategoriasUsecaseMock: CategoriaRepositoryMock
    ) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: Request, res: Response): Promise<void> {
        const listaCategoriasUsecase = new ListarCategoriasUsecase();

        try {
            const result = await listaCategoriasUsecase.execute(req.body);

            if (result.categorias.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ categorias: [], mensagem: 'Nenhum item foi encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ categorias: [], mensagem: 'Ocorreu um erro ao listar as categorias.' });
        }
    }

}