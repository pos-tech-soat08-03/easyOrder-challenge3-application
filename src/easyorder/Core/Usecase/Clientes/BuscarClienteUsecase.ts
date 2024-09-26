import { ClienteEntity } from "../../Entity/ClienteEntity";
import { CpfValueObject } from "../../Entity/ValueObject/CpfValueObject";
import { ClienteGatewayInterface } from "../../Gateway/ClienteGatewayInterface";

export class BuscarClientesUsecaseResponse {
  private mensagem: string | null = null;
  private cliente: ClienteEntity | null = null;

  constructor(message: string | null, cliente?: ClienteEntity | null) {
    if (message) {
      this.mensagem = message;
    }

    this.cliente = cliente || null;
  }

  public getMensagem() {
    return this.mensagem;
  }

  public getCliente() {
    return this.cliente;
  }
}

export class BuscarClienteUsecase {
  constructor(private readonly clienteGateway: ClienteGatewayInterface) {}

  public async execute(cpf: string): Promise<BuscarClientesUsecaseResponse> {
    try {
      if (!cpf) {
        throw new Error("Dados incorretos: CPF não informado.");
      }

      const cpfValue = new CpfValueObject(cpf);

      const cliente = await this.clienteGateway.buscarClientePorCpf(cpfValue);
      if (cliente === undefined) {
        throw new Error("Cadastro de Cliente não encontrado.");
      }

      return new BuscarClientesUsecaseResponse(
        "Cliente identificado com Sucesso.",
        cliente
      );
    } catch (error: any) {
      return new BuscarClientesUsecaseResponse(error.message, null);
    }
  }
}
