import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createServices1632229307771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'services',
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
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('services');
    }

}
