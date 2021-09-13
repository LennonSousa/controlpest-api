import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Product from './ProductsModel';
import User from './UsersModel';

@Entity('inventory_actions')
export default class InventoryActionsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    amount: number;

    @Column()
    inventory_amount: boolean;

    @Column()
    created_at: Date;

    @Column()
    created_by: string;

    @ManyToOne(() => Product, product => product.inventory_actions)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}