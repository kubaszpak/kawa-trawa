import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
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

    @JoinColumn()
    @OneToOne(type => Address, {
        eager: true,
        cascade: true,
        nullable: false
    })
    address: Address

    @JoinColumn()
    @OneToOne(type => User, {
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
    status: OrderStatus

    @ManyToMany(type => Product)
    @JoinTable()
    products: Product[] 

    @Column()
    totalPrice: number

    @Column()
    date: Date
}