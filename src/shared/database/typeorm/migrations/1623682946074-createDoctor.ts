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
            name: 'adress',
            type: 'int',
            isNullable: true,
            default: 'null',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
            default: 'null',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fkDoctorAdress',
            referencedTableName: 'adress',
            referencedColumnNames: ['id'],
            columnNames: ['adress'],
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
