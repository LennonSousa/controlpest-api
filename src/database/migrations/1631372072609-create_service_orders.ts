import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createServiceOrders1631372072609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'service_orders',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'other_prague_type',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'other_treatment_type',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'build_description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'animals',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'old_people',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'allergic_people',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'payment',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'warranty',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'notes',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        default: 'Now()',
                    },
                    {
                        name: 'start_at',
                        type: 'datetime',
                        default: 'Now()',
                    },
                    {
                        name: 'finish_at',
                        type: 'datetime',
                        default: 'Now()',
                    },
                    {
                        name: 'updated_by',
                        type: 'varchar',
                    },
                    {
                        name: 'updated_at',
                        type: 'datetime',
                        default: 'Now()',
                    },
                    {
                        name: 'customer_id',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ServiceOnCustomer',
                        columnNames: ['customer_id'],
                        referencedTableName: 'customers',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('service_orders');
    }

}
