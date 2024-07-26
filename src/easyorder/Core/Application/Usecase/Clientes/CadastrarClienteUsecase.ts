import { Console } from "console";
import { ClienteEntity } from "../../../Domain/Entity/ClienteEntity";
import { ClienteRepositoryInterface } from "../../../Domain/Output/Repository/ClienteRepositoryInterface";

export class CadastrarClienteUsecaseResponse {
    private cliente: ClienteEntity;
    private status: boolean;
    constructor(status: boolean, cliente: ClienteEntity) { 
        this.cliente = cliente;
        this.status = status;
    }
    public getClienteResponse()  {
        if (this.status == true) return "Cliente cadastrado ou atualizado com sucesso! CPF: " + this.cliente.getCpf();
        return "Não foi possível cadastrar ou atualizar o cliente. Por favor, verifique os dados fornecidos.";
    }
}

export class CadastrarClienteUsecase {
     
    constructor(
        private readonly clienteRepository: ClienteRepositoryInterface
    ) { }

    public async execute (cpf: string, nome: string, email: string): Promise<CadastrarClienteUsecaseResponse> {

        // Validações iniciais
        if (!cpf ||!nome ||!email) {
            console.log('Todos os campos devem ser preenchidos');
            return new CadastrarClienteUsecaseResponse(false, new ClienteEntity('0', 'Erro', ''));
        }
        if (!cpf.match(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/)) {
            console.log('CPF inválido');
            return new CadastrarClienteUsecaseResponse(false, new ClienteEntity('0', 'Erro', ''));
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            console.log('Email inválido');
            return new CadastrarClienteUsecaseResponse(false, new ClienteEntity('0', 'Erro', ''));
        }

        // Buscar cliente já cadastrado no sistema
        const clienteExistente = this.clienteRepository.buscarClientePorCpf(cpf);
        if (clienteExistente) {
            console.log('Cliente já cadastrado no sistema');
            return new CadastrarClienteUsecaseResponse(true, clienteExistente);
        }
        // Salvar o cliente no repositório e retornar o resultado
        const cliente = new ClienteEntity(cpf, nome, email);
        this.clienteRepository.salvarCliente(cliente);
        return new CadastrarClienteUsecaseResponse(true, cliente);
    }

}
