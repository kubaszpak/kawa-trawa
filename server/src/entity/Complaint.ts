import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { User } from "./User";

export enum ComplaintStatus {
    RECEIVED = "received",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}

@Entity('complaints')
export class Complaint {

    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @OneToOne(type => Order, {
        eager: true,
        nullable: false
    })
    order: Order;

    @ManyToOne(type => User, {
        eager: true,
        nullable: false
    })
    user: User;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column({
        type: "enum",
        enum: ComplaintStatus,
        default: ComplaintStatus.RECEIVED
    })
    status?: ComplaintStatus;
}