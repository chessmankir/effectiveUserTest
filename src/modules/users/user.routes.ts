import {Router} from "express";
import {UsersController} from "./users.controllers";
import {authMiddleware} from "../../middlewares/auth.middleware";
import {adminOnly} from "../../middlewares/role.middleware";

const router = Router();
const userController = new UsersController();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить список пользователей
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Список пользователей
 */
router.get('/', authMiddleware, adminOnly, userController.getALl.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Пользователь найден
 *       404:
 *         description: Пользователь не найден
 */
router.get('/:id', authMiddleware, userController.getALl.bind(userController));

/**
 * @swagger
 * /api/users/{id}/block:
 *   patch:
 *     summary: Заблокировать пользователя
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *
 *     responses:
 *       200:
 *         description: Пользователь заблокирован
 *
 *       401:
 *         description: Не авторизован
 *
 *       404:
 *         description: Пользователь не найден
 */
router.patch(':id/block', authMiddleware, userController.blockUser.bind(userController));

export default router;