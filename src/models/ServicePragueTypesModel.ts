import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import ServiceOrder from './ServiceOrdersModel';
import PragueType from './PragueTypesModel';

@Entity('service_prague_types')
export default class ServicePragueTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @ManyToOne(() => ServiceOrder, service => service.items)
    @JoinColumn({ name: 'service_order_id' })
    service: ServiceOrder;

    @ManyToOne(() => PragueType, prague => prague.servicePragues)
    @JoinColumn({ name: 'prague_type_id' })
    prague: PragueType;
}