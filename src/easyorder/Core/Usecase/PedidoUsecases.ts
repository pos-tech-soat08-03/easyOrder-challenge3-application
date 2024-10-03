import { PedidoComboEntity } from "../Entity/PedidoComboEntity";
import { PedidoEntity } from "../Entity/PedidoEntity";
import { CategoriaEnum } from "../Entity/ValueObject/CategoriaEnum";
import { StatusPagamentoEnum } from "../Entity/ValueObject/StatusPagamentoEnum";
import { StatusPedidoEnum, StatusPedidoValueObject } from "../Entity/ValueObject/StatusPedidoValueObject";
import { PedidoGatewayInterface, PedidoGatewayInterfaceFilterOrderDirection, PedidoGatewayInterfaceFilterOrderField } from "../Interfaces/Gateway/PedidoGatewayInterface";
import { ProdutoGatewayInterface } from "../Interfaces/Gateway/ProdutoGatewayInterface";
import { DataNotFoundException, SystemErrorException } from "../Types/ExceptionType";

export class PedidoUsecases {

    public static async CadastrarPedido(
        cliente_identificado: boolean,
        clientId: string,
    ): Promise<PedidoEntity> {

        if (!cliente_identificado) {
            clientId = "NAO_IDENTIFICADO";
        }

        return new PedidoEntity(clientId);
    }

    public static async ListarPedidosPorStatus(
        pedidoGateway: PedidoGatewayInterface,
        statusPedido: string,
        page: number,
        limit: number,
        orderField: string,
        orderDirection: string,
    ): Promise<PedidoEntity[]> {
        const filter = {
            page: page,
            limit: limit,
            orderField: orderField as PedidoGatewayInterfaceFilterOrderField,
            orderDirection: orderDirection as PedidoGatewayInterfaceFilterOrderDirection
        };

        const filterStatusPedido = new StatusPedidoValueObject(statusPedido as StatusPedidoEnum);

        const pedidos = await pedidoGateway.listarPedidosPorStatus(filterStatusPedido, filter);

        if (!pedidos) {
            throw new SystemErrorException("Erro ao listar pedidos");
        }

        if (!pedidos.length) {
            throw new DataNotFoundException("Nenhum pedido encontrado");
        }

        return pedidos;
    }

    public static async BuscaPedidoPorId(
        pedidoGateway: PedidoGatewayInterface,
        pedidoId: string,
    ): Promise<PedidoEntity | null> {
        const pedido = await pedidoGateway.buscaPedidoPorId(pedidoId);

        if (!pedido) {
            return null;
        }

        return pedido;
    }

    public static async CancelarPedido(
        pedidoGateway: PedidoGatewayInterface,
        pedidoId: string,
    ): Promise<PedidoEntity> {
        const pedido = await pedidoGateway.buscaPedidoPorId(pedidoId);

        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }

        if (pedido.getStatusPedido().getValue() === StatusPedidoEnum.CANCELADO) {
            throw new Error("Pedido já cancelado");
        }

        pedido.setStatusPedido(
            new StatusPedidoValueObject(StatusPedidoEnum.CANCELADO)
        );

        return pedido;
    }

    public static async CheckoutPedido(
        pedidoGateway: PedidoGatewayInterface,
        pedidoId: string,
    ): Promise<PedidoEntity> {
        const pedido = await pedidoGateway.buscaPedidoPorId(pedidoId);

        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }

        if (pedido.getStatusPedido().getValue() === StatusPedidoEnum.CANCELADO) {
            throw new Error("Pedido já cancelado");
        }

        pedido.setStatusPedido(
            new StatusPedidoValueObject(StatusPedidoEnum.RECEBIDO)
        );

        pedido.setStatusPagamento(StatusPagamentoEnum.PAGO);

        return pedido;
    }

    public static async FecharPedido(
        pedidoGateway: PedidoGatewayInterface,
        pedidoId: string,
    ): Promise<PedidoEntity> {
        const pedido = await pedidoGateway.buscaPedidoPorId(pedidoId);

        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }

        pedido.setStatusPedido(
            new StatusPedidoValueObject(StatusPedidoEnum.AGUARDANDO_PAGAMENTO)
        );

        return pedido;
    }

    public static async AdicionarComboAoPedido(
        pedidoGateway: PedidoGatewayInterface,
        produtoGateway: ProdutoGatewayInterface,
        pedidoId: string,
        lancheId: string,
        bebidaId: string,
        sobremesaId: string,
        acompanhamentoId: string,
    ): Promise<PedidoEntity> {

        const pedido = await pedidoGateway.buscaPedidoPorId(pedidoId);

        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }

        let produtoLanche = null
        if (lancheId) {
            produtoLanche = await produtoGateway.buscarProdutoPorId(lancheId);

            if (!produtoLanche) {
                throw new Error("Lanche não encontrado");
            }

            // RN3. Quando adicionar um produto ao combo, devemos verificar se o tipo do produto informado corresponde ao tipo de produto solicitando a inserção no combo
            if (produtoLanche.getCategoria() !== CategoriaEnum.LANCHE) {
                throw new Error("Produto informado não é um lanche");
            }
        }

        let produtoBebida = null
        if (bebidaId) {
            produtoBebida = await produtoGateway.buscarProdutoPorId(bebidaId);

            if (!produtoBebida) {
                throw new Error("Bebida não encontrada");
            }

            // RN3. Quando adicionar um produto ao combo, devemos verificar se o tipo do produto informado corresponde ao tipo de produto solicitando a inserção no combo
            if (produtoBebida.getCategoria() !== CategoriaEnum.BEBIDA) {
                throw new Error("Produto informado não é uma bebida");
            }
        }

        let produtoSobremesa = null
        if (sobremesaId) {
            produtoSobremesa = await produtoGateway.buscarProdutoPorId(sobremesaId);

            if (!produtoSobremesa) {
                throw new Error("Sobremesa não encontrada");
            }

            // RN3. Quando adicionar um produto ao combo, devemos verificar se o tipo do produto informado corresponde ao tipo de produto solicitando a inserção no combo
            if (produtoSobremesa.getCategoria() !== CategoriaEnum.SOBREMESA) {
                throw new Error("Produto informado não é uma sobremesa");
            }
        }

        let produtoAcompanhamento = null
        if (acompanhamentoId) {
            produtoAcompanhamento = await produtoGateway.buscarProdutoPorId(acompanhamentoId);

            if (!produtoAcompanhamento) {
                throw new Error("Acompanhamento não encontrado");
            }

            // RN3. Quando adicionar um produto ao combo, devemos verificar se o tipo do produto informado corresponde ao tipo de produto solicitando a inserção no combo
            if (produtoAcompanhamento.getCategoria() !== CategoriaEnum.ACOMPANHAMENTO) {
                throw new Error("Produto informado não é um acompanhamento");
            }
        }

        const pedidoCombo = new PedidoComboEntity(
            produtoLanche,
            produtoBebida,
            produtoSobremesa,
            produtoAcompanhamento
        );

        pedido.adicionarCombos([pedidoCombo]);

        return pedido;
    }

    public static async RemoverComboDoPedido(
        pedidoGateway: PedidoGatewayInterface,
        pedidoId: string,
        comboId: string,
    ): Promise<PedidoEntity> {
        const pedido = await pedidoGateway.buscaPedidoPorId(pedidoId);

        if (!pedido) {
            throw new Error("Pedido não encontrado");
        }

        pedido.removerCombo(comboId);

        return pedido;
    }
}
