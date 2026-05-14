import {AuthService} from "./auth.service";
import { Request, Response } from "express";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response){
        try{
            const user = await authService.register(req.body);
            return res.status(201).json({
                ok: true,
                user
            })
        }
        catch (error: any) {
            if(error.message === 'USER_ALREADY_EXISTS'){
                return  res.status(409).json({
                    ok: false,
                    message: "Пользователь с таким именем существует",
                })
            }

            return res.status(500).json({
                ok: false,
                message: "Ошибка сервера"
            })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            return res.status(200).json({
                ok: true,
                ...result
            })
        }
        catch (error: any) {
            if (error.message === 'INVALID_CREDENTIALS'){
                return res.status(401).json({
                    ok: false,
                    message: "Неверный email или пароль"
                })
            }

            if(error.message === 'USER_BLOCKED'){
                return res.status(403).json({
                    ok: false,
                    message: "Пользователь заблокирован"
                })
            }

            return res.status(500).json({
                ok: false,
                message: 'Ошибка сервера'
            })
        }
    }
}