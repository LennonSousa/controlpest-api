import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import ServiceOrder from './ServiceOrdersModel';

@Entity('prague_types')
export default class PrageTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @Column()
    active: boolean;

    @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.pragueType)
    @JoinColumn({ name: 'prague_type_id' })
    serviceOrders: ServiceOrder[];
}