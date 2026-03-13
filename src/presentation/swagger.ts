import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

// Configuración base de nuestra API para Swagger
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth REST API - Clean Architecture',
      version: '1.0.0',
      description: 'API de autenticación construida con principios SOLID y Clean Architecture.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local de Desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Le decimos a Swagger dónde buscar los comentarios de documentación
  apis: ['./src/presentation/**/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (router: Router) => {
  // Exponemos la interfaz gráfica en la ruta /api-docs
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};