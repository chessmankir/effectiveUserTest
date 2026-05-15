"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const auhtHeader = req.headers.authorization;
    if (!auhtHeader) {
        return res.status(401).json({
            ok: false,
            message: 'Нет токена',
        });
    }
    const token = auhtHeader.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            message: "Невалидный токен",
        });
    }
}
