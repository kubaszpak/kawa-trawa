import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { PORT } from "./config";
import populateDatabaseWithTestData from "./populate";
import helmet from "helmet";
import morgan from 'morgan';


function handleError(err, req, res, next) {
    res.status(err.statusCode || 500).send({ message: err.message });
}

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, ...route.middleware, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next);
                res.json(result);
            } catch (error) {
                next(error);
            }
        });
    });

    // setup express app here
    app.use(handleError);
    app.use(helmet());
    app.use(morgan('tiny'));

    // start express server
    app.listen(PORT);

    // Populate database with example test data
    //populateDatabaseWithTestData(connection);

    console.log(`Express server has started on port ${PORT}`);

}).catch(error => console.log(error));
