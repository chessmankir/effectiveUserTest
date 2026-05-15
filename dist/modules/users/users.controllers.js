"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("./users.service");
const userService = new users_service_1.UsersService();
class UsersController {
    async getUserById(req, res) {
        const id = String(req.params.id);
        const isAdmin = req.user?.role === 'admin';
        const isOwer = req.user?.userId === id;
        if (!isAdmin && !isOwer) {
            return res.status(403).json({
                ok: false,
                message: "Можно получить только себя или нужен admin",
            });
        }
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: "Не найден",
            });
        }
        return res.status(200).json({
            ok: true,
            user
        });
    }
    async getAll(req, res) {
        console.log("getAll");
        try {
            const users = await userService.getAll();
            console.log(users);
            return res.json({
                ok: true,
                users,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: "SERVER_ERROR",
            });
        }
    }
    async blockUser(req, res) {
        const id = String(req.params.id);
        const isAdmin = req.user?.role === 'admin';
        if (!isAdmin) {
            return res.status(403).json({
                ok: false,
                message: "Нет админских прав"
            });
        }
        const user = await userService.blockUser(id);
        return res.json({
            ok: true,
            message: "Заблокирован",
            user
        });
    }
}
exports.UsersController = UsersController;
