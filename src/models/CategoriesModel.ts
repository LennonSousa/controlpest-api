import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Product from './ProductsModel';

@Entity('categories')
export default class CategoriesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    title: string;

    @Column()
    paused: boolean;

    @Column()
    order: number;

    @Column()
    created_at: Date;

    @OneToMany(() => Product, product => product.category)
    @JoinColumn({ name: 'category_id' })
    products: Product[];
}