import { ClienteEntity } from "../../Entity/ClienteEntity";
import { CpfValueObject } from "../../Entity/ValueObject/CpfValueObject";
import { EmailValueObject } from "../../Entity/ValueObject/EmailValueObject";
import { ClienteGatewayInterface } from "../../Gateway/ClienteGatewayInterface";

export class AtualizarClienteUsecaseResponse {
  private sucesso_atualizacao: boolean;
  private mensagem: string | null = null;
  private cliente: ClienteEntity | null = null;

  constructor(
    sucesso_atualizacao: boolean,
    message: string | null,
    cliente?: ClienteEntity | null
  ) {
    this.sucesso_atualizacao = sucesso_atualizacao;

    if (message) {
      this.mensagem = message;
    }

    this.cliente = cliente || null;
  }

  public getSucessoAtualizacao() {
    return this.sucesso_atualizacao;
  }

  public getMensagem() {
    return this.mensagem;
  }

  public getCliente() {
    return this.cliente;
  }
}

export class AtualizarClienteUsecase {
  constructor(private readonly clienteGateway: ClienteGatewayInterface) {}

  public async execute(
    cpf: string,
    nome: string,
    email: string
  ): Promise<AtualizarClienteUsecaseResponse> {
    try {
      if (!cpf) {
        throw new Error("Dados incorretos: CPF não informado.");
      }

      const cpfValue = new CpfValueObject(cpf);
      const emailValue = new EmailValueObject(email);

      // Buscar cliente já cadastrado no sistema
      const clienteExistente = await this.clienteGateway.buscarClientePorCpf(
        cpfValue
      );
      if (clienteExistente === undefined) {
        throw new Error("Cliente não encontrado.");
      }

      const cliente = new ClienteEntity(
        cpfValue,
        nome,
        emailValue,
        clienteExistente.getId()
      );
      const sucesso = await this.clienteGateway.atualizarCliente(
        clienteExistente,
        cliente
      );

      if (sucesso)
        return new AtualizarClienteUsecaseResponse(
          true,
          "Cliente atualizado com sucesso.",
          cliente
        );
      throw new Error("Erro ao atualizar cliente.");
    } catch (error: any) {
      return new AtualizarClienteUsecaseResponse(false, error.message);
    }
  }
}
