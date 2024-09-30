import express from "express";
import {
    AdicionarComboAoPedidoControllerParam,
    AdicionarComboAoPedidoController,
} from "../Controller/Pedido/AdicionarComboAoPedidoController";
import { BuscaPedidoPorIdController } from "../Controller/Pedido/BuscaPedidoPorIdController";
import { CancelarPedidoController } from "../Controller/Pedido/CancelarPedidoController";
import { CheckoutPedidoController } from "../Controller/Pedido/CheckoutPedidoController";
import { FecharPedidoController } from "../Controller/Pedido/FecharPedidoController";
import { ListarPedidosPorStatusController } from "../Controller/Pedido/ListarPedidosPorStatusController";
import { RemoverComboDoPedidoController } from "../Controller/Pedido/RemoverComboDoPedidoController";
import { BuscaProximoPedidoParaPreparacaoController } from "../Controller/Preparacao/Pedido/BuscaProximoPedidoParaPreparacaoController";
import { EntregarPedidoController } from "../Controller/Preparacao/Pedido/EntregarPedidoController";
import { FinalizarPreparacaoPedidoController } from "../Controller/Preparacao/Pedido/FinalizarPreparacaoPedidoController";
import { IniciarPreparacaoPedidoController } from "../Controller/Preparacao/Pedido/IniciarPreparacaoPedidoController";
import { AtualizarProdutoController } from "../Controller/Produto/AtualizarProdutoController";
import { BuscarProdutoController } from "../Controller/Produto/BuscarProdutoController";
import { CadastrarProdutoController } from "../Controller/Produto/CadastrarProdutoController";
// import { ListaCategoriasController } from "../Controller/Produto/ListarCategoriasController";
import { ListarProdutoController } from "../Controller/Produto/ListarProdutoController";
import { RemoverProdutoController } from "../Controller/Produto/RemoverProdutoController";
import { IDbConnection } from '../../Core/Interfaces/IDbConnection';

export class EasyOrderApp {

    static router(dbconnection: IDbConnection, app: express.Application, port: number) {

        // // Contexto de cliente
        // app.post(
        //     "/cliente/cadastrar",
        //     new CadastrarClienteController(dbconnection.gateways.clienteGateway)
        //         .handle
        // );
        // app.put(
        //     "/cliente/atualizar",
        //     new AtualizarClienteController(dbconnection.gateways.clienteGateway)
        //         .handle
        // );
        // app.get(
        //     "/cliente/listar",
        //     new ListarClientesController(dbconnection.gateways.clienteGateway)
        //         .handle
        // );
        // app.get(
        //     "/cliente/buscar/:cpf",
        //     new BuscarClienteController(dbconnection.gateways.clienteGateway)
        //         .handle
        // );

        // Contexto de produto
        app.delete(
            "/produto/remover/:id",
            new RemoverProdutoController(dbconnection.gateways.produtoGateway)
                .handle
        );
        // app.get(
        //   "/produto/categoria/listar",
        //   new ListaCategoriasController(categoriaGatewayMock).handle
        // );
        app.get(
            "/produto/buscar/:id",
            new BuscarProdutoController(dbconnection.gateways.produtoGateway)
                .handle
        );
        app.post(
            "/produto/cadastrar",
            new CadastrarProdutoController(dbconnection.gateways.produtoGateway)
                .handle
        );
        app.put(
            "/produto/atualizar",
            new AtualizarProdutoController(dbconnection.gateways.produtoGateway)
                .handle
        );
        app.get(
            "/produto/listar",
            new ListarProdutoController(dbconnection.gateways.produtoGateway)
                .handle
        );

        // // Contexto de pedido
        // app.get(
        //     "/pedido/listar/:statusPedido",
        //     new ListarPedidosPorStatusController(
        //         dbconnection.gateways.pedidoGateway
        //     ).handle
        // );
        // app.get(
        //     "/pedido/:pedidoId",
        //     new BuscaPedidoPorIdController(dbconnection.gateways.pedidoGateway)
        //         .handle
        // );
        // app.put(
        //     "/pedido/:pedidoId/cancelar",
        //     new CancelarPedidoController(dbconnection.gateways.pedidoGateway)
        //         .handle
        // );
        // app.put(
        //     "/pedido/:pedidoId/checkout",
        //     new CheckoutPedidoController(dbconnection.gateways.pedidoGateway)
        //         .handle
        // );
        // app.put(
        //     "/pedido/:pedidoId/fechar",
        //     new FecharPedidoController(dbconnection.gateways.pedidoGateway)
        //         .handle
        // );
        // const adicionarComboAoPedidoControllerParam =
        //     new AdicionarComboAoPedidoControllerParam(
        //         dbconnection.gateways.pedidoGateway,
        //         dbconnection.gateways.produtoGateway
        //     );
        // app.post(
        //     "/pedido/:pedidoId/combo",
        //     new AdicionarComboAoPedidoController(
        //         adicionarComboAoPedidoControllerParam
        //     ).handle
        // );
        // app.delete(
        //     "/pedido/:pedidoId/combo/:comboId",
        //     new RemoverComboDoPedidoController(
        //         dbconnection.gateways.pedidoGateway
        //     ).handle
        // );

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
