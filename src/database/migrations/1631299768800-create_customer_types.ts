import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCustomerTypes1631299768800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'customer_types',
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
                        name: 'active',
                        type: 'boolean',
                        default: true,
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
        await queryRunner.dropTable('customer_types');
    }

}
