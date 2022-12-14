import { ApiError } from "../errors/ApiError";
import { NextFunction, Request, Response } from "express";

export const errorHandlingMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Something went wrong"})
}
