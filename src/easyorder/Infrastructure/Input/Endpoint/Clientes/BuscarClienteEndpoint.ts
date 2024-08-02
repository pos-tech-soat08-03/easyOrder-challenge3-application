import express from "express";
import { BuscarClienteUsecase } from '../../../../Core/Application/Usecase/Clientes/BuscarClienteUsecase';
import { ClienteRepositoryInterface } from "../../../../Core/Domain/Output/Repository/ClienteRepositoryInterface";

export class BuscarClienteEndpoint {

    constructor(
        private clienteRepository: ClienteRepositoryInterface
    ) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: express.Request, res: express.Response): Promise<void> {

        /**
            #swagger.summary = 'Buscar/Identificar Cliente do Restaurante por CPF'
            #swagger.description = 'A busca de Cliente por CPF permite que o Cliente seja identificado para próximas etapas na sua jornada.
            #swagger.tags = ['Clientes']
        */

        // instanciando o Repositório Mock - TODO: refatorar para escolher o repositório de acordo com variáveis de ambiente
        const usecase = new BuscarClienteUsecase(
            this.clienteRepository
        );

        try { 

            if (req.body === undefined || Object.keys(req.body).length === 0) {
                throw new Error('Nenhum dado informado.');
            }
    
            const cpf = req.body.cpf;

            const result = await usecase.execute(cpf);

            res.json({
                mensagem: result.getMensagem(),
                cliente: result.getCliente() ? {
                    id: result.getCliente()?.getId(),
                    cpf: result.getCliente()?.getCpf().getValue(),
                    nome: result.getCliente()?.getNome(),
                    email: result.getCliente()?.getEmail().getValue()
                } : null
            });

        }
        catch (error: any) {
            res.status(400).json({
                mensagem: error.message,
                cliente: null
            });
            return;
        }

    }

}