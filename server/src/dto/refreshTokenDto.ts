import { GetUserDto } from "./getUserDto";
import { User } from "../entity/User"

export class RefreshTokenDto {
    constructor(refreshToken: string, accessToken: string, expiresIn: string, user: User) {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
        this.user = new GetUserDto(user);
    }

    refreshToken: string;
    accessToken: string;
    expiresIn: string;
    user: GetUserDto;
}
