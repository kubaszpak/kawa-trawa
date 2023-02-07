import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Address } from "../entity/Address";

export default class AddressController {
	private addressRepository = AppDataSource.getRepository(Address);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.addressRepository.find();
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.addressRepository.save(request.body);
	}

	async edit(request: Request, response: Response, next: NextFunction) {
		const address = await this.addressRepository.findOne({
			where: { id: parseInt(request.params.id) },
		});
		if (!address)
			throw Error("Address with given id not found in the database");
		return this.addressRepository.update(address.id, request.body);
	}
}
