import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import ServiceOrder from './ServiceOrdersModel';
import TreatmentType from './TreatmentTypesModel';

@Entity('service_prague_types')
export default class ServiceTreatmentTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @ManyToOne(() => ServiceOrder, service => service.serviceTreatmentTypes)
    @JoinColumn({ name: 'service_order_id' })
    service: ServiceOrder;

    @ManyToOne(() => TreatmentType, treatment => treatment.serviceTreatments)
    @JoinColumn({ name: 'treatment_type_id' })
    treatment: TreatmentType;
}