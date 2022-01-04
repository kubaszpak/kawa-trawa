import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Product } from "../entity/Product";

export default class ProductController {

    private productRepository = getRepository(Product);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const productToRemove = await this.productRepository.findOne(request.params.id);
        if (!productToRemove) throw Error('Product with given id not found in the database')
        await this.productRepository.remove(productToRemove);
    }

}