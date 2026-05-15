import {Response} from 'express';
import {UsersService} from "./users.service";
import {AuthRequest} from "../../middlewares/auth.middleware";

const userService = new UsersService();

export class UsersController {
   async getUserById(req: AuthRequest, res: Response) {
       const id =  String(req.params.id);

       const isAdmin = req.user?.role === 'admin';
       const isOwer = req.user?.userId === id;


       if (!isAdmin && !isOwer) {
           return res.status(403).json({
               ok: false,
               message: "Можно получить только себя или нужен admin",
           });
       }

       const user = await userService.getUserById(id);

       if(!user) {
           return res.status(404).json({
               ok: false,
               message: "Не найден",
           })
       }

       return res.status(200).json({
           ok: true,
           user
       })
   }

   async getALl(req: AuthRequest, res: Response) {
       const users = await userService.getAll();

       return res.json({
           ok: true,
           users,
       });
   }

   async blockUser(req: AuthRequest, res: Response) {
       const  id  = String(req.params.id);

       const isAdmin = req.user?.role === 'admin';

       if(!isAdmin){
           return res.status(403).json({
               ok: false,
               message: "Нет админских прав"
           })
       }

       const user = await userService.blockUser(id);

       return res.json({
           ok: true,
           message: "Заблокирован",
           user
       })
   }
}