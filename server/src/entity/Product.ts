import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, Column } from "typeorm";
import { Category } from "./Category";
import { Discount } from "./Discount";

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Category, category => category.products)
    categories: Category[];

    @ManyToOne(type => Discount, discount => discount.products)
    discount: Discount;

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