import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { LoginDto } from "../dto/loginDto";
import { RefreshTokenDto } from "../dto/refreshTokenDto";

export default class AuthController {

    private userRepository = getRepository(User);

    private async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    private async generateAccessToken(user: User) {
        return jwt.sign(
            await this.generatePayload(user),
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRATION });
    }

    private async generateRefreshToken(user: User) {
        return jwt.sign(
            await this.generatePayload(user),
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
    }

    private async generatePayload(user: User) {
        return { email: user.email, id: user.id, firstName: user.firstName, lastName: user.lastName };
    }

    async register(request: Request, response: Response, next: NextFunction) {
        let user = request.body;

        const emailIsRegistered = await this.userRepository.findOne({ where: { email: user.email } });
        if (emailIsRegistered) {
            response.status(400).send({ error: "Email address is already registered" });
            return;
        }

        user.password = await this.hashPassword(user.password);

        this.userRepository.save(user);
        response.status(200).send(user);
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne({ where: { email: request.body.email } });
        if (!user) {
            response.status(400).send({ error: "Invalid email or password" });
            return;
        }

        const passwordCorrect = await bcrypt.compare(request.body.password, user.password);
        if (!passwordCorrect) {
            response.status(400).send({ error: "Invalid email or password" });
            return;
        }

        return new LoginDto(
            await this.generateRefreshToken(user),
            await this.generateAccessToken(user),
            process.env.JWT_ACCESS_EXPIRATION,
            user);
    }

    async refresh(request: Request, response: Response, next: NextFunction) {

        const user = await this.userRepository.findOne({ where: { id: (request as any).userId } });

        return new RefreshTokenDto(
            await this.generateRefreshToken(user),
            await this.generateAccessToken(user),
            process.env.JWT_ACCESS_EXPIRATION,
            user);
    }

}
