import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { IMarcaRepositoryToken } from './repositories/marca.repository.interface';
import { PrismaMarcaRepository } from './repositories/prisma-marca.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MarcaController],
  providers: [
    MarcaService, 
    {
      provide: IMarcaRepositoryToken,
      useClass: PrismaMarcaRepository
    }, 
  ],
  exports: [MarcaService, IMarcaRepositoryToken],
})
export class MarcaModule {}
