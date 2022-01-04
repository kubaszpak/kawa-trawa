import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Category } from "../entity/Category";

export default class CategoryController {

    private categoryRepository = getRepository(Category);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const categoryToRemove = await this.categoryRepository.findOne(request.params.id);
        if (!categoryToRemove) throw Error('Category with given id not found in the database')
        await this.categoryRepository.remove(categoryToRemove);
    }

}