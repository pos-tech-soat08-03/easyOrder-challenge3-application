import { Express } from "express";
import express from "express";
import { IDbConnection } from "../../Core/Interfaces/IDbConnection";
import { PedidoController } from "../../Application/Controller/PedidoController";
import { AdicionarComboAoPedidoControllerParam, AdicionarComboAoPedidoController } from "../../Application/Controller/Pedido/AdicionarComboAoPedidoController";
import { CancelarPedidoController } from "../../Application/Controller/Pedido/CancelarPedidoController";
import { CheckoutPedidoController } from "../../Application/Controller/Pedido/CheckoutPedidoController";
import { FecharPedidoController } from "../../Application/Controller/Pedido/FecharPedidoController";
import { RemoverComboDoPedidoController } from "../../Application/Controller/Pedido/RemoverComboDoPedidoController";
import { PedidoAdapter } from "../../Application/Presenter/PedidoAdapter";

export class ApiPedidos {

    static start(dbconnection: IDbConnection, app: Express): void {

        app.use(express.json());

        app.post("/pedido", async (req, res) => {
            /**
                #swagger.tags = ['Pedidos']
                #swagger.path = '/pedido'
                #swagger.method = 'post'
                #swagger.summary = 'Cadastrar novo pedido'
                #swagger.description = 'Endpoint (API) para início de novo Pedido.' 
                #swagger.produces = ["application/json"]
                #swagger.parameters['body'] = { 
                    in: 'body', 
                    '@schema': { 
                        "properties": { 
                            "cliente_identificado": { 
                                "type": "boolean", 
                                "example": "true" 
                            },
                            "clienteId": { 
                                "type": "string", 
                                "minLength": 36, 
                                "maxLength": 36,
                                "format": "uuid",
                                "example": "29a81eeb-d16d-4d6c-a86c-e13597667307" 
                            }
                        }
                    }
                }
                #swagger.responses[200] = {
                    'description': 'Pedido cadastrado com sucesso',
                    '@schema': {
                        'properties': {
                            mensagem: {
                                type: 'string',
                                example: 'Pedido cadastrado com sucesso'
                            },
                            pedido: {
                                $ref: '#/definitions/Pedido'
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
                                example: 'Ocorreu um erro inesperado.'
                            }
                        }
                    }
                }
            */
            if (req.body === undefined || Object.keys(req.body).length === 0) {
                res.status(400).type('json').send(PedidoAdapter.adaptJsonError("Erro: Sem dados no Body da requisição."));
            }
            const clienteIdentificado: boolean = req.body.cliente_identificado;
            const clienteId: string = req.body.clienteId;
            const pedidoPayload = await PedidoController.CadastrarPedido(dbconnection, clienteIdentificado, clienteId);
            res.status(200).type('json').send(pedidoPayload);
        });

        app.get("/pedido/listar/:statusPedido", async (req, res) => {
            /**
                #swagger.tags = ['Pedidos']
                #swagger.path = '/pedido/listar/:statusPedido'
                #swagger.method = 'get'
                #swagger.summary = 'Listar pedidos por status'
                #swagger.description = 'Controller para listagem de pedidos por status'
                #swagger.produces = ["application/json"]
                #swagger.parameters['statusPedido'] = {
                    in: 'path',
                    description: 'Status do pedido',
                    required: true,
                    type: 'string',
                    example: 'RASCUNHO',
                    enum: [
                        'EM_ABERTO',
                        'AGUARDANDO_PAGAMENTO',
                        'RECEBIDO',
                        'EM_PREPARACAO',
                        'PRONTO',
                        'FINALIZADO',
                        'CANCELADO'
                    ]
                }
                #swagger.parameters['page'] = {
                    in: 'query',
                    description: 'Página',
                    required: false,
                    type: 'integer',
                    example: 1,
                    default: 1
                }
                #swagger.parameters['limit'] = {
                    in: 'query',
                    description: 'Limite de registros por página',
                    required: false,
                    type: 'integer',
                    example: 10,
                    default: 10
                }
                #swagger.parameters['orderField'] = {
                    in: 'query',
                    description: 'Campo de ordenação',
                    required: false,
                    type: 'string',
                    example: 'DATA_CADASTRO',
                    default: 'DATA_CADASTRO',
                    enum: [
                        'DATA_CADASTRO',
                    ]
                }
                #swagger.parameters['orderDirection'] = {
                    in: 'query',
                    description: 'Direção da ordenação',
                    required: false,
                    type: 'string',
                    example: 'DESC',
                    default: 'DESC',
                    enum: [
                        'ASC',
                        'DESC'
                    ]
                }
                #swagger.responses[404] = {
                    'description': 'Nenhum pedido encontrado',
                    '@schema': {
                        'properties': {
                            mensagem: {
                                type: 'string',
                                example: 'Nenhum pedido encontrado'
                            },
                            pedidos: {
                                type: 'array',
                                items: {}
                            }
                        }
                    }
                }
                #swagger.responses[200] = {
                    'description': 'Pedidos listados com sucesso',
                    '@schema': {
                        'properties': {
                            mensagem: {
                                type: 'string',
                                example: 'Pedidos listados com sucesso'
                            },
                            pedidos: {
                                type: 'array',
                                items: {
                                    $ref: '#/definitions/Pedido'
                                }
                            }
                        }
                    }
                }
            */

            if (req.params.statusPedido === undefined || req.params.statusPedido === "" || req.params.statusPedido === null) {
                res.status(400).type('json').send(
                    PedidoAdapter.adaptJsonError("Erro: Status do pedido não informado.")
                );
            }

            const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
            const orderField = req.query.orderField ? req.query.orderField as string : 'DATA_CADASTRO';
            const orderDirection = req.query.orderDirection ? req.query.orderDirection as string : 'DESC';

            const pedidosPayload = await PedidoController.ListarPedidosPorStatus(
                dbconnection,
                req.params.statusPedido,
                page,
                limit,
                orderField,
                orderDirection
            );

            res.status(200).type('json').send(pedidosPayload);
        });

        app.get("/pedido/:pedidoId", async (req, res) => {
            /**
                #swagger.tags = ['Pedidos']
                #swagger.path = '/pedido/:pedidoId'
                #swagger.method = 'get'
                #swagger.summary = 'Buscar pedido por ID'
                #swagger.description = 'Controller para buscar um pedido por ID'
                #swagger.produces = ["application/json"]
                #swagger.parameters['pedidoId'] = {
                    in: 'path',
                    description: 'ID do pedido',
                    required: true,
                    type: 'string',
                    example: '29a81eeb-d16d-4d6c-a86c-e13597667307'
                }
                #swagger.responses[404] = {
                    'description': 'Nenhum pedido encontrado',
                    '@schema': {
                        'properties': {
                            mensagem: {
                                type: 'string',
                                example: 'Nenhum pedido encontrado'
                            }
                        }
                    }
                }
                #swagger.responses[200] = {
                    description: 'Pedido Encontrado',
                    '@schema': {
                        'properties': {
                            mensagem: {
                                type: 'string',
                                example: 'Nenhum pedido encontrado'
                            },
                            pedido: {
                                $ref: '#/definitions/Pedido'
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
                                example: 'Ocorreu um erro inesperado: Pedido não encontrado'
                            }
                        }
                    }
                }
            */

            if (req.params.pedidoId === undefined || req.params.pedidoId === "" || req.params.pedidoId === null) {
                res.status(400).type('json').send(
                    PedidoAdapter.adaptJsonError("Erro: ID do pedido não informado.")
                );
            }

            const pedidoPayload = await PedidoController.BuscaPedidoPorId(dbconnection, req.params.pedidoId);

            res.status(200).type('json').send(pedidoPayload);
        });

        app.put(
            "/pedido/:pedidoId/cancelar",
            new CancelarPedidoController(dbconnection.gateways.pedidoGateway)
                .handle
        );
        app.put(
            "/pedido/:pedidoId/checkout",
            new CheckoutPedidoController(dbconnection.gateways.pedidoGateway)
                .handle
        );
        app.put(
            "/pedido/:pedidoId/fechar",
            new FecharPedidoController(dbconnection.gateways.pedidoGateway)
                .handle
        );
        const adicionarComboAoPedidoControllerParam =
            new AdicionarComboAoPedidoControllerParam(
                dbconnection.gateways.pedidoGateway,
                dbconnection.gateways.produtoGateway
            );
        app.post(
            "/pedido/:pedidoId/combo",
            new AdicionarComboAoPedidoController(
                adicionarComboAoPedidoControllerParam
            ).handle
        );
        app.delete(
            "/pedido/:pedidoId/combo/:comboId",
            new RemoverComboDoPedidoController(
                dbconnection.gateways.pedidoGateway
            ).handle
        );



    }
}
