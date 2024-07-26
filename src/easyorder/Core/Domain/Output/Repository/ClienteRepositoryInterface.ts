import { ClienteEntity } from "../../Entity/ClienteEntity";

export interface ClienteRepositoryInterface {
    listarClientes (): ClienteEntity[];
    salvarCliente (cliente: ClienteEntity): void;
    buscarClientePorCpf (cpf: string): ClienteEntity | undefined;
}
