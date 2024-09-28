import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../../swagger-output.json";

import { IDbConnection } from "../Core/Interfaces/IDbConnection";
import { EasyOrderApp as EasyOrderAppOld } from "../Infrastructure/API/index";
import { PedidoController } from "../controllers/PedidoController";

export class EasyOrderApp {
  private _dbconnection: IDbConnection;

  constructor(dbconnection: IDbConnection) {
    this._dbconnection = dbconnection;
  }

  start() {
    const app = express();
    const port = Number(process.env.SERVER_PORT || "3000");

    app.use(express.json());

    app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

    app.get("/health", (req, res) => {
      /**
        #swagger.tags = ['Health']
        #swagger.summary = 'Health check'
      */
      res.json({
        status: "UP",
      });
    });

    app.get("/", (req, res) => {
      res.send(
        `Acesse a documentação do Swagger em <A HREF="http://localhost:${port}/doc/">http://localhost:${port}/doc/</A>`
      );
    });

    EasyOrderAppOld.router(this._dbconnection, app, port);

    // Contexto de pedido
    app.post("/pedido", async (req, res) => {
      /**
          #swagger.tags = ['Pedidos']
          #swagger.path = '/pedido'
          #swagger.method = 'post'
          #swagger.summary = 'Cadastrar novo pedido'
          #swagger.description = 'Controller para início de novo Pedido.' 
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
                          example: 'Ocorreu um erro inesperado: Pedido não encontrado'
                      }
                  }
              }
          }
      */

      if (req.body === undefined || Object.keys(req.body).length === 0) {
        throw new Error("Nenhum dado enviado.");
      }

      const clienteIdentificado: boolean = req.body.cliente_identificado;
      const clienteId: string = req.body.clienteId;
      const pedidoPayload = await PedidoController.CadastrarPedido(this._dbconnection, clienteIdentificado, clienteId);
      res.send(pedidoPayload);
    });

    // Inicializa o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
}
