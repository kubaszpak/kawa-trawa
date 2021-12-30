import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt"

export default class AuthController {

    private userRepository = getRepository(User);


    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async register(request: Request, response: Response, next: NextFunction) {

        let user = request.body;

        const emailIsRegistered = await this.userRepository.findOne({ email: user.email });
        if (emailIsRegistered) {
            response.status(400).send({ error: "Email address is already registered" });
            return;
        }

        user.password = await this.hashPassword(user.password);

        this.userRepository.save(user);
        response.status(200).send(user);
    }

    async refresh(request: Request, response: Response, next: NextFunction) {


    }

}
