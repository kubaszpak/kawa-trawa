import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

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