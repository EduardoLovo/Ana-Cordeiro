import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Ensina a extrair o token do cabeçalho da requisição (Bearer Token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Rejeita tokens expirados
      // ATENÇÃO: Use a mesma variável de ambiente que colocamos no AuthModule
      secretOrKey: process.env.JWT_SECRET || 'chave-super-secreta-em-desenvolvimento',
    });
  }

  // Se o token for válido, esse método é chamado automaticamente
  async validate(payload: any) {
    // O retorno deste método fica disponível em "req.user" nas rotas protegidas
    return { userId: payload.sub, email: payload.email };
  }
}