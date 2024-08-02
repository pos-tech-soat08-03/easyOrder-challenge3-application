import { ClienteEntity } from "../../Entity/ClienteEntity";
import { CpfValueObject } from "../../ValueObject/CpfValueObject";

export interface ClienteRepositoryInterface {
    listarClientes(): ClienteEntity[];
    adicionarCliente(cliente: ClienteEntity): boolean;
    atualizarCliente(cliente: ClienteEntity, novoCliente: ClienteEntity): boolean;
    removerCliente(cliente: ClienteEntity): boolean;
    buscarClientePorCpf(cpf: CpfValueObject): ClienteEntity | undefined;
}
