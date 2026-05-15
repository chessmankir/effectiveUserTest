import {prisma} from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {unwatchFile} from "node:fs";

export class AuthService{
    async register(userData: UserType){
        const existingUser = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        });
        if (existingUser) {
            throw new Error("USER_ALREADY_EXISTS");
        }
        const passwordHash = await bcrypt.hash(userData.password, 10);

        const user = await prisma.user.create({
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
        })

        return user;
    }

    async login(email: string, password: string){
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (!user) {
            throw new Error("пользователь не найден");
        }

        if(!user.isActive){
            throw new  Error('Users blocked')
        }

        const accessToken = jwt.sign({
            userId: user.id,
            role: user.role,
        },
            process.env.JWT_ACCESS_SECRET as string, {expiresIn: "1h"}
        );

        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
            }
        }
    }
}