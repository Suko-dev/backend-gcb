import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [
    DoctorsModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          migrations: [],
        }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
