import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../../../swagger-output.json";
import { DbConnection } from "../../Core/Types/DbConnection";
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

export class EasyOrderApp {
  private _dbconnection: DbConnection;

  constructor(dbconnection: DbConnection) {
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
      new CadastrarClienteController(this._dbconnection.clienteRepo).handle
    );
    app.put(
      "/cliente/atualizar",
      new AtualizarClienteController(this._dbconnection.clienteRepo).handle
    );
    app.get(
      "/cliente/listar",
      new ListarClientesController(this._dbconnection.clienteRepo).handle
    );
    app.get(
      "/cliente/buscar/:cpf",
      new BuscarClienteController(this._dbconnection.clienteRepo).handle
    );

    // Contexto de produto
    app.delete(
      "/produto/remover/:id",
      new RemoverProdutoController(this._dbconnection.produtoRepo).handle
    );
    // app.get(
    //   "/produto/categoria/listar",
    //   new ListaCategoriasController(categoriaRepositoryMock).handle
    // );
    app.get(
      "/produto/buscar/:id",
      new BuscarProdutoController(this._dbconnection.produtoRepo).handle
    );
    app.post(
      "/produto/cadastrar",
      new CadastrarProdutoController(this._dbconnection.produtoRepo).handle
    );
    app.put(
      "/produto/atualizar",
      new AtualizarProdutoController(this._dbconnection.produtoRepo).handle
    );
    app.get(
      "/produto/listar",
      new ListarProdutoController(this._dbconnection.produtoRepo).handle
    );

    // Contexto de pedido
    app.post("/pedido", new CadastrarPedidoController(this._dbconnection.pedidoRepo).handle);
    app.get(
      "/pedido/listar/:statusPedido",
      new ListarPedidosPorStatusController(this._dbconnection.pedidoRepo).handle
    );
    app.get(
      "/pedido/:pedidoId",
      new BuscaPedidoPorIdController(this._dbconnection.pedidoRepo).handle
    );
    app.put(
      "/pedido/:pedidoId/cancelar",
      new CancelarPedidoController(this._dbconnection.pedidoRepo).handle
    );
    app.put(
      "/pedido/:pedidoId/checkout",
      new CheckoutPedidoController(this._dbconnection.pedidoRepo).handle
    );
    app.put(
      "/pedido/:pedidoId/fechar",
      new FecharPedidoController(this._dbconnection.pedidoRepo).handle
    );
    const adicionarComboAoPedidoControllerParam =
      new AdicionarComboAoPedidoControllerParam(
        this._dbconnection.pedidoRepo,
        this._dbconnection.produtoRepo
      );
    app.post(
      "/pedido/:pedidoId/combo",
      new AdicionarComboAoPedidoController(
        adicionarComboAoPedidoControllerParam
      ).handle
    );
    app.delete(
      "/pedido/:pedidoId/combo/:comboId",
      new RemoverComboDoPedidoController(this._dbconnection.pedidoRepo).handle
    );

    // Contexto de preparação
    app.get(
      "/preparacao/pedido/proximo",
      new BuscaProximoPedidoParaPreparacaoController(this._dbconnection.pedidoRepo).handle
    );
    app.put(
      "/preparacao/pedido/:pedidoId/iniciar-preparacao",
      new IniciarPreparacaoPedidoController(this._dbconnection.pedidoRepo).handle
    );
    app.put(
      "/preparacao/pedido/:pedidoId/finalizar-preparacao",
      new FinalizarPreparacaoPedidoController(this._dbconnection.pedidoRepo).handle
    );
    app.put(
      "/preparacao/pedido/:pedidoId/entregar",
      new EntregarPedidoController(this._dbconnection.pedidoRepo).handle
    );

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
}
