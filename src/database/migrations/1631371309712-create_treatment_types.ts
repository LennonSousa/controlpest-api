import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTreatmentTypes1631371309712 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'treatment_types',
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
                    {
                        name: 'active',
                        type: 'boolean',
                        default: true,
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('treatment_types');
    }

}
