import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEstimateItems1631308754822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'estimate_items',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'details',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'amount',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'order',
                        type: 'integer'
                    },
                    {
                        name: 'estimate_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ItemOnEstimate',
                        columnNames: ['estimate_id'],
                        referencedTableName: 'estimates',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('estimate_items');
    }

}
