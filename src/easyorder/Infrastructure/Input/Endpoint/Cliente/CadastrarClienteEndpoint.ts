import express from "express";

import { CadastrarClienteUsecase } from '../../../../Core/Application/Usecase/Clientes/CadastrarClienteUsecase'; 
import { ClienteRepositoryMock } from '../../../Output/Repository/ClienteRepositoryMock'; 

export class CadastrarClienteEndpoint {

    public static async handle (req: express.Request, res: express.Response): Promise<void> {

        const usecase = new CadastrarClienteUsecase (
            new ClienteRepositoryMock ()
        );

        
        if (req.body === undefined || Object.keys(req.body).length === 0) {
            res.status(400).json({ error: 'Nenhum dado enviado.' });
            return;
        }

        // refatorar adicionando a logica de validação dos dados do request
        
        const { cpf, nome, email } = req.body;
        const result_mock = await usecase.execute(cpf, nome, email);

        res.json({
            resultado_cadastro: result_mock.getSucessoCadastro(),
            cliente_existente: result_mock.getClienteExistente(),
            cliente: result_mock.getClienteResponse() // refatorar para um retorno mais adequado
        });

    }


}