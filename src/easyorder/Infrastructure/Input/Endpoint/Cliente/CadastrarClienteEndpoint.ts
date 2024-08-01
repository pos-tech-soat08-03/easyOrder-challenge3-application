import express from "express";
import { CadastrarClienteUsecase } from '../../../../Core/Application/Usecase/Clientes/CadastrarClienteUsecase';
import { ClienteRepositoryMock } from '../../../Output/Repository/ClienteRepositoryMock';

export class CadastrarClienteEndpoint {

    public static async handle(req: express.Request, res: express.Response): Promise<void> {

        /**
            #swagger.summary = 'Cadastrar novo cliente'
            #swagger.description = 'Endpoint para cadastro de novo cliente para posterior identificação em pedidos e uso em campanhas de marketing'
        */

        const usecase = new CadastrarClienteUsecase(
            new ClienteRepositoryMock()
        );

        if (req.body === undefined || Object.keys(req.body).length === 0) {
            res.status(400).json({
                resultado_cadastro: false,
                mensagem: 'Nenhum dado enviado.',
                cliente: null
            });
            return;
        }

        // refatorar adicionando a logica de validação dos dados do request
        const { cpf, nome, email } = req.body;
        const result = await usecase.execute(cpf, nome, email);

        res.json({
            resultado_cadastro: result.getSucessoCadastro(),
            mensagem: result.getMensagem(),
            cliente: result.getSucessoCadastro() ? {
                id: result.getCliente()?.getId(),
                nome: result.getCliente()?.getNome(),
                cpf: result.getCliente()?.getCpf().getValue(),
                email: result.getCliente()?.getEmail().getValue()
            } : null
        });

    }

}