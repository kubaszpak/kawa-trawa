import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Complaint } from "../entity/Complaint";
import { User, AccountType } from "../entity/User";

export default class ComplaintController {
	private complaintRepository = AppDataSource.getRepository(Complaint);
	private userRepository = AppDataSource.getRepository(User);

	async all(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne({
			where: {
				id: (request as any).userId,
			},
		});
		if (
			user.accountType == AccountType.EMPLOYEE ||
			user.accountType == AccountType.ADMIN
		) {
			return this.complaintRepository.find();
		}
		response.status(403).send("Acces denied");
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne({
			where: { id: (request as any).userId },
		});
		const complaint = await this.complaintRepository.findOne({
			where: { id: parseInt(request.params.id) },
		});
		if (
			user.id == complaint.user.id ||
			user.accountType == AccountType.EMPLOYEE ||
			user.accountType == AccountType.ADMIN
		)
			return complaint;
		response.status(403).send("Acces denied");
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne({
			where: { id: (request as any).userId },
		});

		const complaint = {
			...request.body,
			date: new Date(),
			user,
		};

		return this.complaintRepository.save(complaint);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne({
			where: { id: (request as any).userId },
		});
		const complaintToRemove = await this.complaintRepository.findOne({
			where: { id: parseInt(request.params.id) },
		});
		if (!complaintToRemove)
			throw Error("Complaint with given id not found in the database");

		if (
			user.id == complaintToRemove.user.id ||
			user.accountType == AccountType.EMPLOYEE ||
			user.accountType == AccountType.ADMIN
		) {
			return this.complaintRepository.remove(complaintToRemove);
		}
		response.status(403).send("Acces denied");
	}
}
