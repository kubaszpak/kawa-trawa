import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Category)
    @JoinTable()
    categories: Category[];

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    pathToImage: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    visibility: boolean;
}