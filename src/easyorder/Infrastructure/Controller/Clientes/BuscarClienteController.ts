import express from "express";
import { ClienteGatewayInterface } from "../../../Core/Gateway/ClienteGatewayInterface";
import { BuscarClienteUsecase } from "../../../Core/Usecase/Clientes/BuscarClienteUsecase";

export class BuscarClienteController {
  constructor(private clienteGateway: ClienteGatewayInterface) {
    this.handle = this.handle.bind(this);
  }

  public async handle(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    /**
            #swagger.summary = 'Buscar Cliente do Restaurante por CPF.'
            #swagger.description = 'A busca de Cliente por CPF permite que o Cliente seja identificado nas próximas etapas por ID.
            #swagger.tags = ['Clientes']
            #swagger.path = '/cliente/buscar/{cpf}'
            #swagger.method = 'get'
            #swagger.produces = ["application/json"]
            #swagger.parameters['cpf'] = {
                in: 'path',
                description: 'CPF do Cliente sem pontuação',
                required: true,
                type: 'string',
                example: '00000000000'
            }
        */

    const usecase = new BuscarClienteUsecase(this.clienteGateway);

    try {
      const cpf: string = req.params.cpf;

      if (!cpf) {
        throw new Error("CPF não informado");
      }

      const result = await usecase.execute(cpf);

      res.json({
        mensagem: result.getMensagem(),
        cliente: result.getCliente()
          ? {
              id: result.getCliente()?.getId(),
              cpf: result.getCliente()?.getCpf().getFormatado(),
              nome: result.getCliente()?.getNome(),
              email: result.getCliente()?.getEmail().getValue(),
            }
          : null,
      });
    } catch (error: any) {
      res.status(400).json({
        mensagem: error.message,
        cliente: null,
      });
      return;
    }
  }
}
