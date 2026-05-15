"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
const findUniqueMock = prisma_1.prisma.user.findUnique;
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
        bcrypt_1.default.compare.mockResolvedValue(true);
        const res = await (0, supertest_1.default)(app_1.default)
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
        bcrypt_1.default.compare.mockResolvedValue(false);
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/auth/login")
            .send({
            email,
            password: "wrong-password",
        });
        expect(res.status).toBe(401);
        expect(res.body.ok).toBe(false);
    });
});
