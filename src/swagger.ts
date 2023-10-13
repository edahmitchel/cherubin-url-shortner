import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Short URL API',
            version: '1.0.0',
            description: 'API documentation for the Short URL service',
        },
    },
    apis: ['./src/routes/index.ts'], // Specify the file containing your route definitions
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
