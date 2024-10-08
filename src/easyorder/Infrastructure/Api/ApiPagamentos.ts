import { Express } from 'express';
import express from 'express';
import { IDbConnection } from "../../Core/Interfaces/IDbConnection";
import { PagamentoServiceInterface } from "../../Core/Interfaces/Services/PagamentoServiceInterface";

export class ApiPagamentos {

    static start(dbconnection: IDbConnection, servicoPagamento: PagamentoServiceInterface, app: Express): void {

        app.use(express.json());

        app.post("/pagamento/confirmacao/:transacaoId", async (req, res) => {

            // implementar rota de confirmacao de pagamento baseado em transacao

        });

        app.post("/pagamento/webhook/", async (req, res) => {
            res.status(200).send("Em implementação");
        });

    }
}