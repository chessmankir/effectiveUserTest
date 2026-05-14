import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export type AuthRequest = Request & {
    user?: {
        userId: string;
        role: string;
    }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const auhtHeader = req.headers.authorization;
    if (!auhtHeader) {
        return res.status(401).json({
            ok: false,
            message: 'Нет токена',
        })
    }
    const token = auhtHeader.split(' ')[1];

    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET as string,
        ) as {
            userId: string;
            role: string;
        };

        req.user = payload;
        next();

    }
    catch(error: any) {
        return res.status(401).json({
            ok: false,
            message: "Невалидный токен",
        });
    }
}