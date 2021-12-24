import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
    country: string;

    @Column()
    postCode: string;

}