"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET;
function authenticateToken(req, res, next) {
    var authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    var _a = authHeader.split(' '), tokenType = _a[0], token = _a[1];
    if (tokenType !== 'Bearer' || !token) {
        return res.status(403).json({ message: 'Unauthorized - Invalid token format' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized - Invalid token' });
        }
        req.user = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;
