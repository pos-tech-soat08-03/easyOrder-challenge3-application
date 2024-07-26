import express from "express";
import { CadastrarClienteUsecase } from '../../../../Core/Application/Usecase/Clientes/CadastrarClienteUsecase'; 
import { ClienteRepositoryMock } from '../../../Output/Repository/ClienteRepositoryMock'; 

export class CadastrarClienteEndpoint {

    public static async handle (request: express.Request, response: express.Response) {

        const usecase = new CadastrarClienteUsecase (
            new ClienteRepositoryMock ()
        );

        const result_mock = await usecase.execute('123.456.789-00', 'Teste Nome', 'email@exemplo.com');
        response.json({
            mensagem: result_mock.getClienteResponse(),
            resultado: result_mock
        });

    }


}