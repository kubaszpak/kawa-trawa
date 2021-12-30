import { AccountType, User } from '../entity/User';

export class GetUserDto {
    constructor(data: User) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.accountType = data.accountType;
        this.balance = data.balance;
        this.confirmed = data.confirmed;
        this.banned = data.banned;

        this.address = data.address ? data.address.id : null;
    }

    id: number;
    address: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    accountType?: AccountType;
    balance?: number;
    confirmed?: boolean;
    banned?: boolean;

}
