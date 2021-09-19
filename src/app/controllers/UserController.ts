import { Request, Response } from "express";
import UserService from "../services/UserService";
import ServerHelper from "../helpers/serverHelper"
export default class UserController {
    async getUser(req: Request, res: Response){
        try {
            const user = await UserService.getUser(req.params.username)
            if (!user) throw new Error('User does not exist')
            else {
                const days = UserService.getDaystoBirth(user.dateOfBirth)
                switch(true) {
                    case (days == 0):
                        ServerHelper.sendJsonHttp200(res, {"message":`Hello, ${user.username}! Happy birthday!`})
                        break;
                    default:
                        ServerHelper.sendJsonHttp200(res, {"message":`Hello, ${user.username}! Your birthday is in ${days} day(s)`})
                        break;
                }
            }
        } catch (error) {
            ServerHelper.sendServerError(res, error)
        }
        
    }

    async putUser(req: Request, res: Response){
        try {
            req.body.username = req.params.username
            await UserService.putUser(req.body)
            ServerHelper.sendHttp204(res)
        } catch (error) {
            ServerHelper.parseError(res, error)
        }
    }

}