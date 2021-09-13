import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import ServiceOrder from './ServiceOrdersModel';

@Entity('treatment_types')
export default class TreatmentTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @Column()
    active: boolean;

    @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.treatmentType)
    @JoinColumn({ name: 'treatment_type_id' })
    serviceOrders: ServiceOrder[];
}