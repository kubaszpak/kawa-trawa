import * as jwt from "jsonwebtoken"
import { getRepository } from "typeorm"; import { User } from "../entity/User";
import { NextFunction, Request, Response } from "express";

export function accessTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    return tokenMiddleware(req, res, next, process.env.JWT_ACCESS_SECRET);
}

export async function refreshTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    return tokenMiddleware(req, res, next, process.env.JWT_REFRESH_SECRET);
}


async function tokenMiddleware(req: Request, res: Response, next: NextFunction, secret: string) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send("Access Denied");
    }

    const token = authHeader.slice(7, authHeader.length);

    try {
        jwt.verify(token, secret);
        let { payload: { id, firstName, lastName } } = jwt.decode(token, { complete: true });

        if (!await getRepository(User).findOne({ where: { id: id } })) {
            return res.status(401).send("Unauthorized user");
        }

        console.log(`Recognized user ${firstName} ${lastName}`);
        return next();
    } catch (err) {
        return res.status(400).send("Invalid Token");
    }
}
