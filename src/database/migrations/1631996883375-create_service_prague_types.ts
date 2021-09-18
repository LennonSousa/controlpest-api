import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createServicePragueTypes1631996883375 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'service_prague_types',
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
                        name: 'prague_type_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ServiceOnServicePragueTypes',
                        columnNames: ['service_order_id'],
                        referencedTableName: 'service_orders',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'PragueTypeOnServicePragueTypes',
                        columnNames: ['prague_type_id'],
                        referencedTableName: 'prague_types',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('service_prague_types');
    }

}
