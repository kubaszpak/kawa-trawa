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

        const product = request.body;

        if (!product.name) {
            response.status(400).send("Product name not provided");
            return;
        }

        return this.productRepository.save(request.body);
    }

    async update(request: Request, response: Response, next: NextFunction) {

        // .save Also supports partial updating since all undefined properties are skipped.
        const product = await this.productRepository.findOne(request.params.id);
        this.productRepository.merge(product, request.body);
        return this.productRepository.save(product);
    }


    async remove(request: Request, response: Response, next: NextFunction) {
        const productToRemove = await this.productRepository.findOne(request.params.id);
        if (!productToRemove) throw Error('Product with given id not found in the database')
        await this.productRepository.remove(productToRemove);
    }

}
