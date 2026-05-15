
import { prisma } from "../../../config/prisma";
import request from "supertest";
import app from "../../../app";
import bcrypt from "bcrypt";

jest.mock("../../../config/prisma", () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    },
}));

jest.mock("bcrypt", () => ({
    compare: jest.fn(),
    hash: jest.fn().mockResolvedValue("hash"),
}));

const findUniqueMock = prisma.user.findUnique as jest.Mock;

const email = "leonid@mask.com";
process.env.JWT_ACCESS_SECRET = "test_secret";

describe("Login", () => {
    test("POST /api/auth/login успешно логинит пользователя", async () => {
        findUniqueMock.mockResolvedValue({
            id: "1",
            firstName: "Leonid",
            lastName: "Skvoreshnikov",
            patronomyc: "Olegovich",
            birthDate: new Date("2000-01-01"),
            email,
            passwordHash: "hash",
            role: "user",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "12345678",
            });

        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(res.body.accessToken).toBeDefined();
        expect(res.body.user.email).toBe(email);
    });

    test("POST /api/auth/login возвращает 401 при неверном пароле", async () => {
        findUniqueMock.mockResolvedValue({
            id: "1",
            firstName: "Leonid",
            lastName: "Skvoreshnikov",
            patronomyc: "Olegovich",
            birthDate: new Date("2000-01-01"),
            email,
            passwordHash: "hash",
            role: "user",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email,
                password: "wrong-password",
            });

        expect(res.status).toBe(401);
        expect(res.body.ok).toBe(false);
    });
});