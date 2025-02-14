const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Estoque',
      version: '1.0.0',
      description: 'API para gerenciar matéria-prima, produtos e fornecedores',
    },
    servers: [
      {
        url: 'http://localhost:5560',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho onde estão as rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
