import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import { Order } from "./Order";
import { User } from "./User";

@Entity('complaints')
export class Complaint {

    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @OneToOne(type => Order, {
        eager: true,
        cascade: false //order already exists
    })
    order: Order;

    @JoinColumn()
    @OneToOne(type => User, {
        eager: true,
        cascade: false //user already exists
    })
    user: User;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column({
        default: null
    })
    status: string;
}