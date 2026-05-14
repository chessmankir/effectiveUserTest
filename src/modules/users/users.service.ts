import {prisma} from "../../config/prisma";

export class UsersService {
    async getUserById(id: string) {
        return prisma.user.findUnique({
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
        })
    }

    async getAll(){
        return prisma.user.findMany({
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
        })
    }

    async blockUser(id: string) {
        return prisma.user.update({
            where: {
                id: id,
            },
            data:{
                isActive: false,
            },
            select: {
                id: true,
                email: true,
                isActive: true,
            }
        })
    }
}