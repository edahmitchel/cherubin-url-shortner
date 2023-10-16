"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup_1 = require("yup");
var loginSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .required('Email is required')
            .email('Invalid email format'),
        password: (0, yup_1.string)()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    })
});
exports.default = loginSchema;
