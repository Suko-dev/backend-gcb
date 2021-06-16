import { createConnection } from 'typeorm';

export default async () => {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'gbc',
  });
  await connection
    .createQueryBuilder()
    .insert()
    .into('specialties', ['specialty'])
    .values([
      { specialty: 'Alergologia' },
      { specialty: 'Angiologia' },
      { specialty: 'Buco maxilo' },
      { specialty: 'Cardiologia clínca' },
      { specialty: 'Cardiologia infantil' },
      { specialty: 'Cirurgia cabeça e pescoço' },
      { specialty: 'Cirurgia cardíaca' },
      { specialty: 'Cirurgia de tórax' },
    ])
    .execute();
};
