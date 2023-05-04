import { NextFunction, Request, Response } from "express";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { AppDataSource } from "../app-data-source";

export default class ProductController {
	private productRepository = AppDataSource.getRepository(Product);
	private categoryRepository = AppDataSource.getRepository(Category);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.productRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const product = await this.productRepository.findOne({
			where: { id: parseInt(request.params.id) },
			relations: {
				categories: true,
			},
		});
		if (!product) {
			response.status(400).send("No item with id: " + request.params.id);
			return;
		}
		if (
			request.params.quantity &&
			parseInt(request.params.quantity) > product.quantity
		) {
			response
				.status(400)
				.send(
					"The quantity of the product with id: " +
						request.params.id +
						" has been exceeded"
				);
			return;
		}

		// search the categories for the discount that benefits the client the most
		type ProductWithBestDiscount = Product & { bestDiscount: number };

		(product as ProductWithBestDiscount).bestDiscount =
			product.discount?.discountPercentage || 0;
		!!product.categories &&
			product.categories.forEach(async (category) => {
				if (
					!!category.discount &&
					category.discount.discountPercentage >
						(product as ProductWithBestDiscount).bestDiscount
				) {
					(product as ProductWithBestDiscount).bestDiscount =
						category.discount.discountPercentage;
				}
			});
		return product;
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
