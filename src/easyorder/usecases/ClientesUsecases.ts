import { ClienteEntity } from "../Core/Entity/ClienteEntity";
import { CpfValueObject } from "../Core/Entity/ValueObject/CpfValueObject";
import { ClienteGatewayInterface } from "../Core/Gateway/ClienteGatewayInterface";

export class ClientesUsecases {

    public static async ListarClientesUsecase (clienteGateway: ClienteGatewayInterface): Promise<{ clientes: ClienteEntity[] | undefined, mensagem: string }> {
        const clientes = await clienteGateway.listarClientes();
        if (clientes === undefined) { 
            return { clientes: undefined, mensagem: "Não foram encontrado clientes." };
        }
        return { clientes, mensagem: `Sucesso. ${clientes.length} Cliente(s) encontrado(s).` };
    }

    public static async BuscarClientePorCpfUsecase (clienteGateway: ClienteGatewayInterface, cpfTexto: string): Promise<{ cliente: ClienteEntity | undefined, mensagem: string }> {
        const cpfObjeto = new CpfValueObject(cpfTexto);
        const clienteBusca = await clienteGateway.buscarClientePorCpf(cpfObjeto);
        if (clienteBusca === undefined) { 
            return { cliente: undefined, mensagem: "Cliente não foi encontrado." };
        }
        return { cliente: clienteBusca, mensagem: `Cliente encontrado.` };
    }


}
