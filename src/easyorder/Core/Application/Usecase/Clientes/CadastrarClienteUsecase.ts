import { ClienteEntity } from "../../../Domain/Entity/ClienteEntity";
import { ClienteRepositoryInterface } from "../../../Domain/Output/Repository/ClienteRepositoryInterface";

export class CadastrarClienteUsecaseResponse {
    protected sucesso_cadastro: boolean;
    protected cliente_existente: boolean;
    private cliente: ClienteEntity;

    constructor(sucesso_cadastro: boolean, cliente_existente: boolean, cliente: ClienteEntity) { 
        this.cliente = cliente;
        this.sucesso_cadastro = sucesso_cadastro;
        this.cliente_existente = cliente_existente;
    }

    public getClienteResponse()  {
        return [ this.cliente.getId(), this.cliente.getNome(), this.cliente.getEmail(), this.cliente.getCpf() ];
    }

    public getSucessoCadastro() {
        return this.sucesso_cadastro;
    }    

    public getClienteExistente() {
        return this.cliente_existente;
    }
}

export class CadastrarClienteUsecase {
     
    constructor(
        private readonly clienteRepository: ClienteRepositoryInterface
    ) { }

    public async execute (cpf: string, nome: string, email: string): Promise<CadastrarClienteUsecaseResponse> {

        // Validações iniciais
        if (!cpf ||!nome ||!email) {
            return new CadastrarClienteUsecaseResponse(false, false, new ClienteEntity('0', 'Erro', ''));
        }
        if (!cpf.match(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/)) {
            return new CadastrarClienteUsecaseResponse(false, false, new ClienteEntity('0', 'Erro', ''));
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return new CadastrarClienteUsecaseResponse(false, false, new ClienteEntity('0', 'Erro', ''));
        }

        // Buscar cliente já cadastrado no sistema
        const clienteExistente = this.clienteRepository.buscarClientePorCpf(cpf);
        if (clienteExistente) {
            return new CadastrarClienteUsecaseResponse(true, true, clienteExistente);
        }
        // Salvar o cliente no repositório e retornar o resultado
        const cliente = new ClienteEntity(cpf, nome, email);
        this.clienteRepository.salvarCliente(cliente);
        return new CadastrarClienteUsecaseResponse(true, false, cliente);
    }

}
