import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User, AccountType } from "../entity/User";

export default class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne((request as any).userId)
        if (user.accountType == AccountType.EMPLOYEE || user.accountType == AccountType.ADMIN) {
            return (await this.userRepository.find()).map(user => {
                const returnedValue = {...user};
                delete returnedValue.password;
                return returnedValue;
            });
        }
        response.status(403).send("Acces denied");
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne((request as any).userId)
        if (user.accountType == AccountType.EMPLOYEE || user.accountType == AccountType.ADMIN || user.id == Number(request.params.id)) {
            return this.userRepository.findOne(request.params.id);
        }
        response.status(403).send("Acces denied");
    }

    async edit(request: Request, response: Response, next: NextFunction) {
        const oldUser = await this.userRepository.findOne(request.params.id);
        if (!oldUser) throw Error('User with given id not found in the database');
        const newUser = request.body;
        const requester = await this.userRepository.findOne((request as any).userId);

        if (newUser.id != null)
            return response.status(403).send("Editing object not permited");

        if (requester.accountType == AccountType.ADMIN) {
            return this.userRepository.update(oldUser.id, newUser);
        }
        if (requester.accountType == AccountType.EMPLOYEE) {
            if (newUser.orders == null && newUser.accountType == null) {
                return this.userRepository.update(oldUser.id, newUser);
            }
        }
        //changes allowed for user himself
        if (requester.accountType == AccountType.CLIENT && requester.id == oldUser.id && requester.banned == false) {
            if (newUser.orders == null && newUser.accountType == null && newUser.balance == null && newUser.banned == null && newUser.confirmed == null) {
                return this.userRepository.update(oldUser.id, newUser);
            }
        }
        return response.status(403).send("Editing object not permited");
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        //permission
        const user = await this.userRepository.findOne((request as any).userId)
        if (user.accountType == AccountType.EMPLOYEE || user.accountType == AccountType.ADMIN || user.id == Number(request.params.id)) {
            const userToRemove = await this.userRepository.findOne(request.params.id);
            if (!userToRemove) throw Error('User with given id not found in the database');
            await this.userRepository.remove(userToRemove);
            return response.status(200).send("Deleted");
        }
        response.status(403).send("Acces denied");
    }

}
