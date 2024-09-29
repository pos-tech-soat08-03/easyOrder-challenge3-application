import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../../swagger-output.json";

export class DefaultApiEndpoints {
  private app: Express;
  
  constructor(app: Express) {
    this.app = app;
  }

  public start(): void {

    this.app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

    this.app.get("/health", (req, res) => {
      /**
        #swagger.tags = ['Health']
        #swagger.summary = 'Health check'
      */
      res.json({
        status: "UP",
      });
    });

    this.app.get("/", (req, res) => {
      res.status(302).send(
        `<meta http-equiv="Refresh" content="3;URL=http://localhost:3000/doc/" />Redirecionando para a documentação do Swagger em http://localhost:3000/doc/.<BR>\
        Caso não ocorra automaticamente <A href="http://localhost:3000/doc/">clique aqui</A>`
      );
    });

  }
}
