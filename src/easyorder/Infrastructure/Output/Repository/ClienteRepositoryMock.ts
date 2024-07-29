import { ClienteEntity } from "../../../Core/Domain/Entity/ClienteEntity";
import { ClienteRepositoryInterface } from "../../../Core/Domain/Output/Repository/ClienteRepositoryInterface";
import { CpfValueObject } from "../../../Core/Domain/ValueObject/CpfValueObject";
import { EmailValueObject } from "../../../Core/Domain/ValueObject/EmailValueObject";


export class ClienteRepositoryMock implements ClienteRepositoryInterface {

    constructor() {
        // inicializar um array com dados mockados 
    }

    public listarClientes(): ClienteEntity[] {
        // implementar a lógica de listagem de clientes
        return new Array<ClienteEntity>();
    }

    public salvarCliente(cliente: ClienteEntity): void {
        // implementar a lógica de salvar um novo cliente
        return;
    }

    buscarClientePorCpf(cpf: CpfValueObject): ClienteEntity | undefined {
        if (cpf.getValue() == "100.000.000-00") {
            return undefined;
        }

        // implementar a lógica de buscar um cliente pelo CPF
        return new ClienteEntity(cpf, 'Nome Cliente Mock', new EmailValueObject('example@sample.com'));
    }
}