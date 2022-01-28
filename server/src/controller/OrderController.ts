import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Order, OrderStatus } from "../entity/Order";
import { User, AccountType } from "../entity/User";
import { Product } from "../entity/Product";

export default class OrderController {
	private orderRepository = getRepository(Order);
	private userRepository = getRepository(User);
	private productRepository = getRepository(Product);

	
	async all(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne((request as any).userId);
		if(user.accountType == AccountType.CLIENT){
			return await this.orderRepository.find({relations: ["user", "products"]}); //user orders
		}
		else{ //admin or employee
			return this.orderRepository.find(); //all orders
		}
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne((request as any).userId);
		const order = await this.orderRepository.findOne(request.params.id);
		if (!order) throw Error("Order with given id not found in the database");
		if (
			user.accountType == AccountType.ADMIN ||
			user.accountType == AccountType.EMPLOYEE ||
			user.orders.some((userOrder) => userOrder.id == order.id)
		)
			return this.orderRepository.findOne(request.params.id);
		response.status(403).send("Acces denied");
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const user = await this.userRepository.findOne((request as any).userId);
		const order = {
			address: request.body.address,
			user,
			status: OrderStatus.PLACED,
			date: new Date(),
			totalPrice: 0,
			products: [...request.body.products],
		};

		const products = {};

		request.body.products.map((product: Product) => {
			if (!products[product.id]) products[product.id] = 0;
			products[product.id] += 1;
		});

		console.log("Cart: ", products);

		let totalPrice = 0;

		request.body.products.map(async (product: Product) => {
			let productPrice = product.price;
			totalPrice += productPrice;
			await this.productRepository.update(product.id, {
				quantity: product.quantity - 1,
			});
		});

		order.totalPrice = totalPrice;
		if (user.balance < totalPrice)
			response.status(400).send("Insufficient funds");
		user.balance -= totalPrice;
		await this.userRepository.update(user.id, {
			balance: user.balance - totalPrice,
		});
		return this.orderRepository.save(order);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const orderToRemove = await this.orderRepository.findOne(request.params.id);
		if (!orderToRemove)
			throw Error("Order with given id not found in the database");
		await this.orderRepository.remove(orderToRemove);
	}
}
