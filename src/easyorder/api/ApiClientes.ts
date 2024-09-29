import { Express } from "express";
import express from "express";
import { IDbConnection } from "../Core/Interfaces/IDbConnection";
import { AtualizarClienteController } from "../Infrastructure/Controller/Clientes/AtualizarClienteController";
import { BuscarClienteController } from "../Infrastructure/Controller/Clientes/BuscarClienteController";
import { CadastrarClienteController } from "../Infrastructure/Controller/Clientes/CadastrarClienteController";
import { ListarClientesController } from "../Infrastructure/Controller/Clientes/ListarClientesController";

export class ApiClientes {

    private dbconnection: IDbConnection;
    private app: Express;

    constructor( dbconnection: IDbConnection, app: Express ) {
        this.dbconnection = dbconnection;
        this.app = app;
    }

    public start(): void {
        
        this.app.use(express.json());

        this.app.post(
            "/cliente/cadastrar",
            new CadastrarClienteController(this.dbconnection.gateways.clienteGateway).handle
        );
        
        this.app.put(
            "/cliente/atualizar",
            new AtualizarClienteController(this.dbconnection.gateways.clienteGateway).handle
        );
        
        this.app.get(
            "/cliente/listar",
            new ListarClientesController(this.dbconnection.gateways.clienteGateway).handle
        );
        
        this.app.get(
            "/cliente/buscar/:cpf",
            new BuscarClienteController(this.dbconnection.gateways.clienteGateway).handle
        );
        
    }
}
