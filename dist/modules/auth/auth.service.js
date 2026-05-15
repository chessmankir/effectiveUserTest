"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = require("../../config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    async register(userData) {
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: {
                email: userData.email
            }
        });
        if (existingUser) {
            throw new Error("USER_ALREADY_EXISTS");
        }
        const passwordHash = await bcrypt_1.default.hash(userData.password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                patronomyc: userData.patronomyc,
                birthDate: new Date(userData.birthDate),
                email: userData.email,
                passwordHash,
                role: "user",
                isActive: true,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                patronomyc: true,
                birthDate: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
            }
        });
        return user;
    }
    async login(email, password) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        if (!user.isActive) {
            throw new Error("USER_BLOCKED");
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error("INVALID_PASSWORD");
        }
        const accessToken = jsonwebtoken_1.default.sign({
            userId: user.id,
            role: user.role,
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: "1h" });
        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
            },
        };
    }
}
exports.AuthService = AuthService;
