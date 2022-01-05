import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Order, OrderStatus } from "../entity/Order";
import { User, AccountType } from "../entity/User";

export default class OrderController {

    private orderRepository = getRepository(Order);
    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.orderRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne((request as any).userId)
        const order = await this.orderRepository.findOne(request.params.id);
        if (!order) throw Error('Order with given id not found in the database')
        if (user.accountType == AccountType.ADMIN || user.accountType == AccountType.EMPLOYEE || user.orders.some(userOrder => userOrder.id == order.id))
            return this.orderRepository.findOne(request.params.id);
        response.status(403).send("Acces denied");
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne((request as any).userId)
        const order = {
            address: request.body.address,
            user,
            status: OrderStatus.PLACED,
            date: Date.now(),
            totalPrice: 0,
            products: []
        }
        //dla każdego produktu, znaleźć go, zmniejszyć quantity, znaleźć discount, znaleźć cenę
        const totalPrice = 56;
        order.totalPrice = totalPrice
        if (user.balance < totalPrice)
            response.status(400).send("Insufficient funds");
        await this.userRepository.update(user.id, { balance: user.balance - totalPrice });
        return this.orderRepository.save(order);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const orderToRemove = await this.orderRepository.findOne(request.params.id);
        if (!orderToRemove) throw Error('Order with given id not found in the database')
        await this.orderRepository.remove(orderToRemove);
    }

}