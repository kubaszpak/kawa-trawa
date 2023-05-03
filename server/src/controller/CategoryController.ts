import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Category } from "../entity/Category";
import { User, AccountType } from "../entity/User";

function findParent(category: Category, categories: any[]): boolean {
	for (let potentialParent of categories) {
		if (
			potentialParent.children &&
			findParent(category, potentialParent.children)
		) {
			return true;
		}
		if (category.parent && potentialParent.id === category.parent.id) {
			// && (!potentialParent.children || potentialParent.children.filter(e => e.id === category.id).length === 0)) {
			if (!potentialParent.children) {
				potentialParent.children = [];
			}
			potentialParent.children.push(category);
			return true;
		}
	}
	return false;
}

function findCategory(categories: any[], id: number): any {
	for (let category of categories) {
		if (category.id === id) {
			return category;
		}
		if (category.children) {
			let childCategory = findCategory(category.children, id);
			if (childCategory) {
				return childCategory;
			}
		}
	}
	return null;
}

export default class CategoryController {
	private categoryRepository = AppDataSource.getRepository(Category);
	private userRepository = AppDataSource.getRepository(User);

	async getAllCategories() {
		let sorted_categories = [];
		let categories = await this.categoryRepository.find({
			relations: {
				parent: true,
			},
		});
		for (var i = categories.length - 1; i >= 0; i--) {
			if (categories[i].parent === null) {
				sorted_categories.push(categories[i]);
				categories.splice(i, 1);
			}
		}

		while (categories && categories.length > 0) {
			for (var i = categories.length - 1; i >= 0; i--) {
				if (findParent(categories[i], sorted_categories)) {
					categories.splice(i, 1);
				}
			}
		}
		return sorted_categories;
	}

	async all(request: Request, response: Response, next: NextFunction) {
		return this.getAllCategories();
	}

	async categoryList(request: Request, response: Response, next: NextFunction) {
		return await this.categoryRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		let sorted_categories = await this.getAllCategories();
		return findCategory(sorted_categories, parseInt(request.params.id));
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne({
			where: { id: (request as any).userId },
		});
		if (
			user.accountType == AccountType.EMPLOYEE ||
			user.accountType == AccountType.ADMIN
		) {
			return this.categoryRepository.save(request.body);
		}
		response.status(403).send("Acces denied");
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne({
			where: {
				id: (request as any).userId,
			},
		});
		if (
			user.accountType == AccountType.EMPLOYEE ||
			user.accountType == AccountType.ADMIN
		) {
			const categoryToRemove = await this.categoryRepository.findOne({
				where: {
					id: parseInt(request.params.id),
				},
			});
			if (!categoryToRemove)
				throw Error("Category with given id not found in the database");
			return this.categoryRepository.remove(categoryToRemove);
		}
		response.status(403).send("Acces denied");
	}
}
