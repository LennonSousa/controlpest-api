import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createServiceTreatmentTypes1631996904227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'service_treatment_types',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'service_order_id',
                        type: 'varchar',
                    },
                    {
                        name: 'treatment_type_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ServiceOnServiceTreatmentTypes',
                        columnNames: ['service_order_id'],
                        referencedTableName: 'service_orders',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'TreatmentTypeOnServiceTreatmentTypes',
                        columnNames: ['treatment_type_id'],
                        referencedTableName: 'treatment_types',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('service_treatment_types');
    }

}
