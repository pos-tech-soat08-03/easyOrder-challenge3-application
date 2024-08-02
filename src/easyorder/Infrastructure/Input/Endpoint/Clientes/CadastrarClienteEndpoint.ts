import express from "express";
import { CadastrarClienteUsecase } from '../../../../Core/Application/Usecase/Clientes/CadastrarClienteUsecase';
import { ClienteRepositoryInterface } from "../../../../Core/Domain/Output/Repository/ClienteRepositoryInterface";

export class CadastrarClienteEndpoint {

    constructor(
        private clienteRepository: ClienteRepositoryInterface
    ) {
        this.handle = this.handle.bind(this);
    }

    public async handle(req: express.Request, res: express.Response): Promise<void> {

        /**
            #swagger.summary = 'Cadastrar novo Cliente'
            #swagger.description = 'O cadastro Clientes é utilizado para inserir as informações básicas de um novo Cliente no Sistema do Restaurante.
                O cadastro irá permitir a posterior identificação do Cliente e a utilização dos dados por sistemas externos de Marketing.'
            #swagger.tags = ['Clientes']
        */

        // instanciando o Repositório Mock - TODO: refatorar para escolher o repositório de acordo com variáveis de ambiente
        const usecase = new CadastrarClienteUsecase(
            this.clienteRepository
        );


        try { 

            if (req.body === undefined || Object.keys(req.body).length === 0) {
                throw new Error('Nenhum dado informado.');
            }
    
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
        catch (error: any) {
            res.status(400).json({
                resultado_cadastro: false,
                mensagem: error.message,
                cliente: null
            });
            return;
        }

    }

}