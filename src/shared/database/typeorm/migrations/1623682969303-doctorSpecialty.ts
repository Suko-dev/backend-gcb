import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class doctorSpecialty1623682969303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors_specialties_specialties',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'doctorsId',
            type: 'int',
          },
          {
            name: 'specialtiesId',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fkDoctorSpecialty',
            referencedTableName: 'doctors',
            referencedColumnNames: ['id'],
            columnNames: ['doctorsId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fkSpecialtyDoctor',
            referencedTableName: 'specialties',
            referencedColumnNames: ['id'],
            columnNames: ['specialtiesId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors_specialties_specialties');
  }
}
