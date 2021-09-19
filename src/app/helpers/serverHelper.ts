import { Response } from "express";
export interface IErrorMongoose extends Error {
    code   : number
    errmsg : string
    errors : object[]
    msg    : string
    error  : string
}
export interface IDelete {
    ok?: number | undefined
    n?: number | undefined
}
export default class ServerHelper {
    static sendNotFoundError(res : Response) {
        res.status(404);
        res.json({ error : 'Not Found' })  
    }
    static sendHttp400(res: Response, data: object){
        res.status(400);
        res.json(data);
    }
    static sendJsonHttp200(res : Response, data : object) {
        res.status(200);
        res.json(data);
    }
    static sendHttp204(res: Response) {
        res.status(204);
        res.send()
    }
    static sendServerError(res : Response, error : object) {
        res.status(500)
        console.log(error)
        res.json({ error: error })
    }
    static parseError(res: Response, error: IErrorMongoose) {
        switch (error.name) {
            case "ValidationError": {
                this.parseValidationError(res, error)
                break
            }
            default: {
                this.sendServerError(res, error)
                break
            }
        }    
    }
    static parseValidationError(res: Response, error: IErrorMongoose){
        if (error.errors.hasOwnProperty('dateOfBirth')) { 
            this.sendHttp400(res,{error: "dateOfBirth incorrect"}) 
        }
        else if (error.errors.hasOwnProperty('username')) { 
            this.sendHttp400(res,{error: "Username not allowed, cannot contain numbers."})
        }
        else { 
            this.sendServerError(res,{error: "Server Error"}) 
        }
    }

}