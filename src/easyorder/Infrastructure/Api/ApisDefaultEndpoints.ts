import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../../../swagger-output.json";

export class DefaultApiEndpoints {
  
  static start(app: Express): void {

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
      res.status(302).send(
        `<meta http-equiv="Refresh" content="3;URL=http://localhost:30000/doc/" />Redirecionando para a documentação do Swagger em http://localhost:30000/doc/<BR>\
        Caso não ocorra automaticamente <A href="http://localhost:30000/doc/">clique aqui</A>`
      );
    });

  }
}
