import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Category } from "./Category";
import { Product } from "./Product";

@Entity('discounts')
export class Discount {

    @PrimaryGeneratedColumn()
    id: number;

    // @OneToMany(() => Category, category => category.discount)
    @OneToOne(type => Category) //onetomany?
    @JoinTable()
    categories: Category[];
    
    // @OneToMany(() => Product, product => product.discount)
    @OneToOne(type => Product) //onetomany?
    @JoinTable()
    products: Product[];   

    @Column()
    discountPercentage: number;

    @Column()
    name: string;

    @Column()
    endDate: Date;
}