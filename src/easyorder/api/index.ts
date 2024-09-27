import express from "express";
import { IDbConnection } from "../Infrastructure/../Core/Interfaces/IDbConnection";

import { EasyOrderApp as EasyOrderAppOld } from "../Infrastructure/API/index";

export class EasyOrderApp {
  private _dbconnection: IDbConnection;

  constructor(dbconnection: IDbConnection) {
    this._dbconnection = dbconnection;
  }

  start() {
    const app = express();
    const port = Number(process.env.SERVER_PORT || "3000");

    app.use(express.json());

    EasyOrderAppOld.router(this._dbconnection, app, port);

    // Inicializa o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
}
