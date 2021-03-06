import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createStore1631299304348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'store',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                },
                {
                    name: 'phone',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'zip_code',
                    type: 'varchar'
                },
                {
                    name: 'street',
                    type: 'varchar'
                },
                {
                    name: 'number',
                    type: 'varchar'
                },
                {
                    name: 'neighborhood',
                    type: 'varchar'
                },
                {
                    name: 'complement',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'city',
                    type: 'varchar'
                },
                {
                    name: 'state',
                    type: 'varchar'
                },
                {
                    name: 'document',
                    type: 'varchar(50)'
                },
                {
                    name: 'services_in',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'warranty',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'manager',
                    type: 'text',
                    isNullable: true
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('store');
    }

}
