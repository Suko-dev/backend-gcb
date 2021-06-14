import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class doctorSpecialty1623682969303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specialtiesdoctors',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'doctor_id',
            type: 'int',
          },
          {
            name: 'specialty_id',
            type: 'int',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fkDoctorSpecialty',
            referencedTableName: 'doctors',
            referencedColumnNames: ['id'],
            columnNames: ['doctor_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fkSpecialtyDoctor',
            referencedTableName: 'specialties',
            referencedColumnNames: ['id'],
            columnNames: ['specialty_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('specialtiesdoctors');
  }
}
