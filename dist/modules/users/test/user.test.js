"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../../config/prisma");
const app_1 = __importDefault(require("../../../app"));
const supertest_1 = __importDefault(require("supertest"));
jest.mock("../../../config/prisma", () => ({
    prisma: {
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
        }
    }
}));
const findManyMock = prisma_1.prisma.user.findMany;
const findUniqueMock = prisma_1.prisma.user.findUnique;
const updateMock = prisma_1.prisma.user.update;
process.env.JWT_ACCESS_SECRET = "test_secret";
const createToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ userId, role }, process.env.JWT_ACCESS_SECRET);
};
describe("Users", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Get /api/users без токена возвращает 401", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/users");
        expect(res.status).toBe(401);
        expect(res.body.ok).toBe(false);
    });
    test("GET /api/users без токена возвращает 401", async () => {
        const token = createToken("1233", "admin");
        findManyMock.mockResolvedValue([
            {
                id: "1",
                firstName: "Leonid",
                lastName: "Skvoreshnikov",
                patronomyc: "Olegovich",
                birthDate: new Date("2000-01-01"),
                email: "leonid@mask.com",
                passwordHash: "hash",
                role: "user",
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
        const res = await (0, supertest_1.default)(app_1.default)
            .get("/api/users")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
    });
    test("PATCH /api/users/:id/block админ блокирует пользователя", async () => {
        const token = createToken("1233", "admin");
        const userId = "123";
        updateMock.mockResolvedValue({
            id: userId,
            email: "leonid@mask.com",
            isActive: false,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .patch(`/api/users/${userId}/block`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(res.body.user.isActive).toBe(false);
    });
});
