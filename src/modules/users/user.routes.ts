import {Router} from "express";
import {UsersController} from "./users.controllers";
import {authMiddleware} from "../../middlewares/auth.middleware";
import {adminOnly} from "../../middlewares/role.middleware";

const router = Router();
const userController = new UsersController();

router.get('/', authMiddleware, adminOnly, userController.getALl.bind(userController));
router.get('/:id', authMiddleware, userController.getALl.bind(userController));
router.patch(':id/block', authMiddleware, userController.blockUser.bind(userController));

export default router;