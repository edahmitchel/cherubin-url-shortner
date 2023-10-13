import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Short URL API',
            version: '1.0.0',
            description: 'API documentation for the Short URL service',
        },
        servers: [

            {
                url: 'https://cherubin-shortner.onrender.com/api',
            },
        ]
    },
    apis: ['./src/routes/index.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
