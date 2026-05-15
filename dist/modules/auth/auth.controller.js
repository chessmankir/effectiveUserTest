"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            return res.status(201).json({
                ok: true,
                user
            });
        }
        catch (error) {
            console.log(error);
            if (error.message === 'USER_ALREADY_EXISTS') {
                return res.status(409).json({
                    ok: false,
                    message: "Пользователь с таким именем существует",
                });
            }
            return res.status(500).json({
                ok: false,
                message: "Ошибка сервера"
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            console.log(result);
            return res.status(200).json({
                ok: true,
                ...result
            });
        }
        catch (error) {
            console.log(error);
            if (error.message === 'USER_BLOCKED') {
                return res.status(403).json({
                    ok: false,
                    message: "Пользователь заблокирован"
                });
            }
            if (error.message === "USER_NOT_FOUND" || error.message === "INVALID_PASSWORD") {
                return res.status(401).json({
                    ok: false,
                    message: "Неверный email или пароль",
                });
            }
            return res.status(500).json({
                ok: false,
                message: 'Ошибка сервера'
            });
        }
    }
}
exports.AuthController = AuthController;
