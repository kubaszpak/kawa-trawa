import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import { Order } from "./Order";
import { User } from "./User";

@Entity('complaints')
export class Complaint {

    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @OneToOne(type => Order, {
        eager: true
    })
    order: Order;

    @JoinColumn()
    @OneToOne(type => User, {
        eager: true
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