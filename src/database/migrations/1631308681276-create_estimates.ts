import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEstimates1631308681276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'estimates',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'same_address',
                        type: 'boolean',
                        default: true,
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
                        name: 'discount',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'increase',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'percent',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'payment',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'date',
                        default: '(CURRENT_DATE)',
                    },
                    {
                        name: 'created_by',
                        type: 'varchar',
                    },
                    {
                        name: 'expire_at',
                        type: 'date',
                        default: '(CURRENT_DATE)',
                    },
                    {
                        name: 'finish_at',
                        type: 'date',
                        default: '(CURRENT_DATE)',
                    },
                    {
                        name: 'notes',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'customer_id',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'status_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'CustomerOnEstimate',
                        columnNames: ['customer_id'],
                        referencedTableName: 'customers',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'StatusOnEstimate',
                        columnNames: ['status_id'],
                        referencedTableName: 'estimate_status',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('estimates');
    }

}
