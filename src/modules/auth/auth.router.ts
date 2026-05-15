import {Router} from "express";
import {AuthController} from "./auth.controller";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - patronomyc
 *               - birthDate
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Иван
 *               lastName:
 *                 type: string
 *                 example: Иванов
 *               patronomyc:
 *                 type: string
 *                 example: Иванович
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 2000-01-15
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@mail.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Ошибка валидации
 */
router.post("/register", authController.register.bind(authController));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Логин пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@mail.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверный email или пароль
 */
router.post("/login", authController.login.bind(authController));

export default router;



