import { Entity, PrimaryGeneratedColumn, ManyToOne,ManyToMany, JoinTable, Column } from "typeorm";
import { Category } from "./Category";
import { Discount } from "./Discount";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Category, {
        eager: true
    })
    categories: Category[];

    @ManyToOne(() => Discount)
    // @OneToOne(type => Product) //onetomany?
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