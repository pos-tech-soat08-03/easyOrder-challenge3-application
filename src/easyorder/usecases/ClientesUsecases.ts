import { ClienteEntity } from "../Core/Entity/ClienteEntity";
import { ClienteGatewayInterface } from "../Core/Gateway/ClienteGatewayInterface";

export class ClientesUsecases {

    public static async ListarClientesUsecase (clienteGateway: ClienteGatewayInterface): Promise<{ clientes: ClienteEntity[], mensagem: string }> {
    
        const clientes = await clienteGateway.listarClientes();
        
        if (!clientes) { 
            return { clientes, mensagem: "Não foram encontrado clientes" };
        }
        
        return { clientes, mensagem: "Clientes listados com sucesso" };
    
    }

}
