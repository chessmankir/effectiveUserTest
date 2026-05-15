"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../config/prisma");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
jest.mock("../../../config/prisma", () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    },
}));
const findUniqueMock = prisma_1.prisma.user.findUnique;
const createMock = prisma_1.prisma.user.create;
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
        const res = await (0, supertest_1.default)(app_1.default)
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
        const res = await (0, supertest_1.default)(app_1.default)
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
