import * as jwt from "jsonwebtoken";
import { AccountType, User } from "../entity/User";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../app-data-source";

export function accessTokenMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	return tokenMiddleware(req, res, next, process.env.JWT_ACCESS_SECRET);
}

export async function refreshTokenMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	return tokenMiddleware(req, res, next, process.env.JWT_REFRESH_SECRET);
}

export async function verifiedOnly(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userRepository = AppDataSource.getRepository(User);
	const user = await userRepository.findOne({
		where: { id: (req as any).userId },
	});
	if (user.confirmed && !user.banned) {
		return next();
	}
	res.status(403).send("Verified only");
}

export async function unBannedOnly(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userRepository = AppDataSource.getRepository(User);
	const user = await userRepository.findOne({
		where: { id: (req as any).userId },
	});
	if (!user.banned) {
		return next();
	}
	res.status(403).send("Not permitted");
}

export async function empOnly(req: Request, res: Response, next: NextFunction) {
	const userRepository = AppDataSource.getRepository(User);
	const user = await userRepository.findOne({
		where: { id: (req as any).userId },
	});
	if (
		user.accountType == AccountType.EMPLOYEE ||
		user.accountType == AccountType.ADMIN
	) {
		return next();
	}
	res.status(403).send("Verified only");
}

export async function unBannedUserOrEmp(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userRepository = AppDataSource.getRepository(User);
	const user = await userRepository.findOne({
		where: { id: (req as any).userId },
	});
	if (
		user.accountType == AccountType.EMPLOYEE ||
		user.accountType == AccountType.ADMIN
	)
		return next();
	else if (user.confirmed && !user.banned) {
		return next();
	}

	res.status(403).send("Verified only");
}

async function tokenMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
	secret: string
) {
	const authHeader = req.headers["authorization"];

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).send("Access Denied");
		return;
	}

	const token = authHeader.slice(7, authHeader.length);

	try {
		let { id, firstName, lastName } = jwt.verify(token, secret) as {
			id: string;
			firstName: string;
			lastName: string;
		};

		const user = await AppDataSource.getRepository(User).findOne({
			where: { id: parseInt(id) },
		});

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
