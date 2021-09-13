import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Customer from './CustomersModel';
import User from './UsersModel';
import PragueType from './PragueTypesModel';
import TreatmentType from './TreatmentTypesModel';
import BuildType from './BuildTypesModel';

@Entity('service_orders')
export default class InventoryActionsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    other_prague_type: string;

    @Column()
    other_treatment_type: string;

    @Column()
    other_build_type: string;

    @Column()
    build_description: string;

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

    @ManyToOne(() => PragueType, pragueType => pragueType.serviceOrders)
    @JoinColumn({ name: 'prague_type_id' })
    pragueType: PragueType;

    @ManyToOne(() => TreatmentType, treatmentType => treatmentType.serviceOrders)
    @JoinColumn({ name: 'treatment_type_id' })
    treatmentType: TreatmentType;

    @ManyToOne(() => BuildType, buildType => buildType.serviceOrders)
    @JoinColumn({ name: 'build_type_id' })
    buildType: BuildType;
}