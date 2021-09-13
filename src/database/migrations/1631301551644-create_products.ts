import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProducts1631301551644 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
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
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'code',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'price',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'discount',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'discount_price',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'inventory_amount',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'inventory_min',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'paused',
                    type: 'boolean',
                    default: false
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
                {
                    name: 'category_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'ProductOnCategory',
                    columnNames: ['category_id'],
                    referencedTableName: 'categories',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
