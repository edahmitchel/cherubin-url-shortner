// controllers/user.controller.js
import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function registerUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        return res.status(500).json({ message: 'User registration failed', error });
    }
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET as string);

        return res.status(200).json({ message: 'Login successful', token, user: { username: user.username, email: user.email } });
    } catch (error) {
        return res.status(500).json({ message: 'Login failed', error });
    }
}