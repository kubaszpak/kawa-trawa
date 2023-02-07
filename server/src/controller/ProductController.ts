import { NextFunction, Request, Response } from "express";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { AppDataSource } from "../app-data-source";

export default class ProductController {
	private productRepository = AppDataSource.getRepository(Product);
	private categoryRepository = AppDataSource.getRepository(Category);

	async all(request: Request, response: Response, next: NextFunction) {
		const sth = this.productRepository.find();
		console.log(sth);
		return sth;
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.productRepository.findOne({
			where: { id: parseInt(request.params.id) },
		});
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const productData = request.body;

		if (!productData.name) {
			response.status(400).send("Product name not provided");
			return;
		}

		const product = await this.productRepository.save(request.body);

		for (let id of productData.categories) {
			const category = await this.categoryRepository.findOne({
				where: { id: id },
			});
			category.products.push(product);
			await this.categoryRepository.save(category);
		}

		return product;
	}

	async update(request: Request, response: Response, next: NextFunction) {
		// .save Also supports partial updating since all undefined properties are skipped.
		const product = await this.productRepository.findOne({
			where: { id: parseInt(request.params.id) },
		});
		this.productRepository.merge(product, request.body);
		await this.productRepository.save(product);

		for (let id of request.body.categories) {
			const category = await this.categoryRepository.findOne({
				where: { id: id },
			});
			category.products.push(product);
			await this.categoryRepository.save(category);
		}

		return product;
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const productToRemove = await this.productRepository.findOne({
			where: { id: parseInt(request.params.id) },
		});
		if (!productToRemove)
			throw Error("Product with given id not found in the database");
		await this.productRepository.remove(productToRemove);
	}
}
