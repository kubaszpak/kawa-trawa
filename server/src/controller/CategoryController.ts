import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Category } from "../entity/Category";
import { User, AccountType } from "../entity/User";

export default class CategoryController {

    private categoryRepository = getRepository(Category);
    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne((request as any).userId)
        if (user.accountType == AccountType.EMPLOYEE || user.accountType == AccountType.ADMIN) {
            return this.categoryRepository.save(request.body);
        }
        response.status(403).send("Acces denied");
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne((request as any).userId)
        if (user.accountType == AccountType.EMPLOYEE || user.accountType == AccountType.ADMIN) {
            const categoryToRemove = await this.categoryRepository.findOne(request.params.id);
            if (!categoryToRemove) throw Error('Category with given id not found in the database')
            return this.categoryRepository.remove(categoryToRemove);
        }
        response.status(403).send("Acces denied");
    }

}