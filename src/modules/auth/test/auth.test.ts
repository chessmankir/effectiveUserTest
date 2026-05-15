import { prisma } from "../../../config/prisma";
import request from "supertest";
import app from "../../../app";

jest.mock("../../../config/prisma", () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    },
}));

const findUniqueMock = prisma.user.findUnique as jest.Mock;
const createMock = prisma.user.create as jest.Mock;

const email = "leonid@mask.com";

describe("Auth", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("POST /api/auth/register создает пользователя", async () => {
        findUniqueMock.mockResolvedValue(null);

        createMock.mockResolvedValue({
            id: "1",
            firstName: "Leonid",
            lastName: "Skvoreshnikov",
            patronomyc: "Olegovich",
            birthDate: new Date("2000-01-01"),
            email: email,
            passwordHash: "hash",
            role: "user",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                firstName: "Leonid",
                lastName: "Skvoreshnikov",
                patronomyc: "Olegovich",
                birthDate: "2000-01-01",
                email: email,
                password: "12345678",
            });

        expect(res.status).toBe(201);
        expect(res.body.ok).toBe(true);
        expect(res.body.user.email).toBe(email);
    });

    test("POST /api/auth/register возвращает 409 если email уже есть", async () => {
        findUniqueMock.mockResolvedValue({
            id: "1",
            firstName: "Leonid",
            lastName: "Skvoreshnikov",
            patronomyc: "Olegovich",
            birthDate: new Date("2000-01-01"),
            email: email,
            passwordHash: "hash",
            role: "user",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                firstName: "Leonid",
                lastName: "Skvoreshnikov",
                patronomyc: "Olegovich",
                birthDate: "2000-01-01",
                email: email,
                password: "12345678",
            });

        expect(res.status).toBe(409);
        expect(res.body.ok).toBe(false);
    });
});