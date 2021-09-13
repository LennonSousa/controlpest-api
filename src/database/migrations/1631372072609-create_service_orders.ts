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
                        name: 'other_build_type',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'build_description',
                        type: 'text',
                        isNullable: true,
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
                    {
                        name: 'prague_type_id',
                        type: 'varchar',
                    },
                    {
                        name: 'treatment_type_id',
                        type: 'varchar',
                    },
                    {
                        name: 'build_type_id',
                        type: 'varchar',
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
                    {
                        name: 'PragueTypeOnService',
                        columnNames: ['prague_type_id'],
                        referencedTableName: 'prague_types',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'TreatmentTypeOnService',
                        columnNames: ['treatment_type_id'],
                        referencedTableName: 'treatment_types',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'ServiceTypeOnService',
                        columnNames: ['build_type_id'],
                        referencedTableName: 'build_types',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('service_orders');
    }

}
