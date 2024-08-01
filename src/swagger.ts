const swaggerAutogen = require('swagger-autogen')({ language: 'pt-BR' });

const doc = {
  info: {
    title: 'easyOrder 1.0',
    description: 'Sistema de Gestão de Pedidos - Tech Challenge Pos Tech SOAT',
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./app.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);