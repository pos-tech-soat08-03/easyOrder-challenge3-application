import { ClienteEntity } from "../../../Core/Domain/Entity/ClienteEntity";
import { ClienteRepositoryInterface } from "../../../Core/Domain/Output/Repository/ClienteRepositoryInterface";


export class ClienteRepositoryMock implements ClienteRepositoryInterface {
    
    constructor() { 
        // inicializar um array com dados mockados para testes futuros
    }

    public listarClientes (): ClienteEntity[] {
        // implementar a lógica de listagem de clientes
        return new Array<ClienteEntity>();
    }
    
    public salvarCliente (cliente: ClienteEntity): void {
        // implementar a lógica de salvar um novo cliente
        return;
    }
    
    buscarClientePorCpf (cpf: string): ClienteEntity | undefined {
        // implementar a lógica de buscar um cliente pelo CPF
        if (cpf === '000.000.000-00') return;
        return new ClienteEntity('123.456.789-00', 'Nome Cliente Mock', 'email@example.com');
    }
}