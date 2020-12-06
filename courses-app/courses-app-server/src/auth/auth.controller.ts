import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { User, UserData } from './auth.model';

@Controller('api/auth')
export class AuthController {

  @Post('login')
  @HttpCode(200)
  login(@Body() user: UserData): User {
    if (user.email !== 'test@angular-university.io' || user.password !== 'test') {
      throw new UnauthorizedException();
    } else {
      return { id: 1, email: user.email };
    }
  }
}
