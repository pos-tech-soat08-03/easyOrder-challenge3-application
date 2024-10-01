import { PedidoComboEntity } from "../../Core/Entity/PedidoComboEntity";
import { PedidoEntity } from "../../Core/Entity/PedidoEntity";
import { ProdutoEntity } from "../../Core/Entity/ProdutoEntity";

export class PedidoAdapter {

    public static adaptJsonError(mensagem: string): string {
        return JSON.stringify({
            message: mensagem
        });
    }

    public static adaptJsonPedido(pedido: PedidoEntity): string {

        const produtoToJson = function (produto: ProdutoEntity | null): any {
            return produto ? {
                id: produto.getId(),
                nome: produto.getNome(),
                descricao: produto.getDescricao(),
                preco: produto.getPreco(),
                categoria: produto.getCategoria(),
                imagemURL: produto.getImagemURL(),
            } : null;
        }

        const comboToJson = function (combo: PedidoComboEntity): any {
            return {
                id: combo.getId(),
                lanche: produtoToJson(combo.getLanche()),
                bebida: produtoToJson(combo.getBebida()),
                sobremesa: produtoToJson(combo.getSobremesa()),
                acompanhamento: produtoToJson(combo.getAcompanhamento()),
                valorTotal: combo.getValorTotal()
            };
        }

        return JSON.stringify({
            mensagem: "Pedido cadastrado com sucesso",
            pedido: {
                id: pedido?.getId(),
                data: pedido?.getDataPedido(),
                clienteId: pedido?.getClienteId(),
                status: pedido?.getStatusPedido().getValue(),
                pagamentoStatus: pedido?.getStatusPagamento(),
                combos: pedido?.getCombos().map(combo => comboToJson(combo)),
                valorTotal: pedido?.getValorTotal()
            }
        });

    }

}