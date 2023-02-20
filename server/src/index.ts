import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { PORT } from "./config";
import * as helmet from "helmet";
import { setupEmail } from "./email/setupEmail";
import * as morgan from "morgan";
import { AppDataSource } from "./app-data-source";
var cors = require("cors");

function handleError(err, req, res, next) {
	res.status(err.statusCode || 500).send({ message: err.message });
}

AppDataSource.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");

		// create express app
		const app = express();
		// app.use(express.json());
		app.use(cors());

		setupEmail();

		// @ts-ignore
		app.use(helmet());
		// @ts-ignore
		app.use(morgan("tiny"));

		app.use(bodyParser.json());

		// register express routes from defined application routes
		Routes.forEach((route) => {
			(app as any)[route.method](
				route.route,
				...route.middleware,
				async (req: Request, res: Response, next: Function) => {
					try {
						const result = await new (route.controller as any)()[route.action](
							req,
							res,
							next
						);
						console.log(result);
						res.json(result);
					} catch (error) {
						console.error(error);
						next(error);
					}
				}
			);
		});

		// setup express app here
		app.use(handleError);

		// start express server
		app.listen(PORT);

		console.log(`Express server has started on port ${PORT}`);
	})
	.catch((err) => {
		console.error("Error during Data Source initialization:", err);
	});
