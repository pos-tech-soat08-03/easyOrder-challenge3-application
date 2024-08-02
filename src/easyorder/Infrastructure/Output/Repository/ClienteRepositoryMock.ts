import { ClienteEntity } from "../../../Core/Domain/Entity/ClienteEntity";
import { ClienteRepositoryInterface } from "../../../Core/Domain/Output/Repository/ClienteRepositoryInterface";
import { CpfValueObject } from "../../../Core/Domain/ValueObject/CpfValueObject";
import { EmailValueObject } from "../../../Core/Domain/ValueObject/EmailValueObject";



export class ClienteRepositoryMock implements ClienteRepositoryInterface {

    private clientes: ClienteEntity[];

    constructor() {
        // dados mockados
        this.clientes = [
            new ClienteEntity (new CpfValueObject('414.520.324-08'), 'João de Oliveira', new EmailValueObject('joao.oliveira@uol.com.br')),
            new ClienteEntity (new CpfValueObject('044.622.200-30'), 'Maria Aparecida de Castro e Silva', new EmailValueObject('maria.cida+easyorder2231@gmail.com')),
            new ClienteEntity (new CpfValueObject('592.576.633-45'), 'Cláudia Regina Esposito', new EmailValueObject('clau456@hotmail.com'))
        ];
    }

    public listarClientes(): ClienteEntity[] {
        return this.clientes;
    }

    public buscarClientePorCpf(cpf: CpfValueObject): ClienteEntity | undefined {
        return this.clientes.find(cliente => { 
            cliente.getCpf().getValue() == cpf.getValue();
        });
    }

    public adicionarCliente(cliente: ClienteEntity): boolean {
        if (this.buscarClientePorCpf(cliente.getCpf()) == undefined) {
            return false;
        }
        this.clientes.push(cliente);
        return true;
    }

    public removerCliente(cliente: ClienteEntity): boolean {
        if (this.buscarClientePorCpf(cliente.getCpf()) == undefined) {
            return false;
        }
        this.clientes.filter(cliente_unit => { 
            cliente_unit.getCpf() !== cliente.getCpf();
        })
        return true;
    }

    public atualizarCliente(cliente: ClienteEntity, novoCliente: ClienteEntity): boolean {
        if (this.buscarClientePorCpf(cliente.getCpf()) == undefined) {
            return false;
        }
        const indice = this.clientes.findIndex(cliente_unit => { 
            cliente_unit.getCpf() !== cliente.getCpf();
        })
        this.clientes[indice] = novoCliente;
        return true;
    }

}