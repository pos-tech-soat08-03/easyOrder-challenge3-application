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


    public static async BuscarClientePorCpf (dbConnection: IDbConnection, cpfBusca: string): Promise<string> {
        const clienteGateway = dbConnection.gateways.clienteGateway;

        const { cliente, mensagem }  = await ClientesUsecases.BuscarClientePorCpfUsecase(clienteGateway, cpfBusca);
        if (!cliente) {
            return ClienteAdapter.adaptClienteJsonError(mensagem);
        }
        return ClienteAdapter.adaptJsonCliente(cliente, mensagem); 
    }

    

}