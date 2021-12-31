import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany } from "typeorm";
import { Product } from "./Product";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Product, {
        eager: true
    })
    products: Product[]

    @JoinColumn()
    @OneToOne(type => Category, {
        nullable: true
    })
    category?: Category

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    pathToImage: string;
}