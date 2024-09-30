import { Express } from "express";
import express from "express";
import { IDbConnection } from "../Core/Interfaces/IDbConnection";
import { BuscaProximoPedidoParaPreparacaoController } from "../Infrastructure/Controller/Preparacao/Pedido/BuscaProximoPedidoParaPreparacaoController";
import { EntregarPedidoController } from "../Infrastructure/Controller/Preparacao/Pedido/EntregarPedidoController";
import { FinalizarPreparacaoPedidoController } from "../Infrastructure/Controller/Preparacao/Pedido/FinalizarPreparacaoPedidoController";
import { IniciarPreparacaoPedidoController } from "../Infrastructure/Controller/Preparacao/Pedido/IniciarPreparacaoPedidoController";

export class ApiPreparacao {

    private _dbconnection: IDbConnection;
    private app: Express;

    constructor( dbconnection: IDbConnection, app: Express ) {
        this._dbconnection = dbconnection;
        this.app = app;
    }

    public start(): void {
        
        this.app.use(express.json());

        // Contexto de preparação
        this.app.get(
            "/preparacao/pedido/proximo",
            new BuscaProximoPedidoParaPreparacaoController(
                this._dbconnection.gateways.pedidoGateway
            ).handle
        );
        this.app.put(
            "/preparacao/pedido/:pedidoId/iniciar-preparacao",
            new IniciarPreparacaoPedidoController(
                this._dbconnection.gateways.pedidoGateway
            ).handle
        );
        this.app.put(
            "/preparacao/pedido/:pedidoId/finalizar-preparacao",
            new FinalizarPreparacaoPedidoController(
                this._dbconnection.gateways.pedidoGateway
            ).handle
        );
        this.app.put(
            "/preparacao/pedido/:pedidoId/entregar",
            new EntregarPedidoController(this._dbconnection.gateways.pedidoGateway)
                .handle
        );
        
    }
}
