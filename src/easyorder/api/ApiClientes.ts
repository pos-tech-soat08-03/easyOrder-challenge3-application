import { Express } from "express";
import express from "express";
import { IDbConnection } from "../Core/Interfaces/IDbConnection";
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
            async (req, res) => {
                /**
                    #swagger.tags = ['Clientes']
                    #swagger.path = '/cliente/cadastrar'
                    #swagger.method = 'post'
                    #swagger.summary = 'Cadastro de Novo Cliente'
                    #swagger.description = 'Este Endpoint é utilizado para realizar o Cadastro de um Novo Cliente, através dos dados fornecidos no corpo da requisição. Não é permitido o cadastro de mais de um cliente com o mesmo CPF.'
                    #swagger.produces = ["application/json"]  
                    #swagger.parameters['body'] = { 
                        in: 'body', 
                        '@schema': { 
                            "required": ["cpf", "nome", "email"], 
                            "properties": { 
                                "cpf": { 
                                    "type": "string", 
                                    "minLength": 11,
                                    "maxLength": 11,
                                    "example": "00000000000"
                                },
                                "nome": { 
                                    "type": "string",
                                    "minLength": 1,
                                    "maxLength": 255,
                                    "example": "João da Silva"
                                },
                                "email": { 
                                    "type": "string",
                                    "minLength": 1,
                                    "maxLength": 255,
                                    "example": "teste@teste.com"
                                }
                            }
                        }
                    }
                    #swagger.responses[200] = {
                        'description': 'Cliente cadastrado com sucesso',
                        '@schema': {
                            'properties': {
                                resultado_cadastro: {
                                    type: 'boolean',
                                    example: true
                                },
                                mensagem: {
                                    type: 'string',
                                    example: 'Cliente cadastrado com sucesso'
                                },
                                cliente: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'string',
                                            example: '29a81eeb-d16d-4d6c-a86c-e13597667307'
                                        },
                                        nome: {
                                            type: 'string',
                                            example: 'João da Silva'
                                        },
                                        cpf: {
                                            type: 'string',
                                            example: '123.456.789-01'
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
                    #swagger.responses[400] = {
                        'description': 'Ocorreu um erro inesperado',
                        '@schema': {
                            'properties': {
                                mensagem: {
                                    type: 'string',
                                    example: 'Erro inesperado: Não foi possível cadastrar o cliente'
                                }
                            }
                        }
                    }
                */
                try {
                    if (req.body === undefined || Object.keys(req.body).length === 0) {
                        throw new Error("Nenhum dado informado.");
                    }
                    const { cpf, nome, email } = req.body;
                    const clientePayload = await ClientesController.CadastrarCliente(this._dbconnection, cpf, nome, email);
                    res.send(clientePayload); 
                }
                catch (error: any) {
                    res.send(error.message);
                }
            }
        );
        
        this.app.put(
            "/cliente/atualizar",
            async (req, res) => {
                /**
                    #swagger.tags = ['Clientes']
                    #swagger.path = '/cliente/atualizar'
                    #swagger.method = 'put'
                    #swagger.summary = 'Atualização de Cliente'
                    #swagger.description = 'Este Endpoint é utilizado para Atualizar o Cadastro de um Cliente existente, através dos dados fornecidos no corpo da requisição. Utiliza CPF como chave de busca.'
                    #swagger.produces = ["application/json"]  
                    #swagger.parameters['body'] = { 
                        in: 'body', 
                        '@schema': { 
                            "required": ["cpf", "nome", "email"], 
                            "properties": { 
                                "cpf": { 
                                    "type": "string", 
                                    "minLength": 11,
                                    "maxLength": 11,
                                    "example": "00000000000"
                                },
                                "nome": { 
                                    "type": "string",
                                    "minLength": 1,
                                    "maxLength": 255,
                                    "example": "João da Silva"
                                },
                                "email": { 
                                    "type": "string",
                                    "minLength": 1,
                                    "maxLength": 255,
                                    "example": "teste@teste.com"
                                }
                            }
                        }
                    }
                    #swagger.responses[200] = {
                        'description': 'Cliente atualizado com sucesso',
                        '@schema': {
                            'properties': {
                                resultado_atualizacao: {
                                    type: 'boolean',
                                    example: true
                                },
                                mensagem: {
                                    type: 'string',
                                    example: 'Cliente atualizado com sucesso'
                                },
                                cliente: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'string',
                                            example: '29a81eeb-d16d-4d6c-a86c-e13597667307'
                                        },
                                        nome: {
                                            type: 'string',
                                            example: 'João da Silva'
                                        },
                                        cpf: {
                                            type: 'string',
                                            example: '123.456.789-01'
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'teste@teste.com'
                                        }
                                    }
                                }
                            }
                        }
                    }`
                    #swagger.responses[400] = {
                        'description': 'Ocorreu um erro inesperado',
                        '@schema': {
                            'properties': {
                                mensagem: {
                                    type: 'string',
                                    example: 'Erro inesperado: Não foi possível atualizar o cliente'
                                }
                            }
                        }
                    }
                */
                try {
                    if (req.body === undefined || Object.keys(req.body).length === 0) {
                        throw new Error("Nenhum dado informado.");
                    }
                    const { cpf, nome, email } = req.body;
                    const clientePayload = await ClientesController.AtualizarClientePorCpf(this._dbconnection, cpf, nome, email);
                    res.send(clientePayload); 
                }
                catch (error: any) {
                    res.send(error.message);
                }
    
            }
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
                try {
                    const clientesPayload = await ClientesController.ListarClientes(this._dbconnection);
                    res.send(clientesPayload); 
                }
                catch (error: any) {
                    res.send(error.message);
                }
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


