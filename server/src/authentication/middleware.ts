import * as jwt from "jsonwebtoken"
import { getRepository } from "typeorm";
import { AccountType, User } from "../entity/User";
import { NextFunction, Request, Response } from "express";

export function accessTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    return tokenMiddleware(req, res, next, process.env.JWT_ACCESS_SECRET);
}

export async function refreshTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    return tokenMiddleware(req, res, next, process.env.JWT_REFRESH_SECRET);
}

export async function verifiedOnly(req: Request, res: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne((req as any).userId)
    if (user.confirmed && !user.banned) {
        return next();
    }
    res.status(403).send("Verified only");
}

export async function unBannedOnly(req: Request, res: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne((req as any).userId)
    if (!user.banned) {
        return next();
    }
    res.status(403).send("Verified only");
}

export async function empOnly(req: Request, res: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne((req as any).userId)
    if (user.accountType == AccountType.EMPLOYEE || user.accountType == AccountType.ADMIN) {
        return next();
    }
    res.status(403).send("Verified only");
}

export async function unBannedUserOrEmp(req: Request, res: Response, next: NextFunction) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne((req as any).userId)
    // res.status(403).send(user.email + " conf = " + user.confirmed + " banned =" + user.banned);
    if (user.accountType == AccountType.EMPLOYEE || user.accountType == AccountType.ADMIN)
        return next();
    else if (user.confirmed && !user.banned) {
        return next();
    }

    res.status(403).send("Verified only");
}


async function tokenMiddleware(req: Request, res: Response, next: NextFunction, secret: string) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).send("Access Denied");
        return;
    }

    const token = authHeader.slice(7, authHeader.length);

    try {
        jwt.verify(token, secret);
        let { payload: { id, firstName, lastName } } = jwt.decode(token, { complete: true });

        const user = await getRepository(User).findOne({ where: { id: id } });

        if (!user || user.banned) {
            res.status(401).send("Unauthorized user");
            return;
        }

        (req as any).userId = id;
        console.log(`Recognized user ${firstName} ${lastName}`);
        return next();
    } catch (err) {
        res.status(400).send("Invalid Token");
        return;
    }
}
