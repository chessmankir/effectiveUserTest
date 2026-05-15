import jwt from "jsonwebtoken";
import {prisma} from "../../../config/prisma";
import app from "../../../app";
import request from "supertest";


jest.mock("../../../config/prisma", () => ({
    prisma: {
        user: {
            findMany: jest.fn(),
            findUnique:  jest.fn(),
            update:  jest.fn(),
        }
    }
}))

const findManyMock = prisma.user.findMany as jest.Mock;
const findUniqueMock = prisma.user.findUnique as jest.Mock;
const updateMock = prisma.user.update as jest.Mock;

process.env.JWT_ACCESS_SECRET = "test_secret";

const createToken = (userId: string, role: string) => {
    return jwt.sign({ userId, role }, process.env.JWT_ACCESS_SECRET as string);
}

describe("Users",  () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Get /api/users без токена возвращает 401", async () => {
        const res = await request(app).get("/api/users");

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
        const res = await request(app)
            .get("/api/users")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
    })

    test("PATCH /api/users/:id/block админ блокирует пользователя", async () => {
        const token = createToken("1233", "admin");

        const userId = "123";
        updateMock.mockResolvedValue({
            id: userId,
            email: "leonid@mask.com",
            isActive: false,
        });

        const res = await request(app)
            .patch(`/api/users/${userId}/block`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(res.body.user.isActive).toBe(false);
    });

})