import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export default class AuthController {

    private userRepository = getRepository(User);

    async register(request: Request, response: Response, next: NextFunction) {
        const user = request.body;

        const emailExists = await this.userRepository.findOne({ email: user.email });
        if (emailExists) {
            return response.status(400).send({ error: "Email address is already registered" });
        }

        return this.userRepository.save(user);
    }

    async refresh(request: Request, response: Response, next: NextFunction) {


    }

}
