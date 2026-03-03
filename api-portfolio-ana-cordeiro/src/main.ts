import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa a CORS (permitindo que o Front-End React converse com a API)
  app.enableCors({
    origin: '*', // Permite qualquer origem inicialmente (bom para o desenvolvimento)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Ativa as Validações Globais Baseadas em nossos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos silenciosamente que não existem no DTO
      forbidNonWhitelisted: true, // Se quiser jogar um erro quando um campo não constar no DTO
      transform: true, // Transforma o formato de payloads baseados na classe do DTO
    }),
  );

  // Rodar nossa aplicação na porta 3000
  await app.listen(process.env.PORT ?? 3000);
  console.log('Rodando ');
}
bootstrap();
