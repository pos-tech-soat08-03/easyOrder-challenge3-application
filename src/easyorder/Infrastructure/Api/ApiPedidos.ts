import { Express } from "express";
import express from "express";
import { IDbConnection } from "../../Core/Interfaces/IDbConnection";
import { PedidoController } from "../../Application/Controller/PedidoController";
import { AdicionarComboAoPedidoControllerParam, AdicionarComboAoPedidoController } from "../../Application/Controller/Pedido/AdicionarComboAoPedidoController";
import { BuscaPedidoPorIdController } from "../../Application/Controller/Pedido/BuscaPedidoPorIdController";
import { CancelarPedidoController } from "../../Application/Controller/Pedido/CancelarPedidoController";
import { CheckoutPedidoController } from "../../Application/Controller/Pedido/CheckoutPedidoController";
import { FecharPedidoController } from "../../Application/Controller/Pedido/FecharPedidoController";
import { ListarPedidosPorStatusController } from "../../Application/Controller/Pedido/ListarPedidosPorStatusController";
import { RemoverComboDoPedidoController } from "../../Application/Controller/Pedido/RemoverComboDoPedidoController";

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
            res.status(400).send("Ocorreu um erro inesperado: Nenhum dado enviado.")
            throw new Error("Erro: Sem dados no Body da requisição.");
        }
        const clienteIdentificado: boolean = req.body.cliente_identificado;
        const clienteId: string = req.body.clienteId;
        const pedidoPayload = await PedidoController.CadastrarPedido(dbconnection, clienteIdentificado, clienteId);
        res.send(pedidoPayload);
    });

        app.get(
            "/pedido/listar/:statusPedido",
            new ListarPedidosPorStatusController(
                dbconnection.gateways.pedidoGateway
            ).handle
        );
        app.get(
            "/pedido/:pedidoId",
            new BuscaPedidoPorIdController(dbconnection.gateways.pedidoGateway)
                .handle
        );
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
