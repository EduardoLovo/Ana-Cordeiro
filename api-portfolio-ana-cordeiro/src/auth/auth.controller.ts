import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: Record<string, any>) {
    const user = await this.authService.validateUser(signInDto.email, signInDto.password);
    
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }
    
    return this.authService.login(user);
  }

  // AVISO: Apague ou comente esta rota depois de criar seu usuário!
  
  @Post('setup')
  async setup(@Body() setupDto: Record<string, any>) {
    return this.authService.setupAdmin(setupDto.email, setupDto.password);
  }
  
 
}