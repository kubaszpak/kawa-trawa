import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Discount } from "../entity/Discount";

export default class DiscountController {
	private discountRepository = AppDataSource.getRepository(Discount);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.discountRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.discountRepository.findOne({
			where: { id: parseInt(request.params.id) },
		});
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.discountRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const discountToRemove = await this.discountRepository.findOne({
			where: { id: parseInt(request.params.id) },
		});
		if (!discountToRemove)
			throw Error("Discount with given id not found in the database");
		await this.discountRepository.remove(discountToRemove);
	}
}
