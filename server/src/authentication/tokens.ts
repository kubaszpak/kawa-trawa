import { User } from "../entity/User";
import * as jwt from "jsonwebtoken"

async function generatePayload(user: User) {
    return { email: user.email, id: user.id, firstName: user.firstName, lastName: user.lastName };
}

export async function generateAccessToken(user: User) {
    return jwt.sign(
        await generatePayload(user),
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRATION });
}

export async function generateRefreshToken(user: User) {
    return jwt.sign(
        await generatePayload(user),
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
}

export async function generateRegistrationToken(user: User) {
    return jwt.sign(
        await generatePayload(user),
        process.env.JWT_REGISTRATION_SECRET,
        { expiresIn: process.env.JWT_REGISTRATION_EXPIRATION });
}
