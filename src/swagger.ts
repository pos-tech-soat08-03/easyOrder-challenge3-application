const swaggerAutogen = require('swagger-autogen')({ language: 'pt-BR' });

const doc = {
  info: {
    title: 'easyOrder 1.0',
    description: 'Sistema de Gestão de Pedidos - Tech Challenge Pos Tech SOAT',
  },
  host: 'localhost:3000',

  schemes: ['http'],

  '@definitions': {
    ID: {
      type: "string",
      minLength: 36,
      maxLength: 36,
      format: "uuid",
      example: '29a81eeb-d16d-4d6c-a86c-e13597667307',
    },
    Produto: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        nome: {
          type: 'string',
          example: 'X-Bacon'
        },
        descricao: {
          type: 'string',
          example: 'Pão, hambúrguer, queijo, bacon, alface e tomate'
        },
        preco: {
          type: 'number',
          example: 20.0
        },
        categoria: {
          type: 'string',
          example: 'LANCHE'
        },
        imagemURL: {
          type: 'string',
          example: 'https://fakeimg.com/image.png'
        },
      },
    },
    Combo: {
      type: 'object',
      properties: {
        lanche: {
          $ref: '#/definitions/Produto',
        },
        bebida: {
          $ref: '#/definitions/Produto',
        },
        sobremesa: {
          $ref: '#/definitions/Produto',
        },
        acompanhamento: {
          $ref: '#/definitions/Produto',
        },
        valorTotal: {
          type: 'number',
          example: 50.0
        },
      },
    },
    Pedido: {
      type: 'object',
      properties: {
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
          $ref: '#/definitions/ID',
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
            $ref: '#/definitions/Combo',
          },
        },
        valorTotal: {
          type: 'number',
          example: 50.0
        },
      },
    }
  },
};

const outputFile = './swagger-output.json';
// const routes = ['./app.ts', './src/easyorder/Infrastructure/Input/**/*.ts'];
const routes = ['./app.ts', './easyorder/Infrastructure/Input/Endpoint/Pedido/CadastrarPedidoEndpoint.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);