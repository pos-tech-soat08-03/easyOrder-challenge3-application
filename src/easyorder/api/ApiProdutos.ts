import { Express } from "express";
import express from "express";
import { IDbConnection } from "../Core/Interfaces/IDbConnection";
import { AtualizarProdutoController } from "../Infrastructure/Controller/Produto/AtualizarProdutoController";
import { BuscarProdutoController } from "../Infrastructure/Controller/Produto/BuscarProdutoController";
import { CadastrarProdutoController } from "../Infrastructure/Controller/Produto/CadastrarProdutoController";
import { ListarProdutoController } from "../Infrastructure/Controller/Produto/ListarProdutoController";
import { RemoverProdutoController } from "../Infrastructure/Controller/Produto/RemoverProdutoController";

export class ApiProdutos {

    private _dbconnection: IDbConnection;
    private app: Express;

    constructor( dbconnection: IDbConnection, app: Express ) {
        this._dbconnection = dbconnection;
        this.app = app;
    }

    public start(): void {
        
        this.app.use(express.json());

        // Contexto de produto
        this.app.delete(
            "/produto/remover/:id",
            new RemoverProdutoController(this._dbconnection.gateways.produtoGateway)
                .handle
        );
        // app.get(
        //   "/produto/categoria/listar",
        //   new ListaCategoriasController(categoriaGatewayMock).handle
        // );
        this.app.get(
            "/produto/buscar/:id",
            new BuscarProdutoController(this._dbconnection.gateways.produtoGateway)
                .handle
        );
        this.app.post(
            "/produto/cadastrar",
            new CadastrarProdutoController(this._dbconnection.gateways.produtoGateway)
                .handle
        );
        this.app.put(
            "/produto/atualizar",
            new AtualizarProdutoController(this._dbconnection.gateways.produtoGateway)
                .handle
        );
        this.app.get(
            "/produto/listar",
            new ListarProdutoController(this._dbconnection.gateways.produtoGateway)
                .handle
        );
        
    }
}
