import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import ServiceTreatmentType from './ServiceTreatmentTypesModel';

@Entity('treatment_types')
export default class TreatmentTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => ServiceTreatmentType, serviceTreatmentType => serviceTreatmentType.treatment)
    @JoinColumn({ name: 'treatment_type_id' })
    serviceTreatments: ServiceTreatmentType[];
}