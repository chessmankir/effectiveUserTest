"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const prisma_1 = require("../../config/prisma");
class UsersService {
    async getUserById(id) {
        return prisma_1.prisma.user.findUnique({
            where: {
                id: id
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
                updatedAt: true,
            }
        });
    }
    async getAll() {
        return prisma_1.prisma.user.findMany({
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
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc",
            }
        });
    }
    async blockUser(id) {
        return prisma_1.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                isActive: false,
            },
            select: {
                id: true,
                email: true,
                isActive: true,
            }
        });
    }
}
exports.UsersService = UsersService;
