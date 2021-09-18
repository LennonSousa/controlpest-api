import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createServiceBuildTypes1631996918124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'service_build_types',
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
                        name: 'build_type_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ServiceOnServiceBuildTypes',
                        columnNames: ['service_order_id'],
                        referencedTableName: 'service_orders',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'BuildTypeOnServiceBuildTypes',
                        columnNames: ['build_type_id'],
                        referencedTableName: 'build_types',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('service_build_types');
    }

}
