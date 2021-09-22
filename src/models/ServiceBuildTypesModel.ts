import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import ServiceOrder from './ServiceOrdersModel';
import BuildType from './BuildTypesModel';

@Entity('service_build_types')
export default class ServiceBuildTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @ManyToOne(() => ServiceOrder, service => service.serviceBuildTypes)
    @JoinColumn({ name: 'service_order_id' })
    service: ServiceOrder;

    @ManyToOne(() => BuildType, build => build.serviceBuilds)
    @JoinColumn({ name: 'build_type_id' })
    build: BuildType;
}