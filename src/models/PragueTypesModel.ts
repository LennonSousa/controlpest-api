import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import ServicePragueType from './ServicePragueTypesModel';

@Entity('prague_types')
export default class PrageTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => ServicePragueType, servicePragueType => servicePragueType.prague)
    @JoinColumn({ name: 'prague_type_id' })
    servicePragues: ServicePragueType[];
}