import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import ServiceOrder from './ServiceOrdersModel';

@Entity('service_items')
export default class ServiceOrderItemsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    details: string;

    @Column()
    amount: number;

    @Column()
    order: number;

    @ManyToOne(() => ServiceOrder, service => service.items)
    @JoinColumn({ name: 'service_order_id' })
    service: ServiceOrder;
}