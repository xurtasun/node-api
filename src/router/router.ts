import ServerHelper from '../app/helpers/serverHelper';
import {Request, Response, Application} from 'express';
import UserController from '../app/controllers/UserController'
import fs from 'fs'
import path from 'path'

export default (app: Application) => {
    app.get('/hello/:username', (req: Request, res: Response)=>{
        new UserController().getUser(req,res)
    })
    app.put('/hello/:username', (req: Request, res: Response)=>{
        new UserController().putUser(req,res)
    })
    app.get('/ping', (_, res: Response)=>{
        ServerHelper.sendJsonHttp200(res, {})
    })
    app.get('/docs',(_, res: Response)=>{
        fs.readFile(path.resolve('./docs/index.html'), function (err,data) {
            if (err) {
              res.writeHead(404);
              res.end(JSON.stringify(err));
              return;
            }
            res.writeHead(200);
            res.end(data);
        })
    } )

    app.get('**', ( req: Request, res: Response) => {
        fs.readFile(path.resolve('./docs') + req.url, function (err,data) {
            if (err) {
              res.writeHead(404);
              res.end(JSON.stringify(err));
              return;
            }
            res.writeHead(200);
            res.end(data);
        })
    })

}