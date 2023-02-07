import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Category } from "./Category";
import { Product } from "./Product";

@Entity("discounts")
export class Discount {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany((type) => Category, (category) => category.discount, {
		eager: true,
	})
	categories: Category[];

	@OneToMany((type) => Product, (product) => product.discount, {
		eager: true,
	})
	products: Product[];

	@Column()
	discountPercentage: number;

	@Column()
	name: string;

	@Column()
	endDate: Date;
}
