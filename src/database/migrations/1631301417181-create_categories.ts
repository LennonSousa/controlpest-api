import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCategories1631301417181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'categories',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'paused',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'order',
                    type: 'integer'
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'Now()',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories');
    }

}
