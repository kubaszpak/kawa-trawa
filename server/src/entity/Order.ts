import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm";
import { Address } from "./Address";
import { Product } from "./Product";
import { User } from "./User";

export enum OrderStatus {
    SHIPPED = "shipped",
    PAID = "paid",
    PLACED = "placed",
    CANCELLED = "cancelled",
    RETURNED = "returned"
}

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Address, address => address.orders, {
        eager: true,
        cascade: true,
        nullable: false
    })
    address: Address

    @ManyToOne(type => User, user => user.orders, {
        eager: true,
        cascade: true,
        nullable: false
    })
    user: User

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PLACED
    })
    status?: OrderStatus

    @ManyToMany(type => Product, {
        eager: true
    })
    @JoinTable()
    products: Product[]

    @Column()
    totalPrice: number

    @Column()
    date: Date
}