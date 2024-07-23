import express from 'express';
import { ListaGenericaUsecase } from '../../../../Core/Application/Usecase/Exemplo/ListaGenericaUsecase';
import { ExemploRepositoryMock } from '../../../Output/Repository/ExemploRepositoryMock';
import { EmailServiceMock } from '../../../Output/Service/EmailServiceMock';

export class ListaGenericaEndpoint {

    public static async handle(request: express.Request, response: express.Response) {

        const usecase = new ListaGenericaUsecase(
            new ExemploRepositoryMock([
                '1',
                '2',
                '3',
            ]),
            new EmailServiceMock(),
        );

        const result = await usecase.execute();

        response.json({
            status: true,
            lista: result,
        });
    }

}