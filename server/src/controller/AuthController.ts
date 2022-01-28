import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { AccountType, User } from "../entity/User";
import * as bcrypt from "bcrypt"
import { LoginDto } from "../dto/loginDto";
import { RefreshTokenDto } from "../dto/refreshTokenDto";
import { generateAccessToken, generateRefreshToken, generateRegistrationToken, generateResetToken } from "../authentication/tokens";
import { sendEmail } from "../email/setupEmail";
import { confirmRegistrationEmailTemplate, resetPasswordEmailTemplate } from "../email/template";
import * as jwt from "jsonwebtoken"

export default class AuthController {

    private userRepository = getRepository(User);

    private async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async register(request: Request, response: Response, next: NextFunction) {
        let user = request.body;

        const emailIsRegistered = await this.userRepository.findOne({ where: { email: user.email } });
        if (emailIsRegistered) {
            response.status(400).send({ error: "Email address is already registered" });
            return;
        }

        user.password = await this.hashPassword(user.password);

        const registrationToken = await generateRegistrationToken(user)
        sendEmail("Potwierdź rejestrację do 'Kawa i Trawa'", confirmRegistrationEmailTemplate, [user.email], { user, registrationToken })
        user.confirmed = false;

        this.userRepository.save(user);
        response.status(200).send(user);
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne({ where: { email: request.body.email } });

        if (!user) {
            response.status(400).send({ error: "Invalid email or password." });
            return;
        }

        /*if (!user.confirmed) {
            response.status(400).send({ error: "The account has not been confirmed." });
            return;
        }*/

        if (user.banned) {
            response.status(403).send({ error: "User is baned" });
            return;
        }



        //populated users have unsalted passwords!
        let passwordCorrect;

        if (!(request.body.password == user.password)) {
            if (user.accountType == AccountType.CLIENT)
                passwordCorrect = await bcrypt.compare(request.body.password, user.password);
            else
                passwordCorrect = request.body.password == user.password;

            if (!passwordCorrect) {
                response.status(401).send({ error: "Invalid email or password" });
                return;
            }
        }

        const token = await generateAccessToken(user);

        response.cookie("accessToken", token);

        return new LoginDto(
            await generateRefreshToken(user),
            token,
            process.env.JWT_ACCESS_EXPIRATION,
            user);
    }

    async refresh(request: Request, response: Response, next: NextFunction) {
        const user = await this.userRepository.findOne({ where: { id: (request as any).userId } });

        return new RefreshTokenDto(
            await generateRefreshToken(user),
            await generateAccessToken(user),
            process.env.JWT_ACCESS_EXPIRATION,
            user);
    }

    async confirmRegistration(request: Request, response: Response, next: NextFunction) {
        const token = String(request.query.token);

        try {
            jwt.verify(token, process.env.JWT_REGISTRATION_SECRET);
            let { payload: { email } } = jwt.decode(token, { complete: true });

            const user = await getRepository(User).findOne({ where: { email: email } });

            if (!user) {
                return response.json("Registration request has expired.");
            }

            await this.userRepository.update({ id: user.id }, { confirmed: true });

            console.log(`Confirmed user registration: ${user.firstName} ${user.lastName}`);
            response.redirect("http://localhost:3000/RegisterConfirmed");
            return next();
        } catch (err) {
            return response.json("Registration request has expired.");
        }
    }

    async resetPasswordRequest(request: Request, response: Response, next: NextFunction) {

        const user = await getRepository(User).findOne({ where: { email: request.body.email } });
        if (user) {
            const token = await generateResetToken(user)

            sendEmail("Potwierdź zmianę hasła do 'Kawa i Trawa'", resetPasswordEmailTemplate, [user.email], { user, token })
        }
        response.status(200).json("Reset email has been sent");
        return next();
    }

    async resetPassword(request: Request, response: Response, next: NextFunction) {

        const token: string = request.query.token as string;

        try {
            let { payload: { id } } = jwt.decode(token, { complete: true });

            (request as any).userId = id;

        } catch (err) {
            response.status(400).send("Invalid Token structure");
            return next()
        }

        const user = await getRepository(User).findOne((request as any).userId)
        if (!user || user.banned || !user.confirmed) {
            response.status(404).json("Can not change password");
            return next();
        }

        try {
            jwt.verify(token, user.password);
            response.cookie("resetToken", token)
            response.redirect("http://localhost:3000/PasswordResetApply");
            return next();

        } catch (err) {
            response.status(400).send("Invalid Token");
            return next()
        }
    }

    async resetPasswordApply(request: Request, response: Response, next: NextFunction) {

        const token: string = request.headers['authorization']

        try {
            let { payload: { id } } = jwt.decode(token, { complete: true });

            (request as any).userId = id;

        } catch (err) {
            response.status(400).send("Invalid Token structure");
            return next()
        }

        const user = await getRepository(User).findOne((request as any).userId)
        if (!user || user.banned || !user.confirmed) {
            response.status(404).json("Can not change password");
            return next();
        }

        try {
            jwt.verify(token, user.password);
            const password = await this.hashPassword(request.body.password);
            await getRepository(User).update(user.id, { password })
            return next();

        } catch (err) {
            response.status(400).send("Invalid Token");
            return next()
        }
    }

}
