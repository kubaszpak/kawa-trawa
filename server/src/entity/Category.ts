import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne, JoinTable, OneToMany } from "typeorm";
import { Product } from "./Product";
import { Discount } from "./Discount";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Product, product => product.categories, {
        eager: true
    })
    @JoinTable()
    products: Product[]

    @ManyToOne(type => Category, category => category.children)
    parent: Category;

    @ManyToOne(type => Discount, discount => discount.categories)
    discount: Discount;

    @OneToMany(type => Category, category => category.parent)
    children: Category[];

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    pathToImage: string;
}