import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Category from './CategoriesModel';
import InventoryAction from './InventoryActionsModel';

@Entity('products')
export default class ProductsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    code: string;

    @Column()
    price: number;

    @Column()
    discount: boolean;

    @Column()
    discount_price: number;

    @Column()
    inventory_amount: number;

    @Column()
    inventory_min: number;

    @Column()
    paused: boolean;

    @Column()
    order: number;

    @Column()
    created_at: Date;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => InventoryAction, inventoryAction => inventoryAction.product)
    @JoinColumn({ name: 'product_id' })
    inventory_actions: InventoryAction[];
}