import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // O AuthGuard('jwt') já faz toda a mágica de acionar o JwtStrategy
  // e bloquear a requisição com erro 401 (Unauthorized) se o token for inválido.
}