import { object, string } from 'yup';

const loginSchema = object({
    email: string()
        .required('Email is required')
        .email('Invalid email format'),
    password: string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export default loginSchema;
