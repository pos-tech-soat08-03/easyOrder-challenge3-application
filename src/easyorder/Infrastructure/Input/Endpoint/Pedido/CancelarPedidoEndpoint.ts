
import { Request, Response } from 'express';
import { PedidoRepositoryMock } from '../../../Output/Repository/PedidoRepositoryMock';
import { CancelarPedidoUsecase } from '../../../../Core/Application/Usecase/Pedidos/CancelarPedidoUsecase';

export class CancelarPedidoEndpoint {

    public static async handle(req: Request, res: Response): Promise<void> {
        /**
            #swagger.tags = ['Pedidos']
            #swagger.path = '/pedidos/cancelar/{pedidoId}'
            #swagger.method = 'post'
            #swagger.summary = 'Cancelar um pedido'
            #swagger.description = 'Endpoint para cancelamento de um pedido'
            #swagger.produces = ["application/json"]
            #swagger.parameters['pedidoId'] = {
                in: 'path',
                description: 'ID do pedido',
                required: true,
                type: 'string',
                example: '29a81eeb-d16d-4d6c-a86c-e13597667307'
            }
        */
        try {

            const pedidoRepository = new PedidoRepositoryMock();

            const usecase = new CancelarPedidoUsecase(
                pedidoRepository
            );

            const pedidoId: string = req.params.pedidoId;

            if (!pedidoId) {
                throw new Error('Pedido não informado');
            }

            const result = await usecase.execute(pedidoId);

            if (!result.getSucessoCancelamento()) {
                throw new Error(result.getMensagem());
            }

            /**
            #swagger.responses[200] = {
                'description': 'Pedido cancelado com sucesso',
                '@schema': {
                    'properties': {
                        mensagem: {
                            type: 'string',
                            example: 'Pedido cadastrado com sucesso'
                        },
                        pedido: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string',
                                    example: '29a81eeb-d16d-4d6c-a86c-e13597667307'
                                },
                                data: {
                                    type: 'string',
                                    example: '2021-10-10T15:00:00.000Z'
                                },
                                clienteId: {
                                    type: 'string',
                                    example: '29a81eeb-d16d-4d6c-a86c-e13597667307'
                                },
                                status: {
                                    type: 'string',
                                    example: 'RASCUNHO'
                                },
                                pagamentoStatus: {
                                    type: 'string',
                                    example: 'PENDENTE'
                                }
                            }
                        }
                    }
                }
            }
            */
            res.json({
                mensagem: result.getMensagem(),
                pedido: result.getPedido() ? {
                    id: result.getPedido()?.getId(),
                    data: result.getPedido()?.getDataPedido(),
                    clienteId: result.getPedido()?.getClienteId(),
                    status: result.getPedido()?.getStatusPedido().getValue(),
                    pagamentoStatus: result.getPedido()?.getStatusPagamento(),
                } : null
            });

        } catch (error: any) {
            /**
            #swagger.responses[500] = {
                'description': 'Ocorreu um erro inesperado',
                '@schema': {
                    'properties': {
                        mensagem: {
                            type: 'string',
                            example: 'Ocorreu um erro inesperado: Pedido não encontrado'
                        }
                    }
                }
            }
            */
            res.status(400).json({
                mensagem: 'Ocorreu um erro inesperado: ' + error.message,
            });
            throw error;
        }

        return;

    }

}
