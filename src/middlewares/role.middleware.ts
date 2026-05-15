import {NextFunction, Request, Response} from 'express';
import {AuthRequest} from "./auth.middleware";

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
    console.log(req.user);
    if(req.user?.role !== 'admin') {
        return res.status(403).json({
            ok: false,
            message: 'Доступно только админам',
        })
    }
    next();
}