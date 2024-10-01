import { PedidoEntity } from "../Entity/PedidoEntity";
import { PedidoGatewayInterface } from "../Interfaces/Gateway/PedidoGatewayInterface";

export class PedidoUsecases {

    public static async CadastrarPedido(
        pedidoGateway: PedidoGatewayInterface,
        cliente_identificado: boolean,
        clientId: string,
    ): Promise<PedidoEntity> {

        if (!cliente_identificado) {
            clientId = "NAO_IDENTIFICADO";
        }

        return new PedidoEntity(clientId);

    }
}
