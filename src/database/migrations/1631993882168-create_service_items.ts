import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createServiceItems1631993882168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'service_items',
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
                        name: 'order',
                        type: 'integer'
                    },
                    {
                        name: 'service_order_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ItemOnService',
                        columnNames: ['service_order_id'],
                        referencedTableName: 'service_orders',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('service_items');
    }

}
