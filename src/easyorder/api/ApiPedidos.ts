import { Express } from "express";
import express from "express";
import { IDbConnection } from "../Core/Interfaces/IDbConnection";
import { PedidoController } from "../controllers/PedidoController";
import { AdicionarComboAoPedidoControllerParam, AdicionarComboAoPedidoController } from "../Infrastructure/Controller/Pedido/AdicionarComboAoPedidoController";
import { BuscaPedidoPorIdController } from "../Infrastructure/Controller/Pedido/BuscaPedidoPorIdController";
import { CancelarPedidoController } from "../Infrastructure/Controller/Pedido/CancelarPedidoController";
import { CheckoutPedidoController } from "../Infrastructure/Controller/Pedido/CheckoutPedidoController";
import { FecharPedidoController } from "../Infrastructure/Controller/Pedido/FecharPedidoController";
import { ListarPedidosPorStatusController } from "../Infrastructure/Controller/Pedido/ListarPedidosPorStatusController";
import { RemoverComboDoPedidoController } from "../Infrastructure/Controller/Pedido/RemoverComboDoPedidoController";

export class ApiPedidos {
  private _dbconnection: IDbConnection;
  private app: Express;

  constructor(dbconnection: IDbConnection, app: Express) {
    this._dbconnection = dbconnection;
    this.app = app;
  }

  start() {

    this.app.use(express.json());

    this.app.post("/pedido", async (req, res) => {
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
        const pedidoPayload = await PedidoController.CadastrarPedido(this._dbconnection, clienteIdentificado, clienteId);
        res.send(pedidoPayload);
    });

        this.app.get(
            "/pedido/listar/:statusPedido",
            new ListarPedidosPorStatusController(
                this._dbconnection.gateways.pedidoGateway
            ).handle
        );
        this.app.get(
            "/pedido/:pedidoId",
            new BuscaPedidoPorIdController(this._dbconnection.gateways.pedidoGateway)
                .handle
        );
        this.app.put(
            "/pedido/:pedidoId/cancelar",
            new CancelarPedidoController(this._dbconnection.gateways.pedidoGateway)
                .handle
        );
        this.app.put(
            "/pedido/:pedidoId/checkout",
            new CheckoutPedidoController(this._dbconnection.gateways.pedidoGateway)
                .handle
        );
        this.app.put(
            "/pedido/:pedidoId/fechar",
            new FecharPedidoController(this._dbconnection.gateways.pedidoGateway)
                .handle
        );
        const adicionarComboAoPedidoControllerParam =
            new AdicionarComboAoPedidoControllerParam(
                this._dbconnection.gateways.pedidoGateway,
                this._dbconnection.gateways.produtoGateway
            );
        this.app.post(
            "/pedido/:pedidoId/combo",
            new AdicionarComboAoPedidoController(
                adicionarComboAoPedidoControllerParam
            ).handle
        );
        this.app.delete(
            "/pedido/:pedidoId/combo/:comboId",
            new RemoverComboDoPedidoController(
                this._dbconnection.gateways.pedidoGateway
            ).handle
        );



  }
}
