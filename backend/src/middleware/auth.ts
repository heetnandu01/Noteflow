import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/User.js";


interface AuthRequest extends Request {
    user?: IUser; //Extend Request to include user property
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {

        let token = req.cookies.token;

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer')) {
                token = authHeader.split(' ')[1]; // Extract token from bearer scheme
            }
        }

        if (!token) {
            res.status(401).json({ error: 'Authentication token is missing' });
            return
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT secret is not defined in environment variables');
            res.status(500).json({ error: 'Server configuration error' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };

        const user = await User.findById(decoded.userId).select('-password'); // Exclude password from user data

        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        req.user = user; // Attach user to the request object
        next(); // Proceed to the next middleware or route handler


    } catch (error) {
        console.error('Auth middleware error: ', error);
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: 'Invalid token' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: 'Token expired' });
        } else {
            res.status(401).json({ error: 'Authentication failed' });
        }
    }
}


export {AuthRequest};