import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';
import User from './UsersModel';
import ServicePragueType from './ServicePragueTypesModel';
import ServiceTreatmentType from './ServiceTreatmentTypesModel';
import ServiceBuildType from './ServiceBuildTypesModel';
import ServiceItem from './ServiceItemsModel';

@Entity('service_orders')
export default class InventoryActionsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    same_address: boolean;

    @Column()
    zip_code: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    @Column()
    complement: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    other_prague_type: string;

    @Column()
    other_treatment_type: string;

    @Column()
    build_description: string;

    @Column()
    animals: boolean;

    @Column()
    old_people: boolean;

    @Column()
    allergic_people: boolean;

    @Column()
    value: number;

    @Column()
    payment: string;

    @Column()
    warranty: string;

    @Column()
    notes: string;

    @Column()
    created_at: Date;

    @Column()
    created_by: string;

    @Column()
    start_at: Date;

    @Column()
    finish_at: Date;

    @Column()
    updated_by: string;

    @Column()
    updated_at: Date;

    @ManyToOne(() => Customer, customer => customer.serviceOrders)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(() => User, user => user.estimates)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => ServiceItem, item => item.service, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'service_order_id' })
    items: ServiceItem[];

    @OneToMany(() => ServiceBuildType, serviceBuildType => serviceBuildType.service, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'service_order_id' })
    serviceBuildTypes: ServiceBuildType[];

    @OneToMany(() => ServicePragueType, servicePragueType => servicePragueType.service, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'service_order_id' })
    servicePragueTypes: ServicePragueType[];

    @OneToMany(() => ServiceTreatmentType, serviceTreatmentType => serviceTreatmentType.service, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'service_order_id' })
    serviceTreatmentTypes: ServiceTreatmentType[];
}