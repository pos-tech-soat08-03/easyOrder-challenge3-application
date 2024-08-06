const swaggerAutogen = require('swagger-autogen')({ language: 'pt-BR' });

const doc = {
  info: {
    title: 'easyOrder 1.0',
    description: 'Sistema de Gestão de Pedidos - Tech Challenge Pos Tech SOAT',
  },
  host: 'localhost:3000',

  schemes: ['http'],

  definitions: {
    ID: {
      type: "string",
      minLength: 36,
      maxLength: 36,
      format: "uuid",
      example: '29a81eeb-d16d-4d6c-a86c-e13597667307',
    },
    PedidoResponse: {
      id: {
        schema: {
          $ref: '#/definitions/ID',
        },
      },
      data: {
        type: 'string',
        example: '2021-10-10T15:00:00.000Z'
      },
      clienteId: {
        schema: {
          $ref: '#/definitions/ID',
        },
      },
      status: {
        type: 'string',
        example: 'RASCUNHO'
      },
      pagamentoStatus: {
        type: 'string',
        example: 'PENDENTE'
      },
      combos: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            lanche: {
              type: 'object',
              properties: {
                id: {
                  schema: {
                    $ref: '#/definitions/ID',
                  },
                },
                nome: {
                  type: 'string',
                  example: 'X-Bacon'
                },
                preco: {
                  type: 'number',
                  example: 20.0
                },
              },
            },
            bebida: {
              type: 'object',
              properties: {
                id: {
                  schema: {
                    $ref: '#/definitions/ID',
                  },
                },
                nome: {
                  type: 'string',
                  example: 'Coca-Cola'
                },
                preco: {
                  type: 'number',
                  example: 5.0
                },
              },
            },
            sobremesa: {
              type: 'object',
              properties: {
                id: {
                  schema: {
                    $ref: '#/definitions/ID',
                  },
                },
                nome: {
                  type: 'string',
                  example: 'Sorvete'
                },
                preco: {
                  type: 'number',
                  example: 10.0
                },
              },
            },
            acompanhamento: {
              type: 'object',
              properties: {
                id: {
                  schema: {
                    $ref: '#/definitions/ID',
                  },
                },
                nome: {
                  type: 'string',
                  example: 'Batata Frita'
                },
                preco: {
                  type: 'number',
                  example: 15.0
                },
              },
            },
          },
        },
      },
    }
  },
};

const outputFile = './swagger-output.json';
const routes = ['./app.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);