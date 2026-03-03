import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Valida as credenciais na hora do login
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    // Compara a senha digitada com o hash salvo no banco
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result; // Retorna o usuário sem a senha
    }
    return null;
  }

  // Gera o token JWT
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Rota temporária para criarmos a sua conta de arquiteta
  async setupAdmin(email: string, pass: string) {
    const hashedPassword = await bcrypt.hash(pass, 10);
    return this.usersService.createAdmin(email, hashedPassword);
  }
}