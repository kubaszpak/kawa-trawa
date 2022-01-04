import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";

@Entity('coupons')
export class CouponCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    discountCode: string;

    @Column()
    endDate: Date;

    @Column()
    discountSum: number;

    @Column({
        default: 0
    })
    lowerBoundSum?: number;
}