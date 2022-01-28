import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Address } from "./Address";
import { Complaint } from "./Complaint";
import { Order } from "./Order";

export enum AccountType {
    ADMIN = "admin",
    EMPLOYEE = "employee",
    CLIENT = "client"
}

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @OneToOne(type => Address, {
        eager: true,
        cascade: true
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

    @OneToMany(type => Order, order => order.user)
    orders: Order[];

    @OneToMany(type => Complaint, complaint => complaint.user)
    complaints: Complaint[];

}
