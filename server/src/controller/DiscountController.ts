import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Discount } from "../entity/Discount";

export default class DiscountController {

    private discountRepository = getRepository(Discount);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.discountRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.discountRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.discountRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const discountToRemove = await this.discountRepository.findOne(request.params.id);
        if (!discountToRemove) throw Error('Discount with given id not found in the database')
        await this.discountRepository.remove(discountToRemove);
    }

}