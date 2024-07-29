import { ClienteEntity } from "../../Entity/ClienteEntity";
import { CpfValueObject } from "../../ValueObject/CpfValueObject";

export interface ClienteRepositoryInterface {
    listarClientes(): ClienteEntity[];
    salvarCliente(cliente: ClienteEntity): void;
    buscarClientePorCpf(cpf: CpfValueObject): ClienteEntity | undefined;
}
