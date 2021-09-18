import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPragueTypes1631371280881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'prague_types',
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
                        name: 'order',
                        type: 'integer',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('prague_types');
    }

}
