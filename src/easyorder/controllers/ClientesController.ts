import { ClienteAdapter } from "../adapters/ClienteAdapter";
import { IDbConnection } from "../Core/Interfaces/IDbConnection";
import { ClientesUsecases } from "../usecases/ClientesUsecases";

export class ClientesController {

    public static async ListarClientes (dbConnection: IDbConnection): Promise<string> {
        
        const clienteGateway = dbConnection.gateways.clienteGateway;
        const { clientes, mensagem }  = await ClientesUsecases.ListarClientesUsecase(clienteGateway);

        if (!clientes) {
            return ClienteAdapter.adaptClienteJsonError(mensagem);
        }

        return ClienteAdapter.adaptJsonListaClientes(clientes, mensagem); 

    }
}