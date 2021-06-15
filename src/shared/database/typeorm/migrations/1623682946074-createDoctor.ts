import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createDoctor1623682946074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'crm',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'bigint',
          },
          {
            name: 'cellphone',
            type: 'bigint',
          },
          {
            name: 'adressId',
            type: 'int',
            isNullable: true,
            default: 'null',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: 'null',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fkDoctorAdress',
            referencedTableName: 'adress',
            referencedColumnNames: ['id'],
            columnNames: ['adressId'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors');
  }
}
