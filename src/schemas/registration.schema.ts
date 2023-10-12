import { object, string, ref } from 'yup';

const registrationSchema = object({
    username: string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must not exceed 30 characters'),
    email: string()
        .required('Email is required')
        .email('Invalid email format'),
    password: string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export default registrationSchema;
