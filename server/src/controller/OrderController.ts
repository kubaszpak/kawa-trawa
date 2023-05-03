import { NextFunction, Request, Response } from "express";
import { Order, OrderStatus } from "../entity/Order";
import { User, AccountType } from "../entity/User";
import { Product } from "../entity/Product";
import { AppDataSource } from "../app-data-source";

export default class OrderController {
	private orderRepository = AppDataSource.getRepository(Order);
	private userRepository = AppDataSource.getRepository(User);
	private productRepository = AppDataSource.getRepository(Product);

	async all(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne({
			where: { id: (request as any).userId },
		});
		type OrderWithProductList = Order & {
			productList?: { name: string; amount: number }[];
		};
		const orders: OrderWithProductList[] =
			user.accountType == AccountType.CLIENT
				? await this.orderRepository.find({
						where: {
							user: {
								id: user.id,
							},
						},
				  })
				: await this.orderRepository.find();

		for (const order of orders) {
			for (const productId in order.products) {
				const product = await this.productRepository.findOne({
					where: {
						id: Number(productId),
					},
				});
				if (!order.productList) order.productList = [];
				if (!!product)
					order.productList.push({
						name: product.name,
						amount: order.products[product.id],
					});
			}
		}
		return orders;
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne({
			where: { id: (request as any).userId },
		});
		const order = await this.orderRepository.findOne({
			where: { id: parseInt(request.params.id) },
		});
		if (!order) throw Error("Order with given id not found in the database");
		if (
			user.accountType == AccountType.ADMIN ||
			user.accountType == AccountType.EMPLOYEE ||
			user.orders.some((userOrder) => userOrder.id == order.id)
		)
			return this.orderRepository.findOne({
				where: { id: parseInt(request.params.id) },
			});
		response.status(403).send("Acces denied");
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const user = await AppDataSource.getRepository(User).findOne({
			where: { id: (request as any).userId },
		});

		const products = request.body.products;

		const order = {
			address: request.body.address,
			user,
			status: OrderStatus.PLACED,
			date: new Date(),
			totalPrice: 0,
			products: products.reduce(
				(acc, product) => ({
					...acc,
					[product.id]: product.quantity,
				}),
				{}
			),
		};

		console.log("Cart: ", products);

		let totalPrice = 0;

		products.map(async (product) => {
			totalPrice += Math.floor(
				(product.price * product.quantity * (100 - product.bestDiscount)) / 100
			);
		});

		order.totalPrice = totalPrice;
		if (user.balance < totalPrice) {
			response.status(400).send("Insufficient funds");
			return;
		}

		products.map(async (product) => {
			const productFromDatabase = await this.productRepository.findOne({
				where: { id: product.id },
			});
			if (productFromDatabase.quantity < product.quantity) {
				next(
					new Error(`Product ${product.id} not available in the given quantity`)
				);
				return;
			}
		});
		products.map(async (product) => {
			await this.productRepository.decrement(
				{
					id: product.id,
				},
				"quantity",
				product.quantity
			);
		});

		user.balance -= totalPrice;
		return this.orderRepository.save(order);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const orderToRemove = await this.orderRepository.findOne({
			where: { id: parseInt(request.params.id) },
		});
		if (!orderToRemove)
			throw Error("Order with given id not found in the database");
		await this.orderRepository.remove(orderToRemove);
	}
}
