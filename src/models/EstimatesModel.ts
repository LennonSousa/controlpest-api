import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';
import EstimateStatus from './EstimateStatusModel';
import User from './UsersModel';
import EstimateItem from './EstimateItemsModel';

@Entity('estimates')
export default class EstimatesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    same_address: boolean;

    @Column()
    zip_code: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    @Column()
    complement: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    discount: number;

    @Column()
    increase: number;

    @Column()
    percent: boolean;

    @Column()
    payment: string;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @Column()
    expire_at: Date;

    @Column()
    finish_at: Date;

    @Column()
    notes: string;

    @ManyToOne(() => Customer, customer => customer.estimates)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => User, user => user.estimates)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => EstimateStatus, estimateStatus => estimateStatus.estimates)
    @JoinColumn({ name: 'status_id' })
    status: EstimateStatus;

    @OneToMany(() => EstimateItem, item => item.estimate, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'estimate_id' })
    items: EstimateItem[];
}