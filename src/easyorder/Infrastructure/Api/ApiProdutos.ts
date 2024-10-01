import { Express } from "express";
import express from "express";
import { IDbConnection } from "../../Core/Interfaces/IDbConnection";
import { AtualizarProdutoController } from "../../Application/Controller/Produto/AtualizarProdutoController";
import { BuscarProdutoController } from "../../Application/Controller/Produto/BuscarProdutoController";
import { CadastrarProdutoController } from "../../Application/Controller/Produto/CadastrarProdutoController";
import { ListarProdutoController } from "../../Application/Controller/Produto/ListarProdutoController";
import { RemoverProdutoController } from "../../Application/Controller/Produto/RemoverProdutoController";

export class ApiProdutos {

    static start(dbconnection: IDbConnection, app: Express): void {

        app.use(express.json());

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
        
    }
}
