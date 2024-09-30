import { Express } from "express";
import express from "express";
import { IDbConnection } from "../Core/Interfaces/IDbConnection";
import { AtualizarClienteController } from "../Infrastructure/Controller/Clientes/AtualizarClienteController";
import { CadastrarClienteController } from "../Infrastructure/Controller/Clientes/CadastrarClienteController";
import { ClientesController } from "../controllers/ClientesController";

export class ApiClientes {

    private _dbconnection: IDbConnection;
    private app: Express;

    constructor( dbconnection: IDbConnection, app: Express ) {
        this._dbconnection = dbconnection;
        this.app = app;
    }

    public start(): void {
        
        this.app.use(express.json());

        this.app.post(
            "/cliente/cadastrar",
            new CadastrarClienteController(this._dbconnection.gateways.clienteGateway).handle
        );
        
        this.app.put(
            "/cliente/atualizar",
            new AtualizarClienteController(this._dbconnection.gateways.clienteGateway).handle
        );
        
        this.app.get(
            "/cliente/listar",
            async (req, res) => {
                /**
                    #swagger.tags = ['Clientes']
                    #swagger.path = '/cliente/listar'
                    #swagger.method = 'get'
                    #swagger.summary = 'Listar clientes'
                    #swagger.description = 'Endpoind para listar todos os clientes cadastrados.'
                    #swagger.produces = ["application/json"]  
                    #swagger.responses[200] = {
                        'description': 'Clientes listados com sucesso',
                        '@schema': {
                            properties: {
                                mensagem: {
                                    type: 'string',
                                    example: 'Clientes listados com sucesso'
                                },
                                clientes: {
                                    type: 'array',
                                    items: {
                                        properties: {
                                            id: {
                                                type: 'string',
                                                example: '1'
                                            },
                                            cpf: {
                                                type: 'string',
                                                example: '000.000.000-00'
                                            },
                                            nome: {
                                                type: 'string',
                                                example: 'Fulano de Tal'
                                            },
                                            email: {
                                                type: 'string',
                                                example: 'teste@teste.com'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    #swagger.responses[400] = {
                        'description': 'Ocorreu um erro inesperado',
                        '@schema': {
                            'properties': {
                                mensagem: {
                                    type: 'string',
                                    example: 'Ocorreu um erro inesperado: Clientes não encontrados.'
                                }
                            }
                        }
                    }
                */
                
                const clientesPayload = await ClientesController.ListarClientes(this._dbconnection);
                res.send(clientesPayload); 

            }
        );
        
        this.app.get(
            "/cliente/buscar/:cpf", 
            async (req, res) => {
                /**
                    #swagger.summary = 'Buscar Cliente do Restaurante por CPF.'
                    #swagger.description = 'A busca de Cliente por CPF permite que o Cliente seja identificado nas próximas etapas por ID.
                    #swagger.tags = ['Clientes']
                    #swagger.path = '/cliente/buscar/{cpf}'
                    #swagger.method = 'get'
                    #swagger.produces = ["application/json"]
                    #swagger.parameters['cpf'] = {
                        in: 'path',
                        description: 'CPF do Cliente sem pontuação',
                        required: true,
                        type: 'string',
                        example: '00000000000'
                    }
                */
                try {
                    const cpfBusca: string = req.params.cpf;
                    if (!cpfBusca) {
                        res.status(400).send("Ocorreu um erro inesperado: Parâmetro da busca não enviado.")
                        throw new Error("Erro: CPF não informado no parâmetro da busca.");
                    }
                    const clientePayload = await ClientesController.BuscarClientePorCpf(this._dbconnection, cpfBusca);
                    res.send(clientePayload); 
                }
                catch (error: any) {
                    res.send(error.message);
                }
            }
        );
        
    }
}


