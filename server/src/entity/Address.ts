import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('addresses')
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;

    @Column()
    houseNumber: number;

    @Column({
        type: "integer",
        nullable: true,
        default: null
    })
    flatNumber?: number;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    postCode: string;

}