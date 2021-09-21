import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export default class ServicesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    order: number;
}