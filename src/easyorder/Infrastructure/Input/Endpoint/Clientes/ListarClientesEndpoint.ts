import express from "express";
import { ListarClientesUsecase } from '../../../../Core/Application/Usecase/Clientes/ListarClientesUsecase';

import { ClienteRepositoryMock } from '../../../Output/Repository/ClienteRepositoryMock';
import { json } from "stream/consumers";

export class ListarClientesEndpoint {

    public static async handle(req: express.Request, res: express.Response): Promise<void> {

        /**
            #swagger.summary = 'Listar Cliente do Restaurante'
            #swagger.description = 'A listagem de cliente é uma função de administração, para uso de sistemas externos.'

        */

        // instanciando o Repositório Mock - TODO: refatorar para escolher o repositório de acordo com variáveis de ambiente
        const usecase = new ListarClientesUsecase(
            new ClienteRepositoryMock()
        );

        try { 

        const result = await usecase.execute();

        res.json({
            mensagem: result.getMensagem(),
            clientes: result.getClientes()?.map(cliente => {
                return ( {
                    id: cliente.getId(),
                    cpf: cliente.getCpf().getValue(),
                    nome: cliente.getNome(),
                    email: cliente.getEmail().getValue()
                } )
            })
        });

        }
        catch (error: any) {
            res.status(400).json({
                mensagem: error.message(),
            });
            return;
        }

    }

}