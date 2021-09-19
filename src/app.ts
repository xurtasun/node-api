import * as http from "http"
import log4js from 'log4js'
import express from 'express'
import compression from 'compression'
import bodyParser from "body-parser"
import router from './router/router'

import mongoose from 'mongoose';

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL || 'info'
const app = express();

const connectionString = process.env.MONGO_STRING || "mongodb://localhost/hello";
mongoose.connect(connectionString);
console.log("Connected to: " + connectionString);
app.use(compression());
app.set('port', process.env.PORT || 3300);
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(log4js.connectLogger(logger, {}));

router(app)

http.createServer(app)
    .listen(app.get('port'), ()=> {
        console.log(`Express server listening on port ${app.get('port')}`)
    })