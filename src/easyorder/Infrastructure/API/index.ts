import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../../../swagger-output.json";
import { AtualizarClienteController } from "../Controller/Clientes/AtualizarClienteController";
import { BuscarClienteController } from "../Controller/Clientes/BuscarClienteController";
import { CadastrarClienteController } from "../Controller/Clientes/CadastrarClienteController";
import { ListarClientesController } from "../Controller/Clientes/ListarClientesController";
import {
  AdicionarComboAoPedidoControllerParam,
  AdicionarComboAoPedidoController,
} from "../Controller/Pedido/AdicionarComboAoPedidoController";
import { BuscaPedidoPorIdController } from "../Controller/Pedido/BuscaPedidoPorIdController";
import { CadastrarPedidoController } from "../Controller/Pedido/CadastrarPedidoController";
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
      /** #swagger.tags = ['Health']
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

    // Contexto de cliente
    app.post(
      "/cliente/cadastrar",
      new CadastrarClienteController(this._dbconnection.gateways.clienteGateway)
        .handle
    );
    app.put(
      "/cliente/atualizar",
      new AtualizarClienteController(this._dbconnection.gateways.clienteGateway)
        .handle
    );
    app.get(
      "/cliente/listar",
      new ListarClientesController(this._dbconnection.gateways.clienteGateway)
        .handle
    );
    app.get(
      "/cliente/buscar/:cpf",
      new BuscarClienteController(this._dbconnection.gateways.clienteGateway)
        .handle
    );

    // Contexto de produto
    app.delete(
      "/produto/remover/:id",
      new RemoverProdutoController(this._dbconnection.gateways.produtoGateway)
        .handle
    );
    // app.get(
    //   "/produto/categoria/listar",
    //   new ListaCategoriasController(categoriaGatewayMock).handle
    // );
    app.get(
      "/produto/buscar/:id",
      new BuscarProdutoController(this._dbconnection.gateways.produtoGateway)
        .handle
    );
    app.post(
      "/produto/cadastrar",
      new CadastrarProdutoController(this._dbconnection.gateways.produtoGateway)
        .handle
    );
    app.put(
      "/produto/atualizar",
      new AtualizarProdutoController(this._dbconnection.gateways.produtoGateway)
        .handle
    );
    app.get(
      "/produto/listar",
      new ListarProdutoController(this._dbconnection.gateways.produtoGateway)
        .handle
    );

    // Contexto de pedido
    app.post(
      "/pedido",
      new CadastrarPedidoController(this._dbconnection.gateways.pedidoGateway)
        .handle
    );
    app.get(
      "/pedido/listar/:statusPedido",
      new ListarPedidosPorStatusController(
        this._dbconnection.gateways.pedidoGateway
      ).handle
    );
    app.get(
      "/pedido/:pedidoId",
      new BuscaPedidoPorIdController(this._dbconnection.gateways.pedidoGateway)
        .handle
    );
    app.put(
      "/pedido/:pedidoId/cancelar",
      new CancelarPedidoController(this._dbconnection.gateways.pedidoGateway)
        .handle
    );
    app.put(
      "/pedido/:pedidoId/checkout",
      new CheckoutPedidoController(this._dbconnection.gateways.pedidoGateway)
        .handle
    );
    app.put(
      "/pedido/:pedidoId/fechar",
      new FecharPedidoController(this._dbconnection.gateways.pedidoGateway)
        .handle
    );
    const adicionarComboAoPedidoControllerParam =
      new AdicionarComboAoPedidoControllerParam(
        this._dbconnection.gateways.pedidoGateway,
        this._dbconnection.gateways.produtoGateway
      );
    app.post(
      "/pedido/:pedidoId/combo",
      new AdicionarComboAoPedidoController(
        adicionarComboAoPedidoControllerParam
      ).handle
    );
    app.delete(
      "/pedido/:pedidoId/combo/:comboId",
      new RemoverComboDoPedidoController(
        this._dbconnection.gateways.pedidoGateway
      ).handle
    );

    // Contexto de preparação
    app.get(
      "/preparacao/pedido/proximo",
      new BuscaProximoPedidoParaPreparacaoController(
        this._dbconnection.gateways.pedidoGateway
      ).handle
    );
    app.put(
      "/preparacao/pedido/:pedidoId/iniciar-preparacao",
      new IniciarPreparacaoPedidoController(
        this._dbconnection.gateways.pedidoGateway
      ).handle
    );
    app.put(
      "/preparacao/pedido/:pedidoId/finalizar-preparacao",
      new FinalizarPreparacaoPedidoController(
        this._dbconnection.gateways.pedidoGateway
      ).handle
    );
    app.put(
      "/preparacao/pedido/:pedidoId/entregar",
      new EntregarPedidoController(this._dbconnection.gateways.pedidoGateway)
        .handle
    );

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
}
