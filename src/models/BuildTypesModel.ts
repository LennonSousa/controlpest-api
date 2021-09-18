import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import ServiceBuildType from './ServiceBuildTypesModel';

@Entity('build_types')
export default class BuildTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => ServiceBuildType, serviceBuildType => serviceBuildType.build)
    @JoinColumn({ name: 'build_type_id' })
    serviceBuilds: ServiceBuildType[];
}