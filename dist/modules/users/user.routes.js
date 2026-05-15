"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("./users.controllers");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const router = (0, express_1.Router)();
const userController = new users_controllers_1.UsersController();
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
router.get('/', auth_middleware_1.authMiddleware, role_middleware_1.adminOnly, userController.getAll.bind(userController));
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
router.get('/:id', auth_middleware_1.authMiddleware, userController.getUserById.bind(userController));
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
router.patch('/:id/block', auth_middleware_1.authMiddleware, userController.blockUser.bind(userController));
exports.default = router;
