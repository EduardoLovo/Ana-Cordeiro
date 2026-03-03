import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], // Exportando para o AuthModule poder usar
})
export class UsersModule {}