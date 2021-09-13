import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import ServiceOrder from './ServiceOrdersModel';

@Entity('build_types')
export default class BuildTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @Column()
    active: boolean;

    @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.buildType)
    @JoinColumn({ name: 'build_type_id' })
    serviceOrders: ServiceOrder[];
}