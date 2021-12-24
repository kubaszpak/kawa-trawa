import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Address } from "./Address";

export enum AccountType {
    ADMIN = "admin",
    EMPLOYEE = "employee",
    CLIENT = "client"
}

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "integer" })
    addressId: number;

    @JoinColumn({ name: 'addressId' })
    @OneToOne(type => Address, {
        eager: true
    })
    address: Address;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: AccountType,
        default: AccountType.CLIENT
    })
    accountType?: AccountType;

    @Column({
        default: 0
    })
    balance?: number;

    @Column({
        default: false
    })
    confirmed?: boolean;

    @Column({
        default: false
    })
    banned?: boolean;
}
