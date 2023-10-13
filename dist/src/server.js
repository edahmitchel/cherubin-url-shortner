"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var db_1 = __importDefault(require("./database/db"));
var dotenv_1 = __importDefault(require("dotenv"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_1 = __importDefault(require("./swagger")); // Import the Swagger configuration
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.port;
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.listen(port, function () {
    console.log("listening on port ".concat(port));
    (0, db_1.default)();
    (0, routes_1.default)(app);
});
