import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import CustomerType from './CustomerTypesModel';
import Estimate from './EstimatesModel';
import ServiceOrder from './ServiceOrdersModel';

@Entity('customers')
export default class CustomersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    phone: string;

    @Column()
    cellphone: string;

    @Column()
    contacts: string;

    @Column()
    email: string;

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
    owner: string;

    @Column()
    notes: string;

    @Column()
    birth: Date;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @ManyToOne(() => CustomerType, customerType => customerType.customers)
    @JoinColumn({ name: 'type_id' })
    type: CustomerType;

    @OneToMany(() => Estimate, estimate => estimate.customer)
    @JoinColumn({ name: 'customer_id' })
    estimates: Estimate[];

    @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.customer)
    @JoinColumn({ name: 'customer_id' })
    serviceOrders: ServiceOrder[];
}