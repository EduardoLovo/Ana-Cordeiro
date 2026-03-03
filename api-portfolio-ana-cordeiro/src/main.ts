import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet'; // Importação do Helmet

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adiciona o Helmet para proteger a aplicação de vulnerabilidades web conhecidas
  // configurando cabeçalhos HTTP de segurança (como XSS, Content-Security-Policy, etc)
  app.use(helmet());

  // Ativa a CORS (permitindo que o Front-End React converse com a API)
  app.enableCors({
    // Em produção, substitua '*' pela URL do seu front-end na Vercel
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Ativa as Validações Globais Baseadas em nossos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos que não existem no DTO
      forbidNonWhitelisted: true, // Retorna erro se campos extras forem enviados
      transform: true, // Transforma tipos de payloads automaticamente
    }),
  );

  // Escuta na porta definida pelo ambiente (Render) ou na 3000 localmente
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Servidor rodando na porta ${port}`);
}
bootstrap();
