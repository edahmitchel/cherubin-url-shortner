// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';


const JWT_SECRET = process.env.JWT_SECRET as string;
declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer' || !token) {
        return res.status(403).json({ message: 'Unauthorized - Invalid token format' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized - Invalid token' });
        }
        req.user = user;
        next();
    });
}
