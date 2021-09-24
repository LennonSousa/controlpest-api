import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import ServiceOrder from './ServiceOrdersModel';
import TreatmentType from './TreatmentTypesModel';

@Entity('service_treatment_types')
export default class ServiceTreatmentTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @ManyToOne(() => ServiceOrder, service => service.treatments)
    @JoinColumn({ name: 'service_order_id' })
    service: ServiceOrder;

    @ManyToOne(() => TreatmentType, treatment => treatment.serviceTreatments)
    @JoinColumn({ name: 'treatment_type_id' })
    treatment: TreatmentType;
}