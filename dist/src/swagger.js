"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var options = {
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
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
