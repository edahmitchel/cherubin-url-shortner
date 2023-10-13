"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup_1 = require("yup");
var registrationSchema = (0, yup_1.object)({
    username: (0, yup_1.string)()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must not exceed 30 characters'),
    email: (0, yup_1.string)()
        .required('Email is required')
        .email('Invalid email format'),
    password: (0, yup_1.string)()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});
exports.default = registrationSchema;
