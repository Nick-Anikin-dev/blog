const jwt = require('jsonwebtoken')
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.headers['user'] = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Unauthorized"})
    }
};
