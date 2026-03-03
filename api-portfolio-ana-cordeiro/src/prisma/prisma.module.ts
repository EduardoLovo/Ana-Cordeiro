import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // O decorador @Global faz com que o PrismaService fique disponível em todo o projeto
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Precisamos exportar o serviço para que outros módulos possam usá-lo
})
export class PrismaModule {}