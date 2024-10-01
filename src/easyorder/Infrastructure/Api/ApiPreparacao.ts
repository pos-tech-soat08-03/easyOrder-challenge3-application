import { Express } from "express";
import express from "express";
import { IDbConnection } from "../../Core/Interfaces/IDbConnection";
import { BuscaProximoPedidoParaPreparacaoController } from "../../Application/Controller/Preparacao/Pedido/BuscaProximoPedidoParaPreparacaoController";
import { EntregarPedidoController } from "../../Application/Controller/Preparacao/Pedido/EntregarPedidoController";
import { FinalizarPreparacaoPedidoController } from "../../Application/Controller/Preparacao/Pedido/FinalizarPreparacaoPedidoController";
import { IniciarPreparacaoPedidoController } from "../../Application/Controller/Preparacao/Pedido/IniciarPreparacaoPedidoController";

export class ApiPreparacao {

    static start(dbconnection: IDbConnection, app: Express): void {
        
        app.use(express.json());

        // Contexto de preparação
        app.get(
            "/preparacao/pedido/proximo",
            new BuscaProximoPedidoParaPreparacaoController(
                dbconnection.gateways.pedidoGateway
            ).handle
        );
        app.put(
            "/preparacao/pedido/:pedidoId/iniciar-preparacao",
            new IniciarPreparacaoPedidoController(
                dbconnection.gateways.pedidoGateway
            ).handle
        );
        app.put(
            "/preparacao/pedido/:pedidoId/finalizar-preparacao",
            new FinalizarPreparacaoPedidoController(
                dbconnection.gateways.pedidoGateway
            ).handle
        );
        app.put(
            "/preparacao/pedido/:pedidoId/entregar",
            new EntregarPedidoController(dbconnection.gateways.pedidoGateway)
                .handle
        );
        
    }
}
